import RailRobotControl from "pages/body/rail-robot/RailRobotControl";
import RailRobotLocation from "pages/body/rail-robot/RailRobotLocation";
import RailRobotInfo from "pages/body/rail-robot/RailRobotInfo";

function RailRobot() {
  return (
    <div className="card d-flex justify-content-center m-3">
      <div className="card-header h3">레일 로봇 관리</div>
      <div className="card-body">
        <RailRobotLocation />
        <RailRobotInfo />
        <RailRobotControl />
      </div>
    </div>
  );
}

export default RailRobot;
