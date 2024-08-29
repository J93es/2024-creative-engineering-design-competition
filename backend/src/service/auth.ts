import { authData } from "@config/index";
import { Request, Response, NextFunction } from "express";
import { AuthType } from "@model/interface/auth";
import { AuthService } from "@core/service/auth";
import { AuthError } from "@model/interface/error";
import url from "url";

export class AuthServ implements AuthService {
  checkAuthentic = (req: Request, useQueryOption: boolean = false): void => {
    if (useQueryOption) {
      const queryAuthData = url.parse(req.url, true).query["cedc-auth"];
      if (!queryAuthData || typeof queryAuthData !== "string") {
        throw new AuthError("Unauthorized: id, password is needed");
      }

      const [queryId, queryPassword] = queryAuthData
        ?.replace(/\s+/g, "")
        ?.split(":");
      if (!queryId && !queryPassword) {
        throw new AuthError("Unauthorized: id, password is needed");
      }
      if (!queryId) {
        throw new AuthError("Unauthorized: id is needed");
      }
      if (!queryPassword) {
        throw new AuthError("Unauthorized: password is needed");
      }

      const queryFoundAdmin = authData.find((admin: any) => {
        return admin.id === queryId && admin.password === queryPassword;
      });

      if (queryFoundAdmin) {
        return;
      }
    }

    const headersAuthData = req.headers["cedc-auth"];
    if (!headersAuthData || typeof headersAuthData !== "string") {
      throw new AuthError("Unauthorized: Auth data not found");
    }

    const [headersId, headersPassword] = headersAuthData
      ?.replace(/\s+/g, "")
      ?.split(":");

    if (!headersId && !headersPassword) {
      throw new AuthError("Unauthorized: id, password is needed");
    }
    if (!headersId) {
      throw new AuthError("Unauthorized: id is needed");
    }
    if (!headersPassword) {
      throw new AuthError("Unauthorized: password is needed");
    }

    const headerFoundAdmin = authData.find((admin: any) => {
      return admin.id === headersId && admin.password === headersPassword;
    });

    if (headerFoundAdmin) {
      return;
    }

    throw new AuthError("Unauthorized: id, password is invalid");
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
