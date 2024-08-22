import express, { Router, Request, Response, NextFunction } from "express";

import { Command } from "@model/railRobot";
import { sendSuccessResponse, sendErrorResponse } from "@utils/response";

import {
  suAccidentService,
  suRailRobotService,
  railRobotService,
} from "@service/index";
const router: Router = express.Router();

router.delete("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    await Promise.all([suAccidentService.reset(), suRailRobotService.reset()]);
    await Promise.all([
      railRobotService.addRobot({
        id: "0",
        command: Command.STOP,
        currentLocation: 0,
      }),
      railRobotService.addRobot({
        id: "1",
        command: Command.STOP,
        currentLocation: 2,
      }),
    ]);
    sendSuccessResponse(res, { message: "Deleted successfully" });
    next();
  } catch (error) {
    sendErrorResponse(res, error);
    next(error);
  }
});

export default router;
