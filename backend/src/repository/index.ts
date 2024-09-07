import { RailRobotRepository } from "@core/repository/rail-robot";
import { RailRobotMongoRepo } from "@repository/mongo/rail-robot";

import { AccidentRepository } from "@core/repository/accident";
import { AccidentMongoRepo } from "@repository/mongo/accident";

export const railRobotRepository: RailRobotRepository =
  new RailRobotMongoRepo();
export const accidentRepository: AccidentRepository = new AccidentMongoRepo();
