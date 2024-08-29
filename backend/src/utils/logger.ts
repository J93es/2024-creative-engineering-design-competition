import { Request } from "express";
import { getIP } from "@tools/getIp";

export class Logger {
  formatDateToCustomString = (date: Date) => {
    const day = date.getUTCDate().toString().padStart(2, "0");
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const month = monthNames[date.getUTCMonth()];
    const year = date.getUTCFullYear();
    const hours = date.getUTCHours().toString().padStart(2, "0");
    const minutes = date.getUTCMinutes().toString().padStart(2, "0");
    const seconds = date.getUTCSeconds().toString().padStart(2, "0");

    const formattedDate = `${day}/${month}/${year}:${hours}:${minutes}:${seconds} +0000`;
    return formattedDate;
  };

  log = (head: string, message: string, req?: Request) => {
    if (!req) {
      console.log(
        `[${this.formatDateToCustomString(new Date())}] - ${message}`
      );
      return;
    }

    console.log(
      `${getIP(req)} - - [${this.formatDateToCustomString(
        new Date()
      )}] "${head}" - ${message}`
    );
  };

  error = (head: string, message: string, req?: Request) => {
    if (!req) {
      console.error(
        `[${this.formatDateToCustomString(new Date())}] - ${message}`
      );
      return;
    }

    console.error(
      `${getIP(req)} - - [${this.formatDateToCustomString(
        new Date()
      )}] "${head}" - ${message}`
    );
  };
}
