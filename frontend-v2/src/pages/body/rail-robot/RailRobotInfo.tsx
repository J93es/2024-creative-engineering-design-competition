import { RailRobotsContext } from "pages/body/Index";
import { useContext } from "react";
import { RailRobotCommand } from "module/railRobot";
import { SCALE } from "config/app-config";

function RailRobotInfo() {
  const railRobots = useContext(RailRobotsContext);

  const railRobotCommandDecoder = (command: string) => {
    switch (command) {
      case RailRobotCommand.PATROL:
        return "순찰";
      case RailRobotCommand.ALARMING:
        return "알람";
      case RailRobotCommand.CHARGE:
        return "충전";
      case RailRobotCommand.MOVE_TO_TARGET_LOCATION:
        return "이동";
      case RailRobotCommand.STOP:
        return "정지";
      default:
        return "알 수 없음";
    }
  };

  return (
    <div className="d-flex justify-content-center  accident-info-cont mb-4">
      <div className="card-body">
        <table className="table">
          <thead>
            <tr>
              <th className="gf-text-color gf-bg-color-3 gf-border-color-4">
                ID
              </th>
              <th className="gf-text-color gf-bg-color-3 gf-border-color-4">
                명령
              </th>
              <th className="gf-text-color gf-bg-color-3 gf-border-color-4">
                현재 위치
              </th>
              <th className="gf-text-color gf-bg-color-3 gf-border-color-4">
                순찰 지점
              </th>
              <th className="gf-text-color gf-bg-color-3 gf-border-color-4">
                이동할 위치
              </th>
            </tr>
          </thead>
          <tbody>
            {railRobots.map((railRobot) => (
              <tr key={railRobot.id}>
                <td className="gf-text-color gf-bg-color-3 gf-border-color-4">
                  {railRobot.id}
                </td>
                <td className="gf-text-color gf-bg-color-3 gf-border-color-4">
                  {railRobotCommandDecoder(railRobot.command)}
                </td>
                <td className="gf-text-color gf-bg-color-3 gf-border-color-4">
                  {railRobot.currentLocation * SCALE}m
                </td>
                <td className="gf-text-color gf-bg-color-3 gf-border-color-4">
                  {(railRobot.patrolStartLocation ?? 0) * SCALE}m ~{" "}
                  {(railRobot.patrolEndLocation ?? 0) * SCALE}m
                </td>
                <td className="gf-text-color gf-bg-color-3 gf-border-color-4">
                  {(railRobot.targetLocation ?? 0) * SCALE}m
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default RailRobotInfo;
