import { Response, NextFunction } from "express";

export function sendSuccessResponse(
  res: Response,
  data: object,
  statusCode: number = 200
) {
  res.header("Content-Type", "application/json; charset=utf-8");
  res.status(statusCode).json(data);
}

export function sendErrorResponse(
  res: Response,
  err: any,
  statusCode: number = 404
) {
  res.header("Content-Type", "application/json; charset=utf-8");
  res.status(statusCode).json({ msg: err.toString() });
}
