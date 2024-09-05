import { MAX_LOCATION, SCALE } from "config/app-config";
import React from "react";
import { RailRobotsContext } from "pages/body/Index";

function RailRobotLocation() {
  const railRobots = React.useContext(RailRobotsContext);
  const maxPx = 400;
  const positionTextShowCnt = 10;
  const railRobotPositions: number[] = railRobots.map((railRobot) => {
    return (railRobot.currentLocation * maxPx) / MAX_LOCATION;
  });

  const lineStyle: React.CSSProperties = {
    width: `${maxPx}px`,
    height: "4px",
    backgroundColor: "black",
    position: "relative",
    margin: "20px 0",
  };

  const getPositionStyle = (position: number): React.CSSProperties => ({
    position: "absolute",
    left: `${position - 8}px`,
    top: "-6px",
    width: "16px",
    height: "16px",
    backgroundColor: "gray",
    borderRadius: "50%",
  });

  const linePositionTextStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "space-between",
    color: "black",
    width: `${maxPx}px`,
  };

  return (
    <div className="card d-inline-flex justify-content-center cur-robot-location-cont mb-4">
      <div className="card-body">
        <h4 className="mb-4">레일 로봇 위치(m)</h4>
        <div style={lineStyle}>
          {railRobotPositions.map((pos, index) => (
            <div key={index} style={getPositionStyle(pos)} />
          ))}
        </div>
        <div style={linePositionTextStyle}>
          {[...Array(positionTextShowCnt + 1)].map((_, index) => (
            <span className="fs-6" key={index}>
              {Math.floor((MAX_LOCATION * SCALE * index) / positionTextShowCnt)}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default RailRobotLocation;
