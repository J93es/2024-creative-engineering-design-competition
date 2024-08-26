import { UuidGenerator } from "@utils/id-generator/uuid";
import { RateLimiter } from "@utils/rate-limiter/rateLimiter";
import { ErrorHandler } from "@utils/error-handler/error-handler";
import { corsOptions } from "@utils/cors/index";
import { wrapAsyncController } from "@utils/wrap-async/wrapAsync";

export const idGenerator = new UuidGenerator();
export const rateLimiter = new RateLimiter();
export const errorHandler = new ErrorHandler();
export { corsOptions };
export { wrapAsyncController };
