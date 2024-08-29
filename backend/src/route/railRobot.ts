import express, { Router, Request, Response, NextFunction } from "express";

import { sendSuccessResponse } from "@tools/response";

import { railRobotService, webSoketService } from "@service/index";

import { wrapAsyncController } from "@utils/index";

const router: Router = express.Router();

/* GET home page. */
router.get(
  "/",
  wrapAsyncController(
    async (req: Request, res: Response, next: NextFunction) => {
      const data = await railRobotService.getAllRobot();
      sendSuccessResponse(res, data);
      next();
    }
  )
);

router.get(
  "/each",
  wrapAsyncController(
    async (req: Request, res: Response, next: NextFunction) => {
      const data = await railRobotService.getRobot(req.body.id);
      sendSuccessResponse(res, data);
      next();
    }
  )
);

router.post(
  "/",
  wrapAsyncController(
    async (req: Request, res: Response, next: NextFunction) => {
      const data = await railRobotService.addRobot(req.body);
      sendSuccessResponse(res, data);
      webSoketService.broadcast();
      next();
    }
  )
);

router.put(
  "/start-patrol",
  wrapAsyncController(
    async (req: Request, res: Response, next: NextFunction) => {
      await railRobotService.startPatrol();
      sendSuccessResponse(res, { msg: "Patrol started" });
      webSoketService.broadcast();
      next();
    }
  )
);

router.put(
  "/move-to-target-location",
  wrapAsyncController(
    async (req: Request, res: Response, next: NextFunction) => {
      await railRobotService.moveToTargetLocation(req.body.targetLocation);
      sendSuccessResponse(res, { msg: "Moved to target location" });
      webSoketService.broadcast();
      next();
    }
  )
);

router.put(
  "/stop",
  wrapAsyncController(
    async (req: Request, res: Response, next: NextFunction) => {
      const data = await railRobotService.stop(req.body.id);
      sendSuccessResponse(res, data);
      webSoketService.broadcast();
      next();
    }
  )
);

router.put(
  "/update-current-location",
  wrapAsyncController(
    async (req: Request, res: Response, next: NextFunction) => {
      const data = await railRobotService.updateCurrentLocation(
        req.body.id,
        req.body.currentLocation
      );
      sendSuccessResponse(res, data);
      webSoketService.broadcast();
      next();
    }
  )
);

router.delete(
  "/",
  wrapAsyncController(
    async (req: Request, res: Response, next: NextFunction) => {
      await railRobotService.deleteRobot(req.body.id);
      sendSuccessResponse(res, { msg: "Deleted successfully" });
      webSoketService.broadcast();
      next();
    }
  )
);

export default router;
