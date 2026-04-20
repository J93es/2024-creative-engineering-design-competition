import { SuRailRobotService } from "@core/service/su-rail-robot";
import { SuRailRobotServ } from "@service/su-rail-robot";

import { SuAccidentService } from "@core/service/su-accident";
import { SuAccidentServ } from "@service/su-accident";

import { RailRobotService } from "@core/service/rail-robot";
import { RailRobotServ } from "@service/rail-robot";

import { AccidentService } from "@core/service/accident";
import { AccidentServ } from "@service/accident";

import { WebSocketServ } from "@service/web-socket";

import { AuthService } from "@core/service/auth";
import { AuthServ } from "@service/auth";

export const suRailRobotService: SuRailRobotService = new SuRailRobotServ();
export const suAccidentService: SuAccidentService = new SuAccidentServ();

export const railRobotService: RailRobotService = new RailRobotServ();
export const accidentService: AccidentService = new AccidentServ();

export const webSoketService = new WebSocketServ();

export const authService: AuthService = new AuthServ();
