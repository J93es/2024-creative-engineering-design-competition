import "module-alias/register";

import dotenv from "dotenv";
dotenv.config();

import logger from "morgan";
import createError from "http-errors";
import express, {
  Application,
  Request,
  Response,
  NextFunction,
  Errback,
} from "express";
import cookieParser from "cookie-parser";
import path from "path";
import cors from "cors";

import corsOptions from "@utils/cors/index";

import suRailRobotRouter from "@route/su-railRobot";
import suAccidentRouter from "@route/su-accident";
import railRobotRouter from "@route/railRobot";
import accidentRouter from "@route/accident";
import alarmRouter from "@route/alarm";
import resetRouter from "@route/reset";

import { rateLimit } from "express-rate-limit";
import { sendErrorResponse } from "@utils/response";

import { uri, PORT } from "@config/index";
import mongoose from "mongoose";

const app: Application = express();

app.set("port", process.env.PORT || PORT || 8000);
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors(corsOptions));

app.use(express.static(path.join(__dirname, "public")));

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  limit: 100,
  standardHeaders: "draft-7",
  // legacyHeaders: false,
  handler: (req, res) => {
    sendErrorResponse(res, "Too many requests, please try again later.", 429);
  },
});

// Apply the rate limiting middleware to all requests.
app.use(limiter);

app.use("/rail-robot", railRobotRouter);
app.use("/accident", accidentRouter);
app.use("/alarm", alarmRouter);

app.use("/su-rail-robot", suRailRobotRouter);
app.use("/su-accident", suAccidentRouter);

app.use("/reset", resetRouter);

// error handler
app.use((err: Errback, req: Request, res: Response, next: NextFunction) => {
  // set locals, only providing error in development
  try {
    res.locals.message = err.toString();
    res.locals.error = req.app.get("env") === "development" ? err : {};

    console.error(err);
    // render the error page
    res.status(500);
  } catch (err) {
    res.status(500);
  }
});

mongoose
  .connect(uri)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(app.get("port"), () => {
      console.log(app.get("port"), "번에서 대기중");
    });
  })
  .catch((err) => {
    console.error(err);
  });
