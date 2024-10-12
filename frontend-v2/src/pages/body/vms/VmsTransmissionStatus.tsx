import { vmsController } from "controller/index";
import { useEffect, useState } from "react";
import { VmsStatus } from "controller/vms";

function VmsTransmissionStatus() {
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
    <div className="d-flex justify-content-center mb-4">
      <div>
        {isVmsConnected ? (
          vmsStatus === VmsStatus.IDLE ? (
            <span
              style={{ fontSize: "100px" }}
              className="gf-highlight-text-color"
            >
              O
            </span>
          ) : (
            <span
              style={{ fontSize: "100px" }}
              className="gf-highlight-text-color"
            >
              X
            </span>
          )
        ) : (
          <p>연결 끊김</p>
        )}
      </div>
    </div>
  );
}

export default VmsTransmissionStatus;
