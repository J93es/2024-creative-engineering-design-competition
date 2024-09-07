import { nanoid } from "nanoid";

import { IdGenerator } from "@core/util/idGenerator";

export class NanoidGenerator implements IdGenerator {
  generateId(length: number = 8) {
    return nanoid(length);
  }
}
