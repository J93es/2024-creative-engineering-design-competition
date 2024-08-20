import mongoose from "mongoose";
import { RailRobotType, Command } from "@model/railRobot";

const { Schema } = mongoose;

export const railRobotSchema = new Schema<RailRobotType>({
  id: { type: String, unique: true, required: true, readonly: true },

  command: {
    type: String,
    enum: [
      Command.PATROL,
      Command.ALARMING,
      Command.CHARGE,
      Command.MOVE_TO_TARGET_LOCATION,
    ],
    default: Command.PATROL,
  },
  currentLocation: { type: Number, required: true },
  targetLocation: { type: Number },
  patrolStartLocation: { type: Number },
  patrolEndLocation: { type: Number },
});
