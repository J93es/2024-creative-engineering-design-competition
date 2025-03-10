import { RailRobotService } from "@core/service/rail-robot";
import {
  RailRobotType,
  RailRobotCommand,
  MAX_LOCATION,
} from "@model/rail-robot";
import { railRobotRepository } from "@repository/index";

import { BadRequestError, ResourceNotFoundError } from "@model/interface/error";

import { alarmRange } from "@config/app-config";

import { z } from "zod";

import { safetyLenght } from "@config/app-config";

export class RailRobotServ implements RailRobotService {
  private sortRailRobotsByCurrentLocation(
    railRobots: RailRobotType[]
  ): RailRobotType[] {
    if (!railRobots || railRobots.length === 0) {
      throw new ResourceNotFoundError("No RailRobot data in the database");
    }

    railRobots.sort(function (a, b) {
      if ((a.currentLocation ?? 0) > (b.currentLocation ?? 0)) {
        return 1;
      }
      if ((a.currentLocation ?? 0) < (b.currentLocation ?? 0)) {
        return -1;
      }
      // a must be equal to b
      return 0;
    });

    return railRobots;
  }

  private async updatePatrolLocation(
    data?: RailRobotType[],
    cmdUpdateOption: boolean = false
  ): Promise<void> {
    let railRobots;
    if (!data) {
      railRobots = await railRobotRepository.readAll();
    } else {
      railRobots = data;
    }

    if (!railRobots || railRobots.length === 0) {
      throw new ResourceNotFoundError("No RailRobot data in the database");
    }

    railRobots = this.sortRailRobotsByCurrentLocation(railRobots);

    const railRobotCnt = railRobots.length;
    const patrolLength = Math.floor(MAX_LOCATION / railRobotCnt);
    const updatePromises = [];

    for (let index = 0; index < railRobotCnt; index++) {
      const railRobot = railRobots[index];
      let patrolStartLocation =
        index === 0 ? 0 : patrolLength * index + safetyLenght;
      let patrolEndLocation =
        index === railRobotCnt - 1
          ? MAX_LOCATION
          : patrolLength * (index + 1) - safetyLenght;

      const updatePromise = cmdUpdateOption
        ? railRobotRepository.update({
            ...railRobot,
            command: RailRobotCommand.PATROL,
            patrolStartLocation: patrolStartLocation,
            patrolEndLocation: patrolEndLocation,
            targetLocation: patrolStartLocation,
          })
        : railRobotRepository.update({
            ...railRobot,
            patrolStartLocation: patrolStartLocation,
            patrolEndLocation: patrolEndLocation,
          });

      updatePromises.push(updatePromise);
    }

    await Promise.all(updatePromises);
  }

  async getAllRobot(): Promise<RailRobotType[]> {
    return await railRobotRepository.readAll();
  }

  async getRobot(id: string): Promise<RailRobotType> {
    const getRobotSchema = z.object({
      id: z.string(),
    });

    const parseResult = getRobotSchema.safeParse({ id: id });
    if (!parseResult.success) {
      throw new BadRequestError("id is invalid");
    }

    return await railRobotRepository.read(id);
  }

  async addRobot(robot: RailRobotType): Promise<RailRobotType> {
    const addRobotSchema = z.object({
      id: z.string(),
      currentLocation: z.number(),
    });

    const parseResult = addRobotSchema.safeParse(robot);
    if (!parseResult.success) {
      throw new BadRequestError("id, currentLocation is invalid");
    }

    const createdRobot = await railRobotRepository.create(robot);
    await this.updatePatrolLocation();
    return this.getRobot(createdRobot.id);
  }

  async deleteRobot(id: string): Promise<void> {
    const deleteRobotSchema = z.object({
      id: z.string(),
    });

    const parseResult = deleteRobotSchema.safeParse({ id: id });
    if (!parseResult.success) {
      throw new BadRequestError("id is invalid");
    }

    await railRobotRepository.delete(id);
    await this.updatePatrolLocation();
  }

  async startPatrol(): Promise<void> {
    const railRobots = await railRobotRepository.readAll();
    if (!railRobots || railRobots.length === 0) {
      throw new ResourceNotFoundError(`No RailRobot data in the database`);
    }

    await this.updatePatrolLocation(railRobots, true);
  }

