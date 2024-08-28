import { Request, Response, NextFunction } from "express";
import { AuthType } from "@model/interface/auth";

export interface AuthService {
  isAuthentic(req: Request): boolean;
  checkAuthMiddleware(req: Request, res: Response, next: NextFunction): void;
}
