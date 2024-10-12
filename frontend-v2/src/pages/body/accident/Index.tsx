import AccidentControl from "pages/body/accident/AccidentControl";
import AccidentInfo from "pages/body/accident/AccidentInfo";
import GrafanaCard from "component/GrafanaCard";

function Accident() {
  return (
    <div>
      <GrafanaCard title="사고 정보" childrenJsx={<AccidentInfo />} />
      <GrafanaCard title="사고 관리" childrenJsx={<AccidentControl />} />
    </div>
  );
}

export default Accident;