  async moveToTargetLocation(targetLocation: number): Promise<void> {
    const moveToTargetLocationSchema = z.object({
      targetLocation: z.number(),
    });

    const parseResult = moveToTargetLocationSchema.safeParse({
      targetLocation: targetLocation,
    });
    if (
      !parseResult.success ||
      targetLocation < 0 ||
      targetLocation > MAX_LOCATION
    ) {
      throw new BadRequestError("targetLocation is invalid");
    }

    await this.updatePatrolLocation();

    const railRobots = await railRobotRepository.readAll();
    if (!railRobots || railRobots.length === 0) {
      throw new ResourceNotFoundError(`No RailRobot data in the database`);
    }

    for (const railRobot of railRobots) {
      const patrolStartLocation = railRobot.patrolStartLocation ?? 0;
      const patrolEndLocation = railRobot.patrolEndLocation ?? 0;
      if (
        patrolStartLocation <= targetLocation &&
        targetLocation <= patrolEndLocation
      ) {
        await railRobotRepository.update({
          ...railRobot,
          targetLocation: targetLocation,
          command: RailRobotCommand.MOVE_TO_TARGET_LOCATION,
        });
        break;
      }

      if (
        patrolStartLocation - safetyLenght <= targetLocation &&
        targetLocation <= patrolStartLocation
      ) {
        await railRobotRepository.update({
          ...railRobot,
          targetLocation: patrolStartLocation,
          command: RailRobotCommand.MOVE_TO_TARGET_LOCATION,
        });
        break;
      }

      if (
        patrolEndLocation <= targetLocation &&
        targetLocation <= patrolEndLocation + safetyLenght
      ) {
        await railRobotRepository.update({
          ...railRobot,
          targetLocation: patrolEndLocation,
          command: RailRobotCommand.MOVE_TO_TARGET_LOCATION,
        });
        break;
      }
    }
  }

  private makeAlarmLocation(
    accidentLocation: number,
    railRobotCnt: number
  ): number[] {
    const alarmLocation = [];

    for (let index = 0; index < railRobotCnt; index++) {
      const location = accidentLocation - alarmRange * index;

      alarmLocation.push(location > 0 ? location : 0);
      if (location <= 0) {
        break;
      }
    }

    alarmLocation.reverse();

    for (let index = 0; index < railRobotCnt - 1; index++) {
      if (alarmLocation[index] + 2 * safetyLenght > alarmLocation[index + 1]) {
        alarmLocation[index + 1] = alarmLocation[index] + 2 * safetyLenght;
      }
    }

    return alarmLocation;
  }

  async startAlarm(accidentLocation: number): Promise<void> {
    const startAlarmSchema = z.object({
      accidentLocation: z.number(),
    });

    const parseResult = startAlarmSchema.safeParse({
      accidentLocation: accidentLocation,
    });
    if (!parseResult.success) {
      throw new BadRequestError("accidentLocation is invalid");
    }

    let railRobots = await railRobotRepository.readAll();
    if (!railRobots || railRobots.length === 0) {
      throw new ResourceNotFoundError(`No RailRobot data in the database`);
    }

    railRobots = this.sortRailRobotsByCurrentLocation(railRobots);

    const alarmLocation = this.makeAlarmLocation(
      accidentLocation,
      railRobots.length
    );

    const updatePromises = [];
    for (let index = 0; index < railRobots.length; index++) {
      const railRobot = railRobots[index];
      const location = alarmLocation[index];

      const updatePromise = railRobotRepository.update({
        ...railRobot,
        targetLocation: location,
        command: RailRobotCommand.ALARMING,
      });

      updatePromises.push(updatePromise);
    }

    await Promise.all(updatePromises);
  }

  async stop(id: string): Promise<RailRobotType> {
    const stopSchema = z.object({
      id: z.string(),
    });

    const parseResult = stopSchema.safeParse({ id: id });
    if (!parseResult.success) {
      throw new BadRequestError("id is invalid");
    }

    return await railRobotRepository.update({
      id: id,
      command: RailRobotCommand.STOP,
    });
  }

  async updateCurrentLocation(
    id: string,
    currentLocation: number
  ): Promise<RailRobotType> {
    const updateCurrentLocationSchema = z.object({
      id: z.string(),
      currentLocation: z.number(),
    });

    const parseResult = updateCurrentLocationSchema.safeParse({
      id: id,
      currentLocation: currentLocation,
    });
    if (!parseResult.success) {
      throw new BadRequestError("id, currentLocation is invalid");
    }

    return await railRobotRepository.update({
      id: id,
      currentLocation: currentLocation,
    });
  }
}
