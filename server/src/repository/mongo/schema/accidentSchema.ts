import mongoose from "mongoose";
import { AccidentType, Code, Status } from "@model/accident";

const { Schema } = mongoose;

export const accidentSchema = new Schema<AccidentType>({
  id: { type: String, unique: true, required: true, readonly: true },

  code: { type: String, enum: [Code.CAR_CRASH, Code.FIRE, Code.FLOOD] },
  location: { type: Number, required: true },
  discoverorRobotId: { type: String, required: true },
  status: {
    type: String,
    enum: [Status.DETECTED, Status.IGNORED, Status.ALARMING, Status.END],
    default: Status.DETECTED,
  },
});
