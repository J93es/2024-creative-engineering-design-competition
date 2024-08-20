import express, { Router, Request, Response, NextFunction } from "express";

import { sendSuccessResponse, sendErrorResponse } from "@utils/response";

import { idGenerator } from "@utils/id-generator/index";

import { accidentService } from "@service/index";
const router: Router = express.Router();

/* GET home page. */
router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await accidentService.get();
    if (!data) {
      sendSuccessResponse(res, {});
      return;
    }
    sendSuccessResponse(res, data);
    next();
  } catch (error) {
    sendErrorResponse(res, error);
    next(error);
  }
});

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const accidentId = idGenerator.generateId();
    const data = await accidentService.report({ ...req.body, id: accidentId });
    sendSuccessResponse(res, data);
    next();
  } catch (error) {
    sendErrorResponse(res, error);
    next(error);
  }
});

router.put(
  "/ignore",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await accidentService.ignore();
      sendSuccessResponse(res, data);
      next();
    } catch (error) {
      sendErrorResponse(res, error);
      next(error);
    }
  }
);

export default router;
