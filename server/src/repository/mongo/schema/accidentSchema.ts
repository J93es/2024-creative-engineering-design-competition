import mongoose from "mongoose";
import { AccidentType, Code, Status } from "@model/accident";

const { Schema } = mongoose;

export const accidentSchema = new Schema<AccidentType>({
  _id: { type: String, unique: true, required: true, readonly: true },
  id: { type: String, unique: true, required: true, readonly: true },

  code: { type: Number, enum: [Code.CAR_CRASH | Code.FIRE | Code.FLOOD] },
  location: { type: Number, required: true },
  discoverorRobotId: { type: String, required: true },
  status: {
    type: Number,
    enum: [
      Status.DETECTED | Status.DETECTION_ERROR | Status.ALARMING | Status.END,
    ],
    default: Status.DETECTED,
  },
});
