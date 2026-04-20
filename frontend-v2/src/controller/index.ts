import { AuthController } from "controller/auth";
import { RailRobotFetchController } from "controller/railRobotFetch";
import { AlarmFetchController } from "controller/alarmFetch";
import { AccidentFetchController } from "controller/accidentFetch";
import { AdminFetchController } from "controller/adminFetch";
import { SerialPortController } from "controller/serialPort";
import { VmsController } from "controller/vms";

export const authController = new AuthController();
export const railRobotFetchController = new RailRobotFetchController();
export const alarmFetchController = new AlarmFetchController();
export const accidentFetchController = new AccidentFetchController();
export const adminFetchController = new AdminFetchController();
export const serialPortController = new SerialPortController();
export const vmsController = new VmsController();
