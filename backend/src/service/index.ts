import { SuRailRobotService } from "@core/service/su-railRobot";
import { SuRailRobotServ } from "@service/su-railRobot";

import { SuAccidentService } from "@core/service/su-accident";
import { SuAccidentServ } from "@service/su-accident";

import { RailRobotService } from "@core/service/railRobot";
import { RailRobotServ } from "@service/railRobot";

import { AccidentService } from "@core/service/accident";
import { AccidentServ } from "@service/accident";

import { WebSocketServ } from "@service/web-socket";

export const suRailRobotService: SuRailRobotService = new SuRailRobotServ();
export const suAccidentService: SuAccidentService = new SuAccidentServ();

export const railRobotService: RailRobotService = new RailRobotServ();
export const accidentService: AccidentService = new AccidentServ();

export const webSoketService = new WebSocketServ();
