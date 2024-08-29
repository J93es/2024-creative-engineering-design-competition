import { Request, Response, NextFunction } from "express";
import { BadRequestError, AuthError } from "@model/interface/error";

export class RequestChecker {
  checkMiddleware(req: Request, res: Response, next: NextFunction) {
    if (!req) {
      throw new BadRequestError("Invalid request");
    }

    if (!req.headers) {
      throw new BadRequestError("Invalid request: headers not found");
    }

    // if (
    //   (req.headers["x-forwarded-for"] === "" ||
    //     req.headers["x-forwarded-for"] === undefined) &&
    //   (req.headers["x-real-ip"] === "" ||
    //     req.headers["x-real-ip"] === undefined)
    // ) {
    //   throw new BadRequestError("Invalid request");
    // }

    if (!req.body) {
      throw new BadRequestError("Invalid request: body not found");
    }

    next();
  }
}
