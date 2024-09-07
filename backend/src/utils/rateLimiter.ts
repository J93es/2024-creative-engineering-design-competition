import { rateLimit } from "express-rate-limit";
import { sendErrorResponse } from "@tools/response";

import { customLogger, requestUtils } from "@utils/index";

export class RateLimiter {
  makeLimit(second: number, limit: number) {
    const limiter = rateLimit({
      windowMs: second * 60 * 1000,
      limit: limit,
      standardHeaders: "draft-7",
      // legacyHeaders: false,
      keyGenerator: (req) => {
        return requestUtils.getIp(req);
      },
      handler: (req, res) => {
        customLogger.warn(
          "RateLimiter",
          `${req.ip} has exceeded the ${limit} requests in ${second} minutes limit`,
          req
        );
        sendErrorResponse(
          res,
          "Too many requests, please try again later.",
          429
        );
      },
    });

    return limiter;
  }
}
