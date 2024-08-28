import { authData } from "@config/index";
import { Request, Response, NextFunction } from "express";
import { AuthService } from "@core/service/auth";
import { AuthError } from "@model/interface/authError";

export class AuthServ implements AuthService {
  checkAuthentic = (req: Request): void => {
    // const id = req.body.clientId as string;
    // const password = req.body.clientPassword as string;

    // req.body.clientId = null;
    // req.body.clientPassword = null;

    // try {
    //   delete req.body.cedc_id;
    //   delete req.body.cedc_password;
    // } catch {}

    const reqAuthData = req.headers["cedc-auth"] as string;

    const [id, password] = reqAuthData.replace(/\s+/g, "").split(":");

    const admin = authData.find(
      (admin: any) => admin.id === id && admin.password === password
    );

    if (!admin) {
      throw new AuthError("Unauthorized");
    }
  };

  isAuthentic = (req: Request): boolean => {
    try {
      this.checkAuthentic(req);
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
    this.checkAuthentic(req);
    next();
  };
}
