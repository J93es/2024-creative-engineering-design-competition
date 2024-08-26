import { rateLimit } from "express-rate-limit";
import { sendErrorResponse } from "@tools/response";

export class RateLimiter {
  makeLimit(second: number, limit: number) {
    const limiter = rateLimit({
      windowMs: second * 60 * 1000,
      limit: limit,
      standardHeaders: "draft-7",
      // legacyHeaders: false,
      handler: (req, res) => {
        console.log(
          `${req.ip} has exceeded the ${limit} requests in ${second} minutes limit`
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
