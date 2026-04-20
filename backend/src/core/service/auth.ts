import { Request, Response, NextFunction } from "express";
import { AuthType } from "@model/interface/auth";

export interface AuthService {
  isAuthentic(req: Request, useQueryOption?: boolean): boolean;
  checkAuthMiddleware(req: Request, res: Response, next: NextFunction): void;
}
