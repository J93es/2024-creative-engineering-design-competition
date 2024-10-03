import mongoose from "mongoose";
import { AccidentType, AccidentCode, AccidentStatus } from "@model/accident";

const { Schema } = mongoose;

export const accidentSchema = new Schema<AccidentType>({
  id: { type: String, unique: true, required: true, readonly: true },

  code: {
    type: String,
    enum: [AccidentCode.CAR_CRASH, AccidentCode.FIRE, AccidentCode.FLOOD],
    default: AccidentCode.CAR_CRASH,
  },
  location: { type: Number, required: true },
  discoverorRobotId: { type: String, required: true },
  probability: { type: Number },
  status: {
    type: String,
    enum: [
      AccidentStatus.DETECTED,
      AccidentStatus.IGNORED,
      AccidentStatus.ALARMING,
      AccidentStatus.END,
    ],
    default: AccidentStatus.DETECTED,
  },
});
