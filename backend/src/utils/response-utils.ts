import { Response } from "express";

export class RespnseUtils {
  sendSuccess(res: Response, data: object, statusCode: number = 200) {
    res.header("Content-Type", "application/json; charset=utf-8");
    res.status(statusCode).json(data);
  }

  sendError(res: Response, err: any, statusCode: number = 404) {
    res.header("Content-Type", "application/json; charset=utf-8");
    res.status(statusCode).json({ msg: err.toString() });
  }
}
