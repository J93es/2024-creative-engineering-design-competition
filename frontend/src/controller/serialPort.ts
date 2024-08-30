export class SerialPortController {
  private port: any = null;
  private buffer: { writeTime: number; value: Uint8Array }[] = [];

  private keepReading: boolean = false;
  private reader: any;
  private writer: any;

  open = async () => {
    const filters: string[] = [];
    this.port = await (navigator as any).serial.requestPort({
      filters,
    });
    const { usbProductId, usbVendorId } = this.port.getInfo();
    // await this.port.open({ baudRate: 460800 });
    // await this.port.open({ baudRate: 9600 });
    await this.port.open({ baudRate: 115200 });
    console.log(`usb product id: ${usbProductId}`);
    console.log(`usb vender id: ${usbVendorId}`);
  };

  close = async () => {
    this.keepReading = false;
    this.reader.cancel();
    await this.port.close();
  };

  write = async (data: string) => {
    const rawData = new TextEncoder().encode(data);
    this.writer = this.port.writable.getWriter();
    await this.writer.write(rawData);

    this.writer.releaseLock();
    console.log(`string: ${data} - - rawData: ${rawData}`);
  };
}
