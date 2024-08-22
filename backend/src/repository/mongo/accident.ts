import Accident, { AccidentType } from "@model/accident";
import { AccidentRepository } from "@core/repository/accident";
import { AccidentSchema } from "@repository/mongo/schema/index";

export class AccidentMongoRepo implements AccidentRepository {
  async readAll(): Promise<AccidentType[]> {
    const accidentList = await AccidentSchema.find().lean();
    return accidentList.map((accident) => new Accident(accident));
  }

  async readByCode(code: string): Promise<AccidentType[]> {
    const accidentList = await AccidentSchema.find({ code: code }).lean();
    return accidentList.map((accident) => new Accident(accident));
  }

  async readByStatus(status: string): Promise<AccidentType[]> {
    const accidentList = await AccidentSchema.find({ status: status }).lean();
    return accidentList.map((accident) => new Accident(accident));
  }

  async read(id: string): Promise<AccidentType> {
    const accident: AccidentType | null = await AccidentSchema.findOne({
      id: id,
    }).lean();
    if (!accident) {
      throw new Error("Accident not found");
    }

    return new Accident(accident);
  }

  async create(data: AccidentType): Promise<AccidentType> {
    const accident = new AccidentSchema(new Accident(data));
    await accident.save();
    return new Accident(accident);
  }

  async update(data: Partial<AccidentType>): Promise<AccidentType> {
    const accident = await AccidentSchema.findOneAndUpdate(
      { id: data.id },
      data,
      { new: true }
    );
    if (!accident) {
      throw new Error("Accident not found");
    }
    return new Accident(accident);
  }

  async delete(id: string): Promise<void> {
    const accident = await AccidentSchema.deleteOne({ id: id });
    if (!accident.deletedCount) {
      throw new Error("Accident not found");
    }
  }

  async deleteAll(): Promise<void> {
    await AccidentSchema.deleteMany({});
  }
}
