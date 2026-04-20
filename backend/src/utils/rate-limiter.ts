import { rateLimit } from "express-rate-limit";
import { responseUtils } from "@utils/index";

import { customLogger, requestUtils } from "@utils/index";

export class RateLimiter {
  makeLimit(second: number, limit: number) {
    const limiter = rateLimit({
      windowMs: second * 1000,
      limit: limit,
      standardHeaders: "draft-7",
      handler: (req, res) => {
        customLogger.warn(
          "RateLimiter",
          `${req.ip} has exceeded the ${limit} requests in ${second} secondes limit`,
          req
        );
        responseUtils.sendError(
          res,
          "Too many requests, please try again later.",
          429
        );
      },
    });

    return limiter;
  }
}
