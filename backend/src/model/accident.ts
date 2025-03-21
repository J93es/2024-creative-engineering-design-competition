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
  discovererRobotId: string;
  probability?: number;
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
  discovererRobotId: string;
  probability?: number;
  status:
    | AccidentStatus.DETECTED
    | AccidentStatus.IGNORED
    | AccidentStatus.ALARMING
    | AccidentStatus.END;

  constructor(data: AccidentType) {
    this.id = data.id;
    this.code = data.code;
    this.location = data.location;
    this.discovererRobotId = data.discovererRobotId;
    this.probability = data.probability;
    this.status = data.status;
  }
}
