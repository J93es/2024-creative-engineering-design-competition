import { AccidentContext } from "pages/body/Index";
import { useContext } from "react";
import { AccidentCode, AccidentStatus } from "module/accident";
import { SCALE } from "config/app-config";
import "component/grafana.css";

function AccidentInfo() {
  const accident = useContext(AccidentContext);

  const isAccidentOccured = accident.id ? true : false;

  const decodeAccidentCode = (code: string) => {
    switch (code) {
      case AccidentCode.CAR_CRASH:
        return "차량 충돌";
      case AccidentCode.FIRE:
        return "화재";
      case AccidentCode.FLOOD:
        return "홍수";
      default:
        return "알 수 없음";
    }
  };

  const decodeAccidentStatus = (status: string) => {
    switch (status) {
      case AccidentStatus.DETECTED:
        return "사고 발생";
      case AccidentStatus.IGNORED:
        return "사고 아님";
      case AccidentStatus.ALARMING:
        return "알람 중";
      case AccidentStatus.END:
        return "사고 종료";
      default:
        return "알 수 없음";
    }
  };

  let bgColor = "";
  if (accident.status === AccidentStatus.DETECTED) {
    bgColor = "gf-highlight-bg-color";
  }
  if (accident.status === AccidentStatus.ALARMING) {
    bgColor = "gf-danger-bg-color";
  }

  return (
    <div className={`d-flex justify-content-center mb-4`}>
      {isAccidentOccured ? (
        <div
          className={`p-4 ${bgColor}`}
          style={{
            width: "90%",
            borderRadius: "0.5rem",
            // paddingTop: "1rem",
            color: "white",
          }}
        >
          <p>사고 종류: {decodeAccidentCode(accident.code)}</p>
          <p>사고 위치: 터널 입구로 부터 {accident.location * SCALE}m 지점</p>
          <p>사고 상태: {decodeAccidentStatus(accident.status)}</p>
          <p>
            사고 확률:{" "}
            {accident.probability ? (
              <div className="progress mt-2">
                <div
                  className="progress-bar gf-bg-color-4"
                  role="progressbar"
                  style={{ width: `${accident.probability}%` }}
                  aria-valuenow={accident.probability}
                  aria-valuemin={0}
                  aria-valuemax={100}
                >
                  {`${accident.probability}%`}
                </div>
              </div>
            ) : (
              "정보 없음"
            )}
          </p>
        </div>
      ) : (
        <p>발생한 사고가 없습니다.</p>
      )}
    </div>
  );
}

export default AccidentInfo;
