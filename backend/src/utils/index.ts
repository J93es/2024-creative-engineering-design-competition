import { UuidGenerator } from "@utils/uuid";
import { RateLimiter } from "@utils/rateLimiter";
import { ErrorHandler } from "@utils/error-handler";
import { corsOptions } from "@utils/cors";
import { wrapAsyncController } from "@utils/wrapAsync";
import { CustomLogger } from "@utils/customLogger";
import { RequestUtils } from "@utils/requestUtils";
import { NanoidGenerator } from "@utils/nanoid";

export const idGenerator = new UuidGenerator();
export const rateLimiter = new RateLimiter();
export const errorHandler = new ErrorHandler();
export { corsOptions };
export { wrapAsyncController };

export const customLogger = new CustomLogger();
export const requestUtils = new RequestUtils();
export const nanoidGenerator = new NanoidGenerator();
