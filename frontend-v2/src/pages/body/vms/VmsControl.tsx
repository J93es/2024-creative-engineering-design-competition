import { AccidentContext } from "pages/body/Index";
import { useContext } from "react";
import { vmsController } from "controller/index";
import { SetAlertDataContext } from "pages/body/Index";
import { SCALE, serialDelay } from "config/app-config";

import "component/grafana.css";

function VmsControl() {
  const setAlertData = useContext(SetAlertDataContext);
  const accidentData = useContext(AccidentContext);

  return (
    <>
      <div
        className="btn-group m-2"
        role="group"
        aria-label="vms-connection-cont"
      >
        <button
          type="button"
          className="btn btn-primary gf-bs-btn"
          onClick={async () => {
            try {
              await vmsController.connect();
              setAlertData({
                message: "VMS 연결에 성공했습니다.",
                type: "SUCCESS",
              });
            } catch (error) {
              setAlertData({
                message: "VMS 연결에 실패했습니다.",
                type: "ERROR",
              });
            }
          }}
        >
          VMS 연결
        </button>
        <button
          type="button"
          className="btn btn-primary gf-bs-btn"
          onClick={async () => {
            try {
              await vmsController.disconnect();
              setAlertData({
                message: "VMS 연결 해제에 성공했습니다.",
                type: "SUCCESS",
              });
            } catch (error) {
              setAlertData({
                message: "VMS 연결 해제에 실패했습니다.",
                type: "ERROR",
              });
            }
          }}
        >
          VMS 연결 해제
        </button>
      </div>
      <div
        className="btn-group m-2"
        role="group"
        aria-label="vms-connection-cont"
      >
        {" "}
        <button
          type="button"
          className="btn btn-primary gf-bs-btn"
          onClick={async () => {
            try {
              await vmsController.idle();
              setAlertData({
                message: "정상상태 전송에 성공했습니다.",
                type: "SUCCESS",
              });
            } catch (error) {
              setAlertData({
                message: "정상상태 전송에 실패했습니다.",
                type: "ERROR",
              });
            }
          }}
        >
          정상상태 수동 전송
        </button>
        <button
          type="button"
          className="btn btn-primary gf-bs-btn"
          onClick={async () => {
            try {
              await vmsController.accident();
              setTimeout(() => {
                vmsController.location(accidentData.location * SCALE);
              }, serialDelay);
              setAlertData({
                message: "사고상태 전송에 성공했습니다.",
                type: "SUCCESS",
              });
            } catch (error) {
              setAlertData({
                message: "사고상태 전송에 실패했습니다.",
                type: "ERROR",
              });
            }
          }}
        >
          사고상태 수동 전송
        </button>
      </div>
    </>
  );
}

export default VmsControl;
