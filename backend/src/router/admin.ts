import express, { Router, Request, Response, NextFunction } from "express";

import { RailRobotType, RailRobotCommand } from "@model/rail-robot";

import {
  suAccidentService,
  suRailRobotService,
  railRobotService,
  accidentService,
  webSoketService,
} from "@service/index";

import { wrapAsyncController, responseUtils } from "@utils/index";

const router: Router = express.Router();

router.get(
  "/",
  wrapAsyncController(
    async (req: Request, res: Response, next: NextFunction) => {
      const [accident, railRobotList] = await Promise.all([
        accidentService.get(),
        railRobotService.getAllRobot(),
      ]);

      const railRobots: { [key: string]: RailRobotType } = {};
      railRobotList.forEach((railRobot) => {
        railRobots[railRobot.id] = railRobot;
      });

      responseUtils.sendSuccess(res, {
        accident: accident,
        railRobots: railRobots,
      });
      next();
    }
  )
);

router.delete(
  "/reset",
  wrapAsyncController(
    async (req: Request, res: Response, next: NextFunction) => {
      await Promise.all([
        suAccidentService.reset(),
        suRailRobotService.reset(),
      ]);
      await railRobotService.addRobot({
        id: "0",
        command: RailRobotCommand.STOP,
        currentLocation: 0,
        targetLocation: 5,
      });
      await railRobotService.addRobot({
        id: "1",
        command: RailRobotCommand.STOP,
        currentLocation: 10,
        targetLocation: 15,
      });
      responseUtils.sendSuccess(res, { message: "Reseted successfully" });
      webSoketService.broadcast();
      next();
    }
  )
);

export default router;
