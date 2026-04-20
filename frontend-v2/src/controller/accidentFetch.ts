import { LoginType } from "module/login";
import { apiUrl } from "config/app-config";
import { AccidentType } from "module/accident";

export class AccidentFetchController {
  get = async (authData: LoginType): Promise<AccidentType> => {
    try {
      const response = await fetch(`${apiUrl}/accident`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "cedc-auth": `${authData.adminId}:${authData.password}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to get accident");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      return {} as AccidentType;
    }
  };

  accidentIgnore = async (authData: LoginType): Promise<string> => {
    const response = await fetch(`${apiUrl}/accident/ignore`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "cedc-auth": `${authData.adminId}:${authData.password}`,
      },
    });
    if (!response.ok) {
      const responseData = await response.json();
      throw new Error(responseData.msg || "Failed to fetch accident");
    }

    return "Success to ignore accident";
  };
}
