import { createContext, useState, useContext } from "react";
import { AccidentType, accidentInit } from "module/accident";
import { AlertType } from "module/alert";
import { RailRobotType } from "module/railRobot";

import useWebSocket from "custom-hook/useWebSocket";

import Alert from "pages/body/Alert";
import Accident from "pages/body/accident/Index";
import TunnelSystem from "pages/body/tunnel-system/Index";
import RailRobot from "pages/body/rail-robot/Index";
import Vms from "pages/body/vms/Index";

import { CedcAuthContext } from "App";

export const SetAlertDataContext = createContext<
  React.Dispatch<React.SetStateAction<AlertType>>
>(() => {});

export const AccidentContext: React.Context<AccidentType> =
  createContext<AccidentType>(accidentInit);
export const RailRobotsContext: React.Context<RailRobotType[]> = createContext<
  RailRobotType[]
>([]);

function Body() {
  const cedcAuth = useContext(CedcAuthContext);
  const { accident, railRobots } = useWebSocket(cedcAuth);

  const [alertData, setAlertData] = useState<AlertType>({
    message: "",
    type: "info",
  });

  return (
    <SetAlertDataContext.Provider value={setAlertData}>
      <AccidentContext.Provider value={accident}>
        <RailRobotsContext.Provider value={railRobots}>
          <Alert alertData={alertData} />
          <div className="d-flex justify-content-center">
            <div className="row" style={{ width: "100%" }}>
              <div className="col" style={{ minWidth: "500px" }}>
                <Accident />
              </div>
              <div className="col">
                <RailRobot />
              </div>
              <div className="col" style={{ minWidth: "500px" }}>
                <Vms />
                <TunnelSystem />
              </div>
            </div>
          </div>
        </RailRobotsContext.Provider>
      </AccidentContext.Provider>
    </SetAlertDataContext.Provider>
  );
}

export default Body;
