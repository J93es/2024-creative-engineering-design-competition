import { createContext, useState } from "react";
import { AccidentType, accidentInit } from "module/accident";
import { RailRobotType } from "module/railRobot";

import Alert from "pages/body/Alert";

import useWebSocket from "custom-hook/useWebSocket";

import Accident from "pages/body/accident/Index";
import RailRobot from "pages/body/rail-robot/Index";
import AdminControl from "pages/body/admin/AdminControl";
import Vms from "pages/body/vms/Index";
import { AlertType } from "module/alert";

import "pages/body/Index.css";

export const SetAlertDataContext = createContext<
  React.Dispatch<React.SetStateAction<AlertType>>
>(() => {});

export const AccidentContext: React.Context<AccidentType> =
  createContext<AccidentType>(accidentInit);
export const RailRobotsContext: React.Context<RailRobotType[]> = createContext<
  RailRobotType[]
>([]);

function Body() {
  const { accident, railRobots } = useWebSocket();

  const [alertData, setAlertData] = useState<AlertType>({
    message: "",
    type: "info",
  });

  return (
    <SetAlertDataContext.Provider value={setAlertData}>
      <AccidentContext.Provider value={accident}>
        <RailRobotsContext.Provider value={railRobots}>
          <Alert alertData={alertData} />
          <div className="body-wrapper p-5">
            <div className="body-row">
              <RailRobot />
            </div>
            <div className="body-row">
              <Vms />
              <Accident />
              <AdminControl />
            </div>
          </div>
        </RailRobotsContext.Provider>
      </AccidentContext.Provider>
    </SetAlertDataContext.Provider>
  );
}

export default Body;
