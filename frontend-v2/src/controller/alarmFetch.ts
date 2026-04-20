import { LoginType } from "module/login";
import { apiUrl } from "config/app-config";

export class AlarmFetchController {
  alarmStart = async (authData: LoginType): Promise<string> => {
    const response = await fetch(`${apiUrl}/alarm/start`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "cedc-auth": `${authData.adminId}:${authData.password}`,
      },
    });
    if (!response.ok) {
      const responseData = await response.json();
      throw new Error(responseData.msg || "Failed to start alarm");
    }
    return "Success to start alarm";
  };

  alarmEnd = async (authData: LoginType): Promise<string> => {
    const response = await fetch(`${apiUrl}/alarm/end`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "cedc-auth": `${authData.adminId}:${authData.password}`,
      },
    });
    if (!response.ok) {
      const responseData = await response.json();
      throw new Error(responseData.msg || "Failed to stop alarm");
    }
    return "Success to stop alarm";
  };
}
