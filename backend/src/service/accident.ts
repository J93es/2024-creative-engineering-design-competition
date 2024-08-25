import { AccidentService } from "@core/service/accident";
import { AccidentType, AccidentStatus } from "@model/accident";
import { accidentRepository } from "@repository/index";

import { railRobotService } from "@service/index";

export class AccidentServ implements AccidentService {
  async isExist(): Promise<boolean> {
    const [detectedAccident, alarmingAccident] = await Promise.all([
      accidentRepository.readByStatus(AccidentStatus.DETECTED),
      accidentRepository.readByStatus(AccidentStatus.ALARMING),
    ]);

    return detectedAccident.length > 0 || alarmingAccident.length > 0;
  }

  async get(): Promise<AccidentType> {
    const [detectedAccident, alarmingAccident] = await Promise.all([
      accidentRepository.readByStatus(AccidentStatus.DETECTED),
      accidentRepository.readByStatus(AccidentStatus.ALARMING),
    ]);

    return detectedAccident[0] || alarmingAccident[0];
  }

  async report(data: AccidentType): Promise<AccidentType> {
    if (await this.isExist()) {
      throw new Error("current Accident is already exist");
    }

    if (!data.location) {
      throw new Error("location is required");
    }

    if (!data.discoverorRobotId) {
      throw new Error("discoverorRobotId is required");
    }

    const [accident, railRobot] = await Promise.all([
      accidentRepository.create(data),
      railRobotService.stop(data.discoverorRobotId),
    ]);
    return accident;
  }

  async ignore(): Promise<AccidentType> {
    const currentAccident = await this.get();

    if (!currentAccident) {
      throw new Error("Accident is not exist");
    }

    return await accidentRepository.update({
      ...currentAccident,
      status: AccidentStatus.IGNORED,
    });
  }

  async startAlarm(): Promise<AccidentType> {
    const currentAccident = await this.get();

    if (!currentAccident) {
      throw new Error("Accident is not exist");
    }

    return await accidentRepository.update({
      ...currentAccident,
      status: AccidentStatus.ALARMING,
    });
  }

  async endAlarm(): Promise<AccidentType> {
    const currentAccident = await this.get();

    if (!currentAccident) {
      throw new Error("Accident is not exist");
    }

    return await accidentRepository.update({
      ...currentAccident,
      status: AccidentStatus.END,
    });
  }
}
