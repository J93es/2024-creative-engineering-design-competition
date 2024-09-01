import { Request } from "express";

export const getIP = (request: Request): string => {
  const ipData =
    request.headers["x-real-ip"] ||
    request.headers["x-forwarded-for"] ||
    request.ip ||
    "unknown";
  return `${ipData}`;
};
