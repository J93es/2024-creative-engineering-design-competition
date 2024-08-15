import express, { Router, Request, Response, NextFunction } from "express";

import { sendSuccessResponse, sendErrorResponse } from "@utils/response";

import { railRobotService } from "@service/index";
const router: Router = express.Router();

/* GET home page. */
router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await railRobotService.getAll();
    sendSuccessResponse(res, data);
    next();
  } catch (error) {
    sendErrorResponse(res, error);
    next(error);
  }
});

router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await railRobotService.get(req.params.id);
    sendSuccessResponse(res, data);
    next();
  } catch (error) {
    sendErrorResponse(res, error);
    next(error);
  }
});

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await railRobotService.create(req.body);
    sendSuccessResponse(res, data);
    next();
  } catch (error) {
    sendErrorResponse(res, error);
    next(error);
  }
});

router.put("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await railRobotService.update(req.params.id, req.body);
    sendSuccessResponse(res, data);
    next();
  } catch (error) {
    sendErrorResponse(res, error);
    next(error);
  }
});

router.delete(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await railRobotService.delete(req.params.id);
      sendSuccessResponse(res, { message: "Deleted successfully" });
      next();
    } catch (error) {
      sendErrorResponse(res, error);
      next(error);
    }
  }
);

export default router;
