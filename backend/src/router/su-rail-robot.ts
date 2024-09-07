import express, { Router, Request, Response, NextFunction } from "express";

import { suRailRobotService } from "@service/index";

import { wrapAsyncController, responseUtils } from "@utils/index";
const router: Router = express.Router();

/* GET home page. */
router.get(
  "/",
  wrapAsyncController(
    async (req: Request, res: Response, next: NextFunction) => {
      const data = await suRailRobotService.getAll();
      responseUtils.sendSuccess(res, data);
      next();
    }
  )
);

router.get(
  "/each",
  wrapAsyncController(
    async (req: Request, res: Response, next: NextFunction) => {
      const data = await suRailRobotService.get(req.body.id);
      responseUtils.sendSuccess(res, data);
      next();
    }
  )
);

router.post(
  "/",
  wrapAsyncController(
    async (req: Request, res: Response, next: NextFunction) => {
      const data = await suRailRobotService.create(req.body);
      responseUtils.sendSuccess(res, data);
      next();
    }
  )
);

router.put(
  "/",
  wrapAsyncController(
    async (req: Request, res: Response, next: NextFunction) => {
      const data = await suRailRobotService.update(req.body.id, req.body);
      responseUtils.sendSuccess(res, data);
      next();
    }
  )
);

router.delete(
  "/",
  wrapAsyncController(
    async (req: Request, res: Response, next: NextFunction) => {
      await suRailRobotService.delete(req.body.id);
      responseUtils.sendSuccess(res, { message: "Deleted successfully" });
      next();
    }
  )
);

export default router;
