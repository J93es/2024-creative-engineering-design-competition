import { AccidentType } from "@model/accident";
import { AccidentRepository } from "@core/repository/accident";
import { AccidentSchema } from "@repository/mongo/schema/index";

export class AccidentMongoRepo implements AccidentRepository {
  async readAll(): Promise<AccidentType[]> {
    return await AccidentSchema.find().lean();
  }

  async readByCode(code: string): Promise<AccidentType[]> {
    return await AccidentSchema.find({ code: code }).lean();
  }

  async readByStatus(status: string): Promise<AccidentType[]> {
    return await AccidentSchema.find({ status: status }).lean();
  }

  async read(id: string): Promise<AccidentType> {
    const accident: AccidentType | null = await AccidentSchema.findOne({
      id: id,
    }).lean();
    if (!accident) {
      throw new Error("Accident not found");
    }

    return accident;
  }

  async create(data: AccidentType): Promise<AccidentType> {
    const accident = new AccidentSchema(data);
    await accident.save();
    return accident.toObject();
  }

  async update(data: AccidentType): Promise<AccidentType> {
    const accident = await AccidentSchema.findOneAndUpdate(
      { id: data.id },
      data,
      { new: true }
    );
    if (!accident) {
      throw new Error("Accident not found");
    }
    return accident.toObject();
  }

  async delete(id: string): Promise<void> {
    await AccidentSchema.deleteOne({ id: id });
  }
}
