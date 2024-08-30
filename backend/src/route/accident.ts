import express, { Router, Request, Response, NextFunction } from "express";

import { sendSuccessResponse } from "@tools/response";

import { wrapAsyncController } from "@utils/index";

import {
  accidentService,
  webSoketService,
  railRobotService,
} from "@service/index";

const router: Router = express.Router();

/* GET home page. */
router.get(
  "/",
  wrapAsyncController(
    async (req: Request, res: Response, next: NextFunction) => {
      const data = await accidentService.get();
      if (!data) {
        sendSuccessResponse(res, {});
        return;
      }
      sendSuccessResponse(res, data);
      next();
    }
  )
);

router.post(
  "/",
  wrapAsyncController(
    async (req: Request, res: Response, next: NextFunction) => {
      const data = await accidentService.report(req.body);
      sendSuccessResponse(res, data);
      webSoketService.broadcast();
      next();
    }
  )
);

router.put(
  "/ignore",
  wrapAsyncController(
    async (req: Request, res: Response, next: NextFunction) => {
      await Promise.all([
        accidentService.ignore(),
        railRobotService.startPatrol(),
      ]);
      sendSuccessResponse(res, { msg: "Accident ignored" });
      webSoketService.broadcast();
      next();
    }
  )
);

export default router;
