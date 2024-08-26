import express, { Router, Request, Response, NextFunction } from "express";

import { sendSuccessResponse, sendErrorResponse } from "@tools/response";

import { idGenerator, wrapAsyncController } from "@utils/index";

import { accidentService, webSoketService } from "@service/index";

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
      const accidentId = idGenerator.generateId();
      const data = await accidentService.report({
        ...req.body,
        id: accidentId,
      });
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
      const data = await accidentService.ignore();
      sendSuccessResponse(res, data);
      webSoketService.broadcast();
      next();
    }
  )
);

export default router;
