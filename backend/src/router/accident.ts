import express, { Router, Request, Response, NextFunction } from "express";

import { wrapAsyncController, responseUtils } from "@utils/index";

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
        responseUtils.sendSuccess(res, {});
        return;
      }
      responseUtils.sendSuccess(res, data);
      next();
    }
  )
);

router.post(
  "/",
  wrapAsyncController(
    async (req: Request, res: Response, next: NextFunction) => {
      const data = await accidentService.report(req.body);
      responseUtils.sendSuccess(res, data);
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
      responseUtils.sendSuccess(res, { msg: "Accident ignored" });
      webSoketService.broadcast();
      next();
    }
  )
);

export default router;
