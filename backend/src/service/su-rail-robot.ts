import { SuRailRobotService } from "@core/service/su-rail-robot";
import { RailRobotType } from "@model/rail-robot";
import { railRobotRepository } from "@repository/index";

export class SuRailRobotServ implements SuRailRobotService {
  async getAll(): Promise<RailRobotType[]> {
    return await railRobotRepository.readAll();
  }

  async get(id: string): Promise<RailRobotType> {
    return await railRobotRepository.read(id);
  }

  async create(data: RailRobotType): Promise<RailRobotType> {
    return await railRobotRepository.create(data);
  }

  async update(id: string, data: RailRobotType): Promise<RailRobotType> {
    return await railRobotRepository.update(data);
  }

  async delete(id: string): Promise<void> {
    return await railRobotRepository.delete(id);
  }

  async reset(): Promise<void> {
    return await railRobotRepository.deleteAll();
  }
}
