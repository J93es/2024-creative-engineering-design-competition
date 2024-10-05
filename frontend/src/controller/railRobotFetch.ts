import { LoginType } from "module/login";
import { apiUrl } from "config/app-config";

export class RailRobotFetchController {
  patrolStart = async (authData: LoginType): Promise<string> => {
    const response = await fetch(`${apiUrl}/rail-robot/start-patrol`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "cedc-auth": `${authData.adminId}:${authData.password}`,
      },
    });
    if (!response.ok) {
      const responseData = await response.json();
      throw new Error(responseData.msg || "Failed to start patrol");
    }
    return "Success to start patrol";
  };

  moveToTargeLocation = async (
    authData: LoginType,
    targetLocation: number
  ): Promise<string> => {
    const response = await fetch(
      `${apiUrl}/rail-robot/move-to-target-location`,
      {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "cedc-auth": `${authData.adminId}:${authData.password}`,
        },
        body: JSON.stringify({ targetLocation }),
      }
    );
    if (!response.ok) {
      const responseData = await response.json();
      throw new Error(responseData.msg || "Failed to move to target location");
    }
    return "Success to move to target location";
  };
}
