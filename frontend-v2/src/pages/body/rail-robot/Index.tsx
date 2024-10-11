import RailRobotControl from "pages/body/rail-robot/RailRobotControl";
import RailRobotLocation from "pages/body/rail-robot/RailRobotLocation";
import RailRobotInfo from "pages/body/rail-robot/RailRobotInfo";
import GrafanaCard from "component/GrafanaCard";

function RailRobot() {
  return (
    <div>
      <GrafanaCard
        title="레일 로봇 위치(m)"
        childrenJsx={<RailRobotLocation />}
      />
      <GrafanaCard title="레일 로봇 정보" childrenJsx={<RailRobotInfo />} />
      <GrafanaCard title="레일 로봇 관리" childrenJsx={<RailRobotControl />} />
    </div>
  );
}

export default RailRobot;
