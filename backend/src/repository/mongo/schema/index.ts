import mongoose from "mongoose";

import { accidentSchema } from "@repository/mongo/schema/accident-schema";
import { railRobotSchema } from "@repository/mongo/schema/rail-robot-schema";

export const AccidentSchema = mongoose.model("AccidentSchema", accidentSchema);
export const RailRobotSchema = mongoose.model(
  "RailRobotSchema",
  railRobotSchema
);
