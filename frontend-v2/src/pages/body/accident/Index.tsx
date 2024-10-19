import { useState } from "react";
import AccidentControl from "pages/body/accident/AccidentControl";
import AccidentInfo from "pages/body/accident/AccidentInfo";
import AccidentProbability from "pages/body/accident/AccidentProbability";
import GrafanaCard from "component/GrafanaCard";

function Accident() {
  const [probabilityData, setProbabilityData] = useState<number[]>([]);
  return (
    <div>
      <GrafanaCard
        title="사고 정보"
        childrenJsx={<AccidentInfo probabilityData={probabilityData} />}
      />
      <GrafanaCard
        title="사고 확률"
        childrenJsx={
          <AccidentProbability
            probabilityData={probabilityData}
            setProbabilityData={setProbabilityData}
          />
        }
      />
      <GrafanaCard title="사고 관리" childrenJsx={<AccidentControl />} />
    </div>
  );
}

export default Accident;
