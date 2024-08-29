import { v4 as uuidv4 } from "uuid";

import { IdGenerator } from "@core/util/idGenerator";

let instance: UuidGenerator | null = null;
export class UuidGenerator implements IdGenerator {
  constructor() {
    if (instance) return instance;
    instance = this;
  }

  generateId() {
    return uuidv4();
  }
}
