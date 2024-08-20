import { SuAccidentService } from "@core/service/su-accident";
import { AccidentType, Status } from "@model/accident";
import { accidentRepository } from "@repository/index";

export class SuAccidentServ implements SuAccidentService {
  async getAll(): Promise<AccidentType[]> {
    return await accidentRepository.readAll();
  }

  async get(id: string): Promise<AccidentType> {
    return await accidentRepository.read(id);
  }

  async create(data: AccidentType): Promise<AccidentType> {
    return await accidentRepository.create(data);
  }

  async update(id: string, data: AccidentType): Promise<AccidentType> {
    return await accidentRepository.update(data);
  }

  async delete(id: string): Promise<void> {
    return await accidentRepository.delete(id);
  }

  async isCurrentAccidentExist(): Promise<boolean> {
    const [detectedAccident, alarmingAccident] = await Promise.all([
      accidentRepository.readByStatus(Status.DETECTED),
      accidentRepository.readByStatus(Status.ALARMING),
    ]);

    return detectedAccident.length > 0 || alarmingAccident.length > 0;
  }
}
