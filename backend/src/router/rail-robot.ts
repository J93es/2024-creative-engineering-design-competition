import express, { Router, Request, Response, NextFunction } from "express";

import { railRobotService, webSoketService } from "@service/index";

import { wrapAsyncController, responseUtils } from "@utils/index";

const router: Router = express.Router();

/* GET home page. */
router.get(
  "/",
  wrapAsyncController(
    async (req: Request, res: Response, next: NextFunction) => {
      const data = await railRobotService.getAllRobot();
      responseUtils.sendSuccess(res, data);
      next();
    }
  )
);

router.get(
  "/each",
  wrapAsyncController(
    async (req: Request, res: Response, next: NextFunction) => {
      const data = await railRobotService.getRobot(req.body.id);
      responseUtils.sendSuccess(res, data);
      next();
    }
  )
);

router.post(
  "/",
  wrapAsyncController(
    async (req: Request, res: Response, next: NextFunction) => {
      const data = await railRobotService.addRobot(req.body);
      responseUtils.sendSuccess(res, data);
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
      responseUtils.sendSuccess(res, { msg: "Patrol started" });
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
      responseUtils.sendSuccess(res, { msg: "Moved to target location" });
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
      responseUtils.sendSuccess(res, data);
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
      responseUtils.sendSuccess(res, data);
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
      responseUtils.sendSuccess(res, { msg: "Deleted successfully" });
      webSoketService.broadcast();
      next();
    }
  )
);

export default router;
