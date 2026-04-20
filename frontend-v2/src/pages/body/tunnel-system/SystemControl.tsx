import { CedcAuthContext } from "App";
import { useContext } from "react";
import { adminFetchController } from "controller/index";
import { SetAlertDataContext } from "pages/body/Index";
import "asset/grafana.css";

function SystemControl() {
  const setAlertData = useContext(SetAlertDataContext);
  const authData = useContext(CedcAuthContext);

  return (
    <div className="btn-group m-2" role="group" aria-label="admin-control-cont">
      <button
        type="button"
        className="btn btn-premary gf-bs-btn"
        onClick={async () => {
          try {
            await adminFetchController.reset(authData);
            setAlertData({
              message: "시스템 초기화에 성공했습니다.",
              type: "SUCCESS",
            });
          } catch (error) {
            setAlertData({
              message: "시스템 초기화에 실패했습니다.",
              type: "ERROR",
            });
          }
        }}
      >
        시스템 초기화
      </button>
    </div>
  );
}

export default SystemControl;
