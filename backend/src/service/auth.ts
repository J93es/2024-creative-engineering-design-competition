import { authData } from "@config/index";
import { Request, Response, NextFunction } from "express";
import { AuthType } from "@model/interface/auth";
import { AuthService } from "@core/service/auth";
import { AuthError } from "@model/interface/authError";
import url from "url";

export class AuthServ implements AuthService {
  checkAuthentic = (req: Request, useQueryOption: boolean = false): void => {
    const headersAuthData = (req.headers["cedc-auth"] as string) ?? "";
    const [headersId, headersPassword] = headersAuthData
      ?.replace(/\s+/g, "")
      ?.split(":") ?? ["id", "password"];
    const headerFoundAdmin = authData.find((admin: any) => {
      return admin.id === headersId && admin.password === headersPassword;
    });

    const queryAuthData =
      (url.parse(req.url, true).query["cedc-auth"] as string) ?? "";
    const [queryId, queryPassword] = queryAuthData
      ?.replace(/\s+/g, "")
      ?.split(":") ?? ["id", "password"];
    const queryFoundAdmin = authData.find((admin: any) => {
      return admin.id === queryId && admin.password === queryPassword;
    });

    if (headerFoundAdmin) {
      return;
    }
    if (useQueryOption && queryFoundAdmin) {
      return;
    }

    throw new AuthError("Unauthorized");
  };

  isAuthentic = (req: Request, useQueryOption?: boolean): boolean => {
    try {
      this.checkAuthentic(req, useQueryOption);
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
