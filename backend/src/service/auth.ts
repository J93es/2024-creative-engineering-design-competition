import { adminAuthData } from "@config/index";
import { Request, Response, NextFunction } from "express";
import { AuthService } from "@core/service/auth";
import { AuthError } from "@model/interface/authError";
import { AuthType } from "@model/interface/auth";

export class AuthServ implements AuthService {
  checkAuthentic = (authData: AuthType): void => {
    if (!authData) {
      throw new Error("authData is required");
    }

    const admin = adminAuthData.find(
      (admin: any) =>
        admin.id === authData.id && admin.password === authData.password
    );

    if (!admin) {
      throw new AuthError("Unauthorized");
    }
  };

  isAuthentic = (req: Request): boolean => {
    try {
      const id = req.headers.cedcid as string;
      const password = req.headers.cedcpassword as string;
      this.checkAuthentic({ id: id, password: password });
      return true;
    } catch (error) {
      return false;
    }
  };

  checkAuthMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
  ): void => {
    const id = req.headers.cedcid as string;
    const password = req.headers.cedcpassword as string;

    console.log(id, password);

    this.checkAuthentic({ id: id, password: password });
    next();
  };
}
