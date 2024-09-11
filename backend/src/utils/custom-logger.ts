import { Request } from "express";
import { requestUtils } from "@utils/index";

export class CustomLogger {
  private formatDateToCustomString = (date: Date) => {
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

  makeSimpleMsg = (head: string, message: string) => {
    return `"${head}"|${message}`;
  };

  private makeMsg = (head: string, message: string, req?: Request) => {
    if (!req)
      return `[${this.formatDateToCustomString(
        new Date()
      )}] ${this.makeSimpleMsg(head, message)}`;

    return `${requestUtils.getId(req)} ${requestUtils.getIp(
      req
    )} - - [${this.formatDateToCustomString(new Date())}] ${this.makeSimpleMsg(
      head,
      message
    )}`;
  };

  addLogMsg = (req: Request, logMsg: string) => {
    if (!req.headers.logMsg) {
      req.headers.logMsg = [logMsg];
      return;
    }

    if (!Array.isArray(req.headers.logMsg)) {
      req.headers.logMsg = [req.headers.logMsg, logMsg];
      return;
    }

    req.headers.logMsg.push(logMsg);
  };

  getLogMsg = (req: Request): string => {
    return `${req.headers.logMsg}` || "No custom message";
  };

  log = (
    head: string,
    message: string,
    req?: Request,
    doNotUseBuffer?: boolean
  ) => {
    if (!req) {
      console.log(this.makeSimpleMsg(head, message));
      return;
    }

    if (doNotUseBuffer) {
      console.log(this.makeMsg(head, message, req));
      return;
    }
    this.addLogMsg(req, this.makeSimpleMsg(head, message));
  };

  info = (head: string, message: string, req?: Request) => {
    this.log(head, message, req);
    console.info(this.makeMsg(head, message, req));
  };

  warn = (head: string, message: string, req?: Request) => {
    this.log(head, message, req);
    console.warn(this.makeMsg(head, message, req));
  };

  error = (head: string, message: string, req?: Request) => {
    this.log(head, message, req);
    console.error(this.makeMsg(head, message, req));
  };
}
