import RailRobot, { RailRobotType } from "@model/rail-robot";
import { RailRobotRepository } from "@core/repository/rail-robot";
import { RailRobotSchema } from "@repository/mongo/schema/index";
import { ResourceNotFoundError } from "@model/interface/error";

export class RailRobotMongoRepo implements RailRobotRepository {
  async readAll(): Promise<RailRobotType[]> {
    const railRobotList = await RailRobotSchema.find().lean();
    return railRobotList.map((railRobot) => new RailRobot(railRobot));
  }

  async read(id: string): Promise<RailRobotType> {
    const railRobot: RailRobotType | null = await RailRobotSchema.findOne({
      id: id,
    }).lean();
    if (!railRobot) {
      throw new ResourceNotFoundError("RailRobot not found");
    }

    return new RailRobot(railRobot);
  }

  async create(data: RailRobotType): Promise<RailRobotType> {
    const railRobot = new RailRobotSchema(new RailRobot(data));
    await railRobot.save();
    return new RailRobot(railRobot);
  }

  async update(data: Partial<RailRobotType>): Promise<RailRobotType> {
    const railRobot = await RailRobotSchema.findOneAndUpdate(
      { id: data.id },
      data,
      { new: true }
    );
    if (!railRobot) {
      throw new ResourceNotFoundError("RailRobot not found");
    }
    return new RailRobot(railRobot);
  }

  async delete(id: string): Promise<void> {
    const railRobot = await RailRobotSchema.deleteOne({ id: id });
    if (!railRobot.deletedCount) {
      throw new ResourceNotFoundError("RailRobot not found");
    }
  }

  async deleteAll(): Promise<void> {
    await RailRobotSchema.deleteMany({});
  }
}
