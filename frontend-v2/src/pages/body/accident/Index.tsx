import { useEffect, useState, useContext, useRef } from "react";
import AccidentControl from "pages/body/accident/AccidentControl";
import AccidentInfo from "pages/body/accident/AccidentInfo";
import AccidentProbability from "pages/body/accident/AccidentProbability";
import GrafanaCard from "component/GrafanaCard";
import { AccidentContext } from "pages/body/Index";
import { AccidentType } from "module/accident";

function Accident() {
  const accident = useContext(AccidentContext);
  const [probabilityData, setProbabilityData] = useState<number[]>([]);
  const [isAccidentOccured, setIsAccidentOccured] = useState<boolean>(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const propabilityShowLength = 20;

  const getIsAccidentOccured = (accident: AccidentType) => {
    return accident.id ? true : false;
  };

  useEffect(() => {
    setIsAccidentOccured(getIsAccidentOccured(accident));
  }, [accident]);

  useEffect(() => {
    if (getIsAccidentOccured(accident)) {
      setProbabilityData((prev) => {
        if (accident.probability === undefined) {
          return prev;
        }
        const accidentProbability: number = parseFloat(
          (100 * accident.probability).toFixed(2)
        );

        if (prev.length > propabilityShowLength) {
          return [...prev.slice(1), accidentProbability];
        }
        return [...prev, accidentProbability];
      });
    } else {
      setProbabilityData([]);
    }
  }, [accident]);

  useEffect(() => {
    const func = () => {
      if (getIsAccidentOccured(accident)) {
        setProbabilityData((prev) => {
          const newProbability: number = parseFloat(
            (94 + Math.random() * 6).toFixed(2)
          );

          if (prev.length > propabilityShowLength) {
            return [...prev.slice(1), newProbability];
          }
          return [...prev, newProbability];
        });
      } else {
        setProbabilityData([]);
      }

      timerRef.current = setTimeout(func, Math.random() * 1250 + 250);
    };

    timerRef.current = setTimeout(func, 500);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [accident]);

  return (
    <div>
      <GrafanaCard
        title="사고 정보"
        childrenJsx={
          <AccidentInfo
            probabilityData={probabilityData}
            isAccidentOccured={isAccidentOccured}
          />
        }
      />
      <GrafanaCard
        title="사고 확률"
        childrenJsx={
          <AccidentProbability
            probabilityData={probabilityData}
            isAccidentOccured={isAccidentOccured}
          />
        }
      />
      <GrafanaCard title="사고 관리" childrenJsx={<AccidentControl />} />
    </div>
  );
}

export default Accident;
