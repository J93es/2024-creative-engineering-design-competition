import "module-alias/register";

import dotenv from "dotenv";
dotenv.config();

import logger from "morgan";
import express, { Application, Request, Response } from "express";
import cookieParser from "cookie-parser";
import path from "path";
import cors from "cors";
import mongoose from "mongoose";

import suRailRobotRouter from "@route/su-railRobot";
import suAccidentRouter from "@route/su-accident";
import railRobotRouter from "@route/railRobot";
import accidentRouter from "@route/accident";
import alarmRouter from "@route/alarm";
import adminRouter from "@route/admin";

import { webSoketService, authService } from "@service/index";
import { uri, PORT, isProduction } from "@config/index";
import { rateLimiter, corsOptions, errorHandler } from "@utils/index";

const app: Application = express();
app.set("trust proxy", "loopback, linklocal, uniquelocal");
app.set("port", PORT || 8000);
app.set("view engine", "ejs");

if (isProduction) {
  app.use(logger("combined"));

  logger.token("client-info", (req: Request, res: Response) => {
    return req.headers.cedc_id as string;
  });
  app.use(logger(":client-info"));
} else {
  app.use(logger("dev"));
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors(corsOptions));

app.use(express.static(path.join(__dirname, "public")));

app.use(rateLimiter.makeLimit(1, 6000));

app.use(authService.checkAuthMiddleware);

app.use("/rail-robot", railRobotRouter);
app.use("/accident", accidentRouter);
app.use("/alarm", alarmRouter);
app.use("/admin", adminRouter);
app.use("/su-rail-robot", suRailRobotRouter);
app.use("/su-accident", suAccidentRouter);

app.use(errorHandler.handleNotFound);
app.use(errorHandler.handleAuthError);
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
