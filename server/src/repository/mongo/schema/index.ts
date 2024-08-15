import mongoose from "mongoose";

import { accidentSchema } from "@repository/mongo/schema/accidentSchema";
import { railRobotSchema } from "@repository/mongo/schema/railRobotSchema";

export const AccidentSchema = mongoose.model("AccidentSchema", accidentSchema);
export const RailRobotSchema = mongoose.model(
  "RailRobotSchema",
  railRobotSchema
);
