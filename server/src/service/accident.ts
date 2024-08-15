import { AccidentService } from "@core/service/accident";
import { AccidentType } from "@model/accident";
import { accidentRepository } from "@repository/index";

export class AccidentServ implements AccidentService {
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
}
