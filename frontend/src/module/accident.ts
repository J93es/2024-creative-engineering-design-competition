export const enum AccidentCode {
  CAR_CRASH = "0",
  FIRE = "1",
  FLOOD = "2",
}

export const enum AccidentStatus {
  DETECTED = "0",
  IGNORED = "1",
  ALARMING = "2",
  END = "3",
}

export interface AccidentType {
  id: string;
  code: AccidentCode.CAR_CRASH | AccidentCode.FIRE | AccidentCode.FLOOD;
  location: number;
  discoverorRobotId: string;
  status:
    | AccidentStatus.DETECTED
    | AccidentStatus.IGNORED
    | AccidentStatus.ALARMING
    | AccidentStatus.END;
}

export default class Accident implements AccidentType {
  id: string;
  code: AccidentCode.CAR_CRASH | AccidentCode.FIRE | AccidentCode.FLOOD;
  location: number;
  discoverorRobotId: string;
  status:
    | AccidentStatus.DETECTED
    | AccidentStatus.IGNORED
    | AccidentStatus.ALARMING
    | AccidentStatus.END;

  constructor(data: AccidentType) {
    this.id = data.id;
    this.code = data.code;
    this.location = data.location;
    this.discoverorRobotId = data.discoverorRobotId;
    this.status = data.status;
  }
}

export const accidentInit = new Accident({
  id: "0",
  location: 0,
  discoverorRobotId: "0",
  code: AccidentCode.CAR_CRASH,
  status: AccidentStatus.END,
});
