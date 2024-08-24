import express, { Router, Request, Response, NextFunction } from "express";

import { sendSuccessResponse, sendErrorResponse } from "@tools/response";

import { accidentService, railRobotService } from "@service/index";
const router: Router = express.Router();

router.put(
  "/start",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const currentAccident = await accidentService.startAlarm();
      await railRobotService.startAlarm(currentAccident.location);
      sendSuccessResponse(res, { msg: "Alarm started" });
      next();
    } catch (error) {
      sendErrorResponse(res, error);
    }
  }
);

router.put("/end", async (req: Request, res: Response, next: NextFunction) => {
  try {
    await Promise.all([
      accidentService.endAlarm(),
      railRobotService.startPatrol(),
    ]);
    sendSuccessResponse(res, { msg: "Alarm stoped" });
    next();
  } catch (error) {
    sendErrorResponse(res, error);
  }
});

export default router;
