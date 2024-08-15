import mongoose from "mongoose";
import { RailRobotType, Command } from "@model/railRobot";

const { Schema } = mongoose;

export const railRobotSchema = new Schema<RailRobotType>({
  _id: { type: String, unique: true, required: true, readonly: true },
  id: { type: String, unique: true, required: true, readonly: true },

  command: {
    type: Number,
    enum: [
      Command.PATROL |
        Command.ALARMING |
        Command.CHARGE |
        Command.MOVE_TO_TARGET_LOCATION,
    ],
    default: Command.PATROL,
  },
  currentLocation: { type: Number },
  targetLocation: { type: Number },
  patrolStartLocation: { type: Number },
  patrolEndLocation: { type: Number },
});
