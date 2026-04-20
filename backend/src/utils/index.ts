import { UuidGenerator } from "@utils/uuid";
import { RateLimiter } from "@utils/rate-limiter";
import { ErrorHandler } from "@utils/error-handler";
import { corsOptions } from "@utils/cors";
import { wrapAsyncController } from "@utils/wrap-async";
import { CustomLogger } from "@utils/custom-logger";
import { RequestUtils } from "@utils/request-utils";
import { NanoidGenerator } from "@utils/nanoid";
import { RespnseUtils } from "@utils/response-utils";

export const idGenerator = new UuidGenerator();
export const rateLimiter = new RateLimiter();
export const errorHandler = new ErrorHandler();
export { corsOptions };
export { wrapAsyncController };

export const customLogger = new CustomLogger();
export const requestUtils = new RequestUtils();
export const nanoidGenerator = new NanoidGenerator();
export const responseUtils = new RespnseUtils();
