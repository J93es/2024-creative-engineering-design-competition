import { apiUrl } from "config/app-config";
import { LoginType } from "module/login";

export class AuthController {
  isAuthenticated = async (data: LoginType): Promise<boolean> => {
    try {
      const response = await fetch(`${apiUrl}/admin`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "cedc-auth": `${data.adminId}:${data.password}`,
        },
      });

      if (response.status !== 200) {
        return false;
      }

      const resData = await response.json();

      if (!resData?.accident || !resData?.railRobots) {
        return false;
      }

      return true;
    } catch (error) {
      console.error("Failed to check auth", error);
      return false;
    }
  };
}
