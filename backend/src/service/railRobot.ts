import { RailRobotService } from "@core/service/railRobot";
import {
  RailRobotType,
  RailRobotCommand,
  MAX_LOCATION,
} from "@model/railRobot";
import { railRobotRepository } from "@repository/index";

export class RailRobotServ implements RailRobotService {
  private sortRailRobotsByCurrentLocation(
    railRobots: RailRobotType[]
  ): RailRobotType[] {
    if (!railRobots || railRobots.length === 0) {
      throw new Error(`RailRobot is not exist`);
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
      throw new Error(`RailRobot is not exist`);
    }

    railRobots = this.sortRailRobotsByCurrentLocation(railRobots);

    const railRobotCnt = railRobots.length;
    const patrolLength = Math.floor(MAX_LOCATION / railRobotCnt);
    const updatePromises = [];

    for (let index = 0; index < railRobots.length; index++) {
      const railRobot = railRobots[index];
      const patrolStartLocation = patrolLength * index;
      const patrolEndLocation = patrolLength * (index + 1);

      const updatePromise = cmdUpdateOption
        ? railRobotRepository.update({
            ...railRobot,
            command: RailRobotCommand.PATROL,
            patrolStartLocation: patrolStartLocation,
            patrolEndLocation: patrolEndLocation,
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
    return await railRobotRepository.read(id);
  }

  async addRobot(robot: RailRobotType): Promise<RailRobotType> {
    const createdRobot = await railRobotRepository.create(robot);
    await this.updatePatrolLocation();
    return this.getRobot(createdRobot.id);
  }

  async deleteRobot(id: string): Promise<void> {
    await railRobotRepository.delete(id);
    await this.updatePatrolLocation();
  }

  async startPatrol(): Promise<void> {
    const railRobots = await railRobotRepository.readAll();
    if (!railRobots || railRobots.length === 0) {
      throw new Error(`RailRobot is not exist`);
    }

    await this.updatePatrolLocation(railRobots, true);
  }

  async moveToTargetLocation(targetLocation: number): Promise<void> {
    const railRobots = await railRobotRepository.readAll();
    if (!railRobots || railRobots.length === 0) {
      throw new Error(`RailRobot is not exist`);
    }

    for (const railRobot of railRobots) {
      if (
        (railRobot.patrolStartLocation ?? 0) < targetLocation &&
        targetLocation <= (railRobot.patrolEndLocation ?? 0)
      ) {
        await railRobotRepository.update({
          ...railRobot,
          targetLocation: targetLocation,
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
    const alarmRange = 5;

    for (let index = 0; index < railRobotCnt; index++) {
      const location = accidentLocation - alarmRange * index;

      alarmLocation.push(location > 0 ? location : 0);
    }

    return alarmLocation;
  }

  async startAlarm(accidentLocation: number): Promise<void> {
    let railRobots = await railRobotRepository.readAll();
    if (!railRobots || railRobots.length === 0) {
      throw new Error(`RailRobot is not exist`);
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
    return await railRobotRepository.update({
      id: id,
      command: RailRobotCommand.STOP,
    });
  }

  async updateCurrentLocation(
    id: string,
    currentLocation: number
  ): Promise<RailRobotType> {
    return await railRobotRepository.update({
      id: id,
      currentLocation: currentLocation,
    });
  }
}
