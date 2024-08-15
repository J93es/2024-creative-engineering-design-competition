import { RailRobotType } from "@model/railRobot";
import { RailRobotRepository } from "@core/repository/railRobot";
import { RailRobotSchema } from "@repository/mongo/schema/index";

export class RailRobotMongoRepo implements RailRobotRepository {
  async readAll(): Promise<RailRobotType[]> {
    return await RailRobotSchema.find().lean();
  }

  async read(id: string): Promise<RailRobotType> {
    const railRobot: RailRobotType | null = await RailRobotSchema.findOne({
      id: id,
    }).lean();
    if (!railRobot) {
      throw new Error("RailRobot not found");
    }

    return railRobot;
  }

  async create(data: RailRobotType): Promise<RailRobotType> {
    const railRobot = new RailRobotSchema(data);
    await railRobot.save();
    return railRobot.toObject();
  }

  async update(data: RailRobotType): Promise<RailRobotType> {
    const railRobot = await RailRobotSchema.findOneAndUpdate(
      { id: data.id },
      data,
      { new: true }
    );
    if (!railRobot) {
      throw new Error("RailRobot not found");
    }
    return railRobot.toObject();
  }

  async delete(id: string): Promise<void> {
    await RailRobotSchema.deleteOne({ id: id });
  }
}
