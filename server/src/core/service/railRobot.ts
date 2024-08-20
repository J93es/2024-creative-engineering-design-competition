import { RailRobotType } from "@model/railRobot";

export interface RailRobotService {
  addRobot(robot: RailRobotType): Promise<RailRobotType>;
  deleteRobot(id: string): Promise<void>;
  getAllRobot(): Promise<RailRobotType[]>;
  getRobot(id: string): Promise<RailRobotType>;
  startPatrol(): Promise<void>;
  moveToTargetLocation(targetLocation: number): Promise<void>;
  startAlarm(accidentLocation: number): Promise<void>;
  stop(id: string): Promise<RailRobotType>;
  updateCurrentLocation(
    id: string,
    currentLocation: number
  ): Promise<RailRobotType>;
}
