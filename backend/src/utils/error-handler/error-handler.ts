import { AssertionError } from "assert";
import { MongooseError } from "mongoose";
import { isProduction } from "@config/index";

export class ErrorHandler {
  handleNotFound(req: any, res: any, next: any) {
    if (res.headersSent) {
      return next();
    }
    console.error("Not Found");
    res.status(404).json({
      type: "NotFoundError",
      msg: "Not Found",
    });
  }

  handleAssertionError(error: any, req: any, res: any, next: any) {
    if (error instanceof AssertionError) {
      console.error(error);
      res.status(400).json({
        type: "AssertionError",
        msg: isProduction ? "AssertionError" : error.message,
      });
    }
    next(error);
  }

  handleDatabaseError(error: any, req: any, res: any, next: any) {
    if (error instanceof MongooseError) {
      console.error(error);
      res.status(503).json({
        type: "MongooseError",
        msg: isProduction ? "MongooseError" : error.message,
      });
    }
    next(error);
  }

  handleError(error: any, req: any, res: any, next: any) {
    try {
      res.locals.message = error.toString();
      res.locals.error = isProduction ? {} : error;

      console.error(error);
      res.status(500).json({
        type: "InternalServerError",
        msg: isProduction ? "Internal Server Error" : error.toString(),
      });
    } catch (err) {
      res.end();
    }
  }
}
