import { AccidentType } from "@model/accident";

export interface SuAccidentService {
  getAll(): Promise<AccidentType[]>;
  get(id: string): Promise<AccidentType>;
  create(data: AccidentType): Promise<AccidentType>;
  update(id: string, data: AccidentType): Promise<AccidentType>;
  delete(id: string): Promise<void>;
  reset(): Promise<void>;
}
