export const enum RailRobotCommand {
  PATROL = "0",
  ALARMING = "1",
  CHARGE = "3",
  MOVE_TO_TARGET_LOCATION = "4",
  STOP = "5",
}

export interface RailRobotType {
  id: string;
  command:
    | RailRobotCommand.PATROL
    | RailRobotCommand.ALARMING
    | RailRobotCommand.CHARGE
    | RailRobotCommand.MOVE_TO_TARGET_LOCATION
    | RailRobotCommand.STOP;
  currentLocation: number;
  targetLocation?: number;
  patrolStartLocation?: number;
  patrolEndLocation?: number;
}

export default class RailRobot implements RailRobotType {
  id: string;
  command:
    | RailRobotCommand.PATROL
    | RailRobotCommand.ALARMING
    | RailRobotCommand.CHARGE
    | RailRobotCommand.MOVE_TO_TARGET_LOCATION
    | RailRobotCommand.STOP;
  currentLocation: number;
  targetLocation?: number;
  patrolStartLocation?: number;
  patrolEndLocation?: number;

  constructor(data: RailRobotType) {
    this.id = data.id;
    this.command = data.command;
    this.currentLocation = data.currentLocation;
    this.targetLocation = data.targetLocation;
    this.patrolStartLocation = data.patrolStartLocation;
    this.patrolEndLocation = data.patrolEndLocation;
  }
}

export const railRobotInit = new RailRobot({
  id: "0",
  command: RailRobotCommand.STOP,
  currentLocation: 0,
});
