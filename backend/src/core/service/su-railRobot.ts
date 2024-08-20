import { RailRobotType } from "@model/railRobot";

export interface SuRailRobotService {
  getAll(): Promise<RailRobotType[]>;
  get(id: string): Promise<RailRobotType>;
  create(data: RailRobotType): Promise<RailRobotType>;
  update(id: string, data: RailRobotType): Promise<RailRobotType>;
  delete(id: string): Promise<void>;
}
