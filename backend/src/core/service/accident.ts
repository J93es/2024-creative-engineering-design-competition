import { AccidentType } from "@model/accident";

export interface AccidentService {
  isExist(): Promise<boolean>;
  get(): Promise<AccidentType>;
  report(data: AccidentType): Promise<AccidentType>;
  patch(data: Partial<AccidentType>): Promise<AccidentType>;
  patchProbability(data: Partial<AccidentType>): Promise<AccidentType>;
  ignore(): Promise<AccidentType>;
  startAlarm(): Promise<AccidentType>;
  endAlarm(): Promise<AccidentType>;
}
