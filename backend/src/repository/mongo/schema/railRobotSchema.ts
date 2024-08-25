import mongoose from "mongoose";
import { RailRobotType, RailRobotCommand } from "@model/railRobot";

const { Schema } = mongoose;

export const railRobotSchema = new Schema<RailRobotType>({
  id: { type: String, unique: true, required: true, readonly: true },

  command: {
    type: String,
    enum: [
      RailRobotCommand.PATROL,
      RailRobotCommand.ALARMING,
      RailRobotCommand.CHARGE,
      RailRobotCommand.MOVE_TO_TARGET_LOCATION,
      RailRobotCommand.STOP,
    ],
    default: RailRobotCommand.STOP,
  },
  currentLocation: { type: Number, required: true },
  targetLocation: { type: Number },
  patrolStartLocation: { type: Number },
  patrolEndLocation: { type: Number },
});
