import { nanoid } from "nanoid";

import { IdGenerator } from "@core/util/id-generator";

export class NanoidGenerator implements IdGenerator {
  generateId(length: number = 8) {
    return nanoid(length);
  }
}
