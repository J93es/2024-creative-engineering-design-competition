import { CedcAuthContext } from "App";
import { useContext } from "react";
import {
  alarmFetchController,
  accidentFetchController,
  vmsController,
} from "controller/index";
import { SetAlertDataContext } from "pages/body/Index";
import { SCALE, serialDelay } from "config/app-config";

function AccidentControl() {
  const setAlertData = useContext(SetAlertDataContext);
  const authData = useContext(CedcAuthContext);

  return (
    <div className="btn-group" role="group" aria-label="alarm-control-cont">
      <button
        type="button"
        className="btn btn-outline-secondary"
        onClick={async () => {
          try {
            await alarmFetchController.alarmStart(authData);
          } catch (error) {
            setAlertData({
              message: "알람 시작에 실패했습니다.",
              type: "ERROR",
            });

            return;
          }
          try {
            const [, accidentData] = await Promise.all([
              vmsController.accident(),
              accidentFetchController.get(authData),
            ]);
            setTimeout(() => {
              vmsController.location(accidentData.location * SCALE);
            }, serialDelay);
            setAlertData({
              message: "알람 시작에 성공했습니다.",
              type: "SUCCESS",
            });
          } catch (error) {
            setAlertData({
              message: "알람 시작에 실패했습니다.",
              type: "ERROR",
            });
          }
        }}
      >
        알람 시작
      </button>
      <button
        type="button"
        className="btn btn-outline-secondary"
        onClick={async () => {
          try {
            await accidentFetchController.accidentIgnore(authData);
            setAlertData({
              message: "사고 무시에 성공했습니다.",
              type: "SUCCESS",
            });
          } catch (error) {
            setAlertData({
              message: "사고 무시에 실패했습니다.",
              type: "ERROR",
            });
          }
        }}
      >
        사고 무시
      </button>
      <button
        type="button"
        className="btn btn-outline-secondary"
        onClick={async () => {
          try {
            await alarmFetchController.alarmEnd(authData);
            await vmsController.idle();
            setAlertData({
              message: "알람 종료에 성공했습니다.",
              type: "SUCCESS",
            });
          } catch (error) {
            setAlertData({
              message: "알람 종료에 실패했습니다.",
              type: "ERROR",
            });
          }
        }}
      >
        알람 종료
      </button>
    </div>
  );
}

export default AccidentControl;
