import { vmsController } from "controller/index";
import { useContext, useEffect, useState } from "react";
import { VmsStatus } from "controller/vms";
import { AccidentContext } from "pages/body/Index";
import { SCALE } from "config/app-config";

function VmsInfo() {
  const accident = useContext(AccidentContext);
  const [isVmsConnected, setIsVmsConnected] = useState(false);
  const [vmsStatus, setVmsStatus] = useState<
    VmsStatus.IDLE | VmsStatus.CAR_CRASH
  >(VmsStatus.IDLE);

  useEffect(() => {
    const updateVmsStatus = () => {
      setVmsStatus(vmsController.getStatus());

      if (!vmsController.isConnected()) {
        setIsVmsConnected(false);
        return;
      }
      setIsVmsConnected(true);
    };

    updateVmsStatus();
    const intervalId = setInterval(updateVmsStatus, 200);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="card d-flex justify-content-center accident-info-cont mb-4">
      <div className="card-body">
        <h4 className="mb-4">VMS 정보</h4>
        <div>
          <p>VMS 연결 상태: {isVmsConnected ? "연결" : "연결 끊김"}</p>
          {isVmsConnected && vmsStatus !== VmsStatus.IDLE ? (
            <>
              <p>VMS 송출 메시지</p>
              <p>accident</p>
              <p>{accident.location * SCALE}</p>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default VmsInfo;
