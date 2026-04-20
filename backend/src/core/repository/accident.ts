import { AccidentType } from "@model/accident";

export interface AccidentRepository {
  readAll(): Promise<AccidentType[]>;
  readByCode(code: string): Promise<AccidentType[]>;
  readByStatus(status: string): Promise<AccidentType[]>;
  read(id: string): Promise<AccidentType>;
  create(data: AccidentType): Promise<AccidentType>;
  update(data: Partial<AccidentType>): Promise<AccidentType>;
  delete(id: string): Promise<void>;
  deleteAll(): Promise<void>;
}
