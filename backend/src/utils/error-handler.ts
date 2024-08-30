import { AssertionError } from "assert";
import { MongooseError } from "mongoose";
import {
  AuthError,
  BadRequestError,
  ResourceNotFoundError,
} from "@model/interface/error";
import { logger } from "@utils/index";

export class ErrorHandler {
  handleRouterNotFound = (req: any, res: any, next: any) => {
    if (res.headersSent) {
      return next();
    }
    logger.error("RouterNotFound", "RouterNotFound", req);
    res.status(404).json({
      type: "RouterNotFoundError",
      msg: "Router Not Found",
    });
  };

  handleResourceNotFound = (error: any, req: any, res: any, next: any) => {
    if (error instanceof ResourceNotFoundError) {
      logger.error("ResourceNotFoundError", error.message, req);
      res.status(404).json({
        type: "ResourceNotFoundError",
        msg: error.message,
      });
      return;
    }

    next(error);
  };

  handleSyntaxError = (error: any, req: any, res: any, next: any) => {
    if (error instanceof SyntaxError) {
      logger.error("SyntaxError", error.message, req);
      res.status(400).json({
        type: "SyntaxError",
        msg: error.message,
      });
      return;
    }

    next(error);
  };

  handleBadRequestError = (error: any, req: any, res: any, next: any) => {
    if (error instanceof BadRequestError) {
      logger.error("BadRequestError", error.message, req);
      res.status(400).json({
        type: "BadRequestError",
        msg: error.message,
      });
      return;
    }
    next(error);
  };

  handleAssertionError = (error: any, req: any, res: any, next: any) => {
    if (error instanceof AssertionError) {
      logger.error("AssertionError", error.message, req);
      res.status(400).json({
        type: "AssertionError",
        msg: error.message,
      });
      return;
    }
    next(error);
  };

  handleDatabaseError = (error: any, req: any, res: any, next: any) => {
    if (error instanceof MongooseError) {
      logger.error("MongooseError", error.message, req);
      res.status(503).json({
        type: "MongooseError",
        msg: error.message,
      });
      return;
    }
    next(error);
  };

  handleAuthError = (error: any, req: any, res: any, next: any) => {
    if (error instanceof AuthError) {
      logger.error("AuthError", error.message, req);
      res.status(401).json({
        type: "AuthError",
        msg: error.message,
      });
      return;
    }
    next(error);
  };

  handleError = (error: any, req: any, res: any, next: any) => {
    try {
      res.locals.message = `${error}`;
      res.locals.error = error;

      logger.error("InternalServerError", error.message, req);
      res.status(500).json({
        type: "InternalServerError",
        msg: `${error.message}`,
      });
    } catch (err) {
      res.end();
    }
  };
}
