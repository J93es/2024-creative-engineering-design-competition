import { RailRobotService } from "@core/service/railRobot";
import { RailRobotServ } from "@service/railRobot";

import { AccidentService } from "@core/service/accident";
import { AccidentServ } from "@service/accident";

export const railRobotService: RailRobotService = new RailRobotServ();
export const accidentService: AccidentService = new AccidentServ();
