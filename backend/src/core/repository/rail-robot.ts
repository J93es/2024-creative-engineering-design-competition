import { RailRobotType } from "@model/rail-robot";

export interface RailRobotRepository {
  readAll(): Promise<RailRobotType[]>;
  read(id: string): Promise<RailRobotType>;
  create(data: RailRobotType): Promise<RailRobotType>;
  update(data: Partial<RailRobotType>): Promise<RailRobotType>;
  delete(id: string): Promise<void>;
  deleteAll(): Promise<void>;
}
