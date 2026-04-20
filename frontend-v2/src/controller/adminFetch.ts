import { LoginType } from "module/login";
import { apiUrl } from "config/app-config";

export class AdminFetchController {
  reset = async (authData: LoginType): Promise<string> => {
    const response = await fetch(`${apiUrl}/admin/reset`, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "cedc-auth": `${authData.adminId}:${authData.password}`,
      },
    });
    if (!response.ok) {
      const responseData = await response.json();
      throw new Error(responseData.msg || "Failed to reset");
    }
    return "Success to reset";
  };
}
