import { AccidentService } from "@core/service/accident";
import { AccidentType, Status } from "@model/accident";
import { accidentRepository } from "@repository/index";

export class AccidentServ implements AccidentService {
  async isExist(): Promise<boolean> {
    const [detectedAccident, alarmingAccident] = await Promise.all([
      accidentRepository.readByStatus(Status.DETECTED),
      accidentRepository.readByStatus(Status.ALARMING),
    ]);

    return detectedAccident.length > 0 || alarmingAccident.length > 0;
  }

  async get(): Promise<AccidentType> {
    const [detectedAccident, alarmingAccident] = await Promise.all([
      accidentRepository.readByStatus(Status.DETECTED),
      accidentRepository.readByStatus(Status.ALARMING),
    ]);

    return detectedAccident[0] || alarmingAccident[0];
  }

  async report(data: AccidentType): Promise<AccidentType> {
    if (await this.isExist()) {
      throw new Error("current Accident is already exist");
    }
    return await accidentRepository.create(data);
  }

  async ignore(): Promise<AccidentType> {
    const currentAccident = await this.get();

    if (!currentAccident) {
      throw new Error("Accident is not exist");
    }

    return await accidentRepository.update({
      ...currentAccident,
      status: Status.IGNORED,
    });
  }

  async startAlarm(): Promise<AccidentType> {
    const currentAccident = await this.get();

    if (!currentAccident) {
      throw new Error("Accident is not exist");
    }

    return await accidentRepository.update({
      ...currentAccident,
      status: Status.ALARMING,
    });
  }

  async endAlarm(): Promise<AccidentType> {
    const currentAccident = await this.get();

    if (!currentAccident) {
      throw new Error("Accident is not exist");
    }

    return await accidentRepository.update({
      ...currentAccident,
      status: Status.END,
    });
  }
}
