import { Request } from "express";

export const getIP = (request: Request): string => {
  return (
    request.ip ||
    (request.headers["x-forwarded-for"] as string) ||
    (request.headers["x-real-ip"] as string) ||
    "unrevealed"
  );
};