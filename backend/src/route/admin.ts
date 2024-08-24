import express, { Router, Request, Response, NextFunction } from "express";

import { RailRobotType } from "@model/railRobot";
import { Command } from "@model/railRobot";
import { sendSuccessResponse, sendErrorResponse } from "@tools/response";

import {
  suAccidentService,
  suRailRobotService,
  railRobotService,
  accidentService,
} from "@service/index";
const router: Router = express.Router();

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const [accident, railRobotList] = await Promise.all([
      accidentService.get(),
      railRobotService.getAllRobot(),
    ]);

    const railRobots: { [key: string]: RailRobotType } = {};
    railRobotList.forEach((railRobot) => {
      railRobots[railRobot.id] = railRobot;
    });

    sendSuccessResponse(res, { accident: accident, railRobots: railRobots });
  } catch (error) {
    sendErrorResponse(res, error);
  }
});

router.delete(
  "/reset",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await Promise.all([
        suAccidentService.reset(),
        suRailRobotService.reset(),
      ]);
      await Promise.all([
        railRobotService.addRobot({
          id: "0",
          command: Command.STOP,
          currentLocation: 0,
        }),
        railRobotService.addRobot({
          id: "1",
          command: Command.STOP,
          currentLocation: 10,
        }),
      ]);
      sendSuccessResponse(res, { message: "Reseted successfully" });
      next();
    } catch (error) {
      sendErrorResponse(res, error);
    }
  }
);

export default router;
