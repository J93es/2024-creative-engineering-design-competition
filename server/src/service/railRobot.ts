import { RailRobotService } from "@core/service/railRobot";
import { RailRobotType } from "@model/railRobot";
import { railRobotRepository } from "@repository/index";

export class RailRobotServ implements RailRobotService {
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
}
