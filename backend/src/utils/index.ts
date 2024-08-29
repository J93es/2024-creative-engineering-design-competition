import { UuidGenerator } from "@utils/uuid";
import { RateLimiter } from "@utils/rateLimiter";
import { ErrorHandler } from "@utils/error-handler";
import { corsOptions } from "@utils/cors";
import { wrapAsyncController } from "@utils/wrapAsync";
import { Logger } from "@utils/logger";
import { RequestChecker } from "@utils/requestChecker";

export const idGenerator = new UuidGenerator();
export const rateLimiter = new RateLimiter();
export const errorHandler = new ErrorHandler();
export { corsOptions };
export { wrapAsyncController };

export const logger = new Logger();
export const requestChecker = new RequestChecker();
