export const enum Command {
  PATROL = 0,
  ALARMING = 1,
  CHARGE = 3,
  MOVE_TO_TARGET_LOCATION = 4,
}

export interface RailRobotType {
  _id: string;
  id: string;
  command:
    | Command.PATROL
    | Command.ALARMING
    | Command.CHARGE
    | Command.MOVE_TO_TARGET_LOCATION;
  currentLocation?: number;
  targetLocation?: number;
  patrolStartLocation?: number;
  patrolEndLocation?: number;
}

export default class RailRobot implements RailRobotType {
  _id: string;
  id: string;
  command:
    | Command.PATROL
    | Command.ALARMING
    | Command.CHARGE
    | Command.MOVE_TO_TARGET_LOCATION;
  currentLocation?: number;
  targetLocation?: number;
  patrolStartLocation?: number;
  patrolEndLocation?: number;

  constructor(data: RailRobotType) {
    this._id = data._id;
    this.id = data.id;
    this.command = data.command;
    this.currentLocation = data.currentLocation;
    this.targetLocation = data.targetLocation;
    this.patrolStartLocation = data.patrolStartLocation;
    this.patrolEndLocation = data.patrolEndLocation;
  }
}
