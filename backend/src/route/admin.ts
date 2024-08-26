import express, { Router, Request, Response, NextFunction } from "express";

import { RailRobotType } from "@model/railRobot";
import { RailRobotCommand } from "@model/railRobot";
import { sendSuccessResponse, sendErrorResponse } from "@tools/response";

import {
  suAccidentService,
  suRailRobotService,
  railRobotService,
  accidentService,
  webSoketService,
} from "@service/index";

import { wrapAsyncController } from "@utils/index";

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

      sendSuccessResponse(res, {
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
      await Promise.all([
        railRobotService.addRobot({
          id: "0",
          command: RailRobotCommand.STOP,
          currentLocation: 0,
        }),
        railRobotService.addRobot({
          id: "1",
          command: RailRobotCommand.STOP,
          currentLocation: 10,
        }),
      ]);
      sendSuccessResponse(res, { message: "Reseted successfully" });
      webSoketService.broadcast();
      next();
    }
  )
);

export default router;
