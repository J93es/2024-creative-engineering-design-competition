import express, { Router, Request, Response, NextFunction } from "express";

import { sendSuccessResponse, sendErrorResponse } from "@tools/response";

import { suAccidentService } from "@service/index";
const router: Router = express.Router();

/* GET home page. */
router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await suAccidentService.getAll();
    sendSuccessResponse(res, data);
    next();
  } catch (error) {
    sendErrorResponse(res, error);
    next(error);
  }
});

router.get("/each", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await suAccidentService.get(req.body.id);
    sendSuccessResponse(res, data);
    next();
  } catch (error) {
    sendErrorResponse(res, error);
    next(error);
  }
});

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await suAccidentService.create(req.body);
    sendSuccessResponse(res, data);
    next();
  } catch (error) {
    sendErrorResponse(res, error);
    next(error);
  }
});

router.put("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await suAccidentService.update(req.body.id, req.body);
    sendSuccessResponse(res, data);
    next();
  } catch (error) {
    sendErrorResponse(res, error);
    next(error);
  }
});

router.delete("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    await suAccidentService.delete(req.body.id);
    sendSuccessResponse(res, { message: "Deleted successfully" });
    next();
  } catch (error) {
    sendErrorResponse(res, error);
    next(error);
  }
});

export default router;
