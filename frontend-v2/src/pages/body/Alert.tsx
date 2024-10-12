import { AlertType } from "module/alert";
import { useState, useEffect } from "react";
import "component/grafana.css";

function ShowAlert({ alertData }: { alertData: AlertType }) {
  const [show, setShow] = useState(false);
  const [alertKey, setAlertKey] = useState(0);

  // alertData가 변경될 때마다 show 상태를 true로 설정
  useEffect(() => {
    if (alertData.message !== "" && alertData.type !== "") {
      setShow(true);
      setAlertKey((prevKey) => prevKey + 1);
    }
  }, [alertData]);

  let alarmType = "";
  if (alertData.type === "SUCCESS") {
    alarmType = "success";
  }
  if (alertData.type === "ERROR") {
    alarmType = "warning";
  }

  return show ? (
    <div
      className={`alert alert-${alarmType} alert-dismissible`}
      role="alert"
      key={alertKey}
    >
      <span className="gf-highlight-text-color">{alertData.message}</span>
      <button
        type="button"
        className="btn-close"
        data-bs-dismiss="alert"
        aria-label="Close"
        onClick={() => setShow(false)}
      ></button>
    </div>
  ) : null;
}

export default ShowAlert;
