import { AccidentContext } from "pages/body/Index";
import { useContext } from "react";
import { AccidentCode, AccidentStatus } from "module/accident";
import { SCALE } from "config/app-config";
import "asset/grafana.css";

function AccidentInfo({
  probabilityData,
  isAccidentOccured,
}: {
  probabilityData: number[];
  isAccidentOccured: boolean;
}) {
  const accident = useContext(AccidentContext);

  const probability: number = probabilityData[probabilityData.length - 1];

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

  if (!isAccidentOccured) {
    return (
      <div className="d-flex justify-content-center mb-4">
        <p>사고가 발생하지 않았습니다.</p>
      </div>
    );
  }

  return (
    <div className="d-flex justify-content-center mb-4">
      <div
        className={`p-4 ${bgColor}`}
        style={{
          width: "90%",
          borderRadius: "0.5rem",
          color: "white",
        }}
      >
        <p>사고 종류: {decodeAccidentCode(accident.code)}</p>
        <p>사고 위치: 터널 입구로 부터 {accident.location * SCALE}m 지점</p>
        <p>사고 상태: {decodeAccidentStatus(accident.status)}</p>
        <span>사고 확률: </span>
        {accident.probability ? (
          <div className="progress mt-2">
            <div
              className="progress-bar gf-bg-color-4"
              role="progressbar"
              style={{
                width: `${probability}%`,
              }}
              aria-valuenow={probability}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              {`${probability}%`}
            </div>
          </div>
        ) : (
          "정보 없음"
        )}
      </div>
    </div>
  );
}

export default AccidentInfo;
