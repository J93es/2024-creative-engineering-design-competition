import express, { Router, Request, Response, NextFunction } from "express";

import { sendSuccessResponse } from "@tools/response";

import {
  accidentService,
  railRobotService,
  webSoketService,
} from "@service/index";

import { wrapAsyncController } from "@utils/index";

const router: Router = express.Router();

router.put(
  "/start",
  wrapAsyncController(
    async (req: Request, res: Response, next: NextFunction) => {
      const currentAccident = await accidentService.startAlarm();
      await railRobotService.startAlarm(currentAccident.location);
      sendSuccessResponse(res, { msg: "Alarm started" });
      webSoketService.broadcast();
      next();
    }
  )
);

router.put(
  "/end",
  wrapAsyncController(
    async (req: Request, res: Response, next: NextFunction) => {
      await Promise.all([
        accidentService.endAlarm(),
        railRobotService.startPatrol(),
      ]);
      sendSuccessResponse(res, { msg: "Alarm stoped" });
      webSoketService.broadcast();
      next();
    }
  )
);

export default router;
