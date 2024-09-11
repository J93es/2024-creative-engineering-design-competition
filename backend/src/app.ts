import "module-alias/register";

import dotenv from "dotenv";
dotenv.config();

import logger from "morgan";
import express, { Application, Request, Response } from "express";
import cookieParser from "cookie-parser";
import path from "path";
import cors from "cors";
import mongoose from "mongoose";

import {
  railRobotRouter,
  accidentRouter,
  alarmRouter,
  adminRouter,
  suRailRobotRouter,
  suAccidentRouter,
} from "@router/index";

import { webSoketService, authService } from "@service/index";
import { uri, PORT } from "@config/app-config";
import {
  rateLimiter,
  corsOptions,
  errorHandler,
  requestUtils,
  customLogger,
} from "@utils/index";

const app: Application = express();
app.set("trust proxy", "loopback, linklocal, uniquelocal");
app.set("port", PORT || 8000);
app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors(corsOptions));

app.use(express.static(path.join(__dirname, "public")));

app.use(requestUtils.filterMiddleware);

logger.token("request-id", (req: Request) => {
  return requestUtils.getId(req) || "No custom message";
});

logger.token("log-msg", (req: Request) => {
  return customLogger.getLogMsg(req) || "No custom message";
});

app.use(
  logger(
    ":request-id :remote-addr - :remote-user [:date[clf]] :method :url HTTP/:http-version :status :res[content-length] - :response-time ms :log-msg"
  )
);

app.use(rateLimiter.makeLimit(60, 3000));

app.use(authService.checkAuthMiddleware);

app.use("/rail-robot", railRobotRouter);
app.use("/accident", accidentRouter);
app.use("/alarm", alarmRouter);
app.use("/admin", adminRouter);
app.use("/su-rail-robot", suRailRobotRouter);
app.use("/su-accident", suAccidentRouter);

app.use(errorHandler.handleRouterNotFound);
app.use(errorHandler.handleResourceNotFound);
app.use(errorHandler.handleSyntaxError);
app.use(errorHandler.handleAuthError);
app.use(errorHandler.handleBadRequestError);
app.use(errorHandler.handleAssertionError);
app.use(errorHandler.handleDatabaseError);
app.use(errorHandler.handleError);

webSoketService.connection();

mongoose
  .connect(uri)
  .then(() => {
    console.log("Connected to MongoDB");
    const server = app.listen(app.get("port"), () => {
      console.log(app.get("port"), "번에서 대기중");
    });

    server.on("upgrade", (request, socket, head) => {
      webSoketService.subscribe(request, socket, head);
    });
  })
  .catch((err) => {
    console.error(err);
  });
