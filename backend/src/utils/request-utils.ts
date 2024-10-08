import { Request, Response, NextFunction } from "express";
import { BadRequestError } from "@model/interface/error";
import { nanoidGenerator } from "@utils/index";

export class RequestUtils {
  getId = (req: Request): string => {
    return `${req.headers.requestId}`;
  };

  getIp = (req: Request) => {
    const ipData =
      req.headers["x-forwarded-for"] ||
      req.headers["x-real-ip"] ||
      req.connection.remoteAddress ||
      req.socket.remoteAddress ||
      req.ip ||
      "unknown";
    return `${ipData}`;
  };

  filterMiddleware(req: Request, res: Response, next: NextFunction) {
    // if (
    //   (req.headers["x-forwarded-for"] === "" ||
    //     req.headers["x-forwarded-for"] === undefined) &&
    //   (req.headers["x-real-ip"] === "" ||
    //     req.headers["x-real-ip"] === undefined)
    // ) {
    //   throw new BadRequestError("Invalid request");
    // }

    if (!req) {
      throw new BadRequestError("Invalid request");
    }

    if (!req.headers) {
      throw new BadRequestError("Invalid request: headers not found");
    }

    if (!req.body) {
      throw new BadRequestError("Invalid request: body not found");
    }

    // if (!req.params) {
    //   throw new BadRequestError("Invalid request: params not found");
    // }

    // if (!req.query) {
    //   throw new BadRequestError("Invalid request: query not found");
    // }

    // if (!req.cookies) {
    //   throw new BadRequestError("Invalid request: cookies not found");
    // }

    // if (!req.signedCookies) {
    //   throw new BadRequestError("Invalid request: signedCookies not found");
    // }

    // if (!req.ip) {
    //   throw new BadRequestError("Invalid request: ip not found");
    // }

    // if (!req.path) {
    //   throw new BadRequestError("Invalid request: path not found");
    // }

    // if (!req.hostname) {
    //   throw new BadRequestError("Invalid request: hostname not found");
    // }

    req.headers.requestId = nanoidGenerator.generateId();

    next();
  }
}
