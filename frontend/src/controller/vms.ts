import { serialPortController } from "controller";

export enum VmsStatus {
  IDLE = "0",
  CAR_CRASH = "1",
}

export class VmsController {
  private status: VmsStatus.IDLE | VmsStatus.CAR_CRASH = VmsStatus.IDLE;
  private isOpened: boolean = false;
  private accidentLocation: number = 0;

  isConnected = () => this.isOpened;
  getStatus = () => this.status;
  getLocation = () => this.accidentLocation;

  connect = async () => {
    await serialPortController.open();
    await this.idle();
    this.isOpened = true;
  };

  disconnect = async () => {
    await serialPortController.close();
    this.isOpened = false;
  };

  idle = async () => {
    if (!this.isConnected()) {
      return;
    }
    await serialPortController.write("I");
    this.status = VmsStatus.IDLE;
  };

  accident = async () => {
    if (!this.isConnected()) {
      return;
    }
    await serialPortController.write("A");
    this.status = VmsStatus.CAR_CRASH;
  };

  location = async (location: number) => {
    if (!this.isConnected()) {
      return;
    }
    await serialPortController.write(`/${location}!`);
    this.accidentLocation = location;
  };
}
