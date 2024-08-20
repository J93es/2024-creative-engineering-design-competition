import { RailRobotRepository } from "@core/repository/railRobot";
import { RailRobotMongoRepo } from "@repository/mongo/railRobot";

import { AccidentRepository } from "@core/repository/accident";
import { AccidentMongoRepo } from "@repository/mongo/accident";

export const railRobotRepository: RailRobotRepository =
  new RailRobotMongoRepo();
export const accidentRepository: AccidentRepository = new AccidentMongoRepo();
