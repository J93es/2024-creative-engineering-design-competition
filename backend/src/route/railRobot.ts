import express, { Router, Request, Response, NextFunction } from "express";

import { sendSuccessResponse, sendErrorResponse } from "@utils/response";

import { railRobotService } from "@service/index";
const router: Router = express.Router();

/* GET home page. */
router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await railRobotService.getAllRobot();
    sendSuccessResponse(res, data);
    next();
  } catch (error) {
    sendErrorResponse(res, error);
    next(error);
  }
});

router.get("/each", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await railRobotService.getRobot(req.body.id);
    sendSuccessResponse(res, data);
    next();
  } catch (error) {
    sendErrorResponse(res, error);
    next(error);
  }
});

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await railRobotService.addRobot(req.body);
    sendSuccessResponse(res, data);
    next();
  } catch (error) {
    sendErrorResponse(res, error);
    next(error);
  }
});

router.put(
  "/start-patrol",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await railRobotService.startPatrol();
      sendSuccessResponse(res, { msg: "Patrol started" });
      next();
    } catch (error) {
      sendErrorResponse(res, error);
      next(error);
    }
  }
);

router.put(
  "/move-to-target-location",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await railRobotService.moveToTargetLocation(req.body.targetLocation);
      sendSuccessResponse(res, { msg: "Moved to target location" });
      next();
    } catch (error) {
      sendErrorResponse(res, error);
      next(error);
    }
  }
);

router.put("/stop", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await railRobotService.stop(req.body.id);
    sendSuccessResponse(res, data);
    next();
  } catch (error) {
    sendErrorResponse(res, error);
    next(error);
  }
});

router.put(
  "/update-current-location",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await railRobotService.updateCurrentLocation(
        req.body.id,
        req.body.currentLocation
      );
      sendSuccessResponse(res, data);
      next();
    } catch (error) {
      sendErrorResponse(res, error);
      next(error);
    }
  }
);

router.delete("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    await railRobotService.deleteRobot(req.body.id);
    sendSuccessResponse(res, { msg: "Deleted successfully" });
    next();
  } catch (error) {
    sendErrorResponse(res, error);
    next(error);
  }
});

export default router;
