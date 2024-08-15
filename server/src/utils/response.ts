import { Response, NextFunction } from "express";

export function sendSuccessResponse(
  res: Response,
  data: object,
  statusCode: number = 200
) {
  res.header("Content-Type", "application/json; charset=utf-8");
  res.send(data).status(statusCode);
}

export function sendErrorResponse(
  res: Response,
  err: any,
  statusCode: number = 404
) {
  console.error(err);
  res.header("Content-Type", "application/json; charset=utf-8");
  res.send({ code: statusCode, message: err.toString() }).status(statusCode);
}
