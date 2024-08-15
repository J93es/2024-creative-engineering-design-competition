export const enum Code {
  CAR_CRASH = 0,
  FIRE = 1,
  FLOOD = 2,
}

export const enum Status {
  DETECTED = 0,
  DETECTION_ERROR = 1,
  ALARMING = 2,
  END = 3,
}

export interface AccidentType {
  _id: string;
  id: string;
  code: Code.CAR_CRASH | Code.FIRE | Code.FLOOD;
  location: number;
  discoverorRobotId: string;
  status:
    | Status.DETECTED
    | Status.DETECTION_ERROR
    | Status.ALARMING
    | Status.END;
}

export default class Accident implements AccidentType {
  _id: string;
  id: string;
  code: Code.CAR_CRASH | Code.FIRE | Code.FLOOD;
  location: number;
  discoverorRobotId: string;
  status:
    | Status.DETECTED
    | Status.DETECTION_ERROR
    | Status.ALARMING
    | Status.END;

  constructor(data: AccidentType) {
    this._id = data._id;
    this.id = data.id;
    this.code = data.code;
    this.location = data.location;
    this.discoverorRobotId = data.discoverorRobotId;
    this.status = data.status;
  }
}
