import { useContext, useEffect, useRef } from "react";
import { AccidentContext } from "pages/body/Index";
import { LinePath } from "@visx/shape";
import { scaleLinear } from "@visx/scale";
import { AxisLeft, AxisBottom } from "@visx/axis";
import { Circle } from "@visx/shape";

function AccidentProbability({
  probabilityData,
  setProbabilityData,
}: {
  probabilityData: number[];
  setProbabilityData: React.Dispatch<React.SetStateAction<number[]>>;
}) {
  const accident = useContext(AccidentContext);
  const width = 500;
  const height = 250;
  const margin = { top: 20, right: 40, bottom: 40, left: 40 };
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const xScale = scaleLinear({
    domain: [0, probabilityData.length - 1],
    range: [margin.left, width - margin.right],
  });

  const yScale = scaleLinear({
    domain: [80, 100],
    range: [height - margin.bottom, margin.top],
  });

  const propabilityShowLength = 20;

  useEffect(() => {
    const func = () => {
      if (accident.id) {
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

    func();

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        setProbabilityData([]);
      }
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (accident.id) {
      setProbabilityData((prev) => {
        const accidentProbability: number = parseFloat(
          (100 * (accident?.probability || 0.9)).toFixed(2)
        );
        if (prev.length > propabilityShowLength) {
          return [...prev.slice(1), accidentProbability];
        }
        return [...prev, accidentProbability];
      });
    } else {
      setProbabilityData([]);
    }
  }, [accident, setProbabilityData]);

  if (!accident.id) {
    return (
      <div className="d-flex justify-content-center mb-4">
        <p>사고가 발생하지 않았습니다.</p>
      </div>
    );
  }

  return (
    <div className="d-flex justify-content-center mb-4">
      <svg width={width} height={height}>
        <AxisBottom
          top={height - margin.bottom}
          scale={xScale}
          numTicks={probabilityData.length}
          stroke="#a0a0a0" // x축 선의 색상
          tickStroke="#a0a0a0" // x축 눈금 선의 색상
          tickLabelProps={() => ({
            fill: "#a0a0a0", // 눈금 레이블의 색상
            fontSize: 11,
            textAnchor: "middle",
          })}
        />
        {/* y축 */}
        <AxisLeft
          left={margin.left}
          scale={yScale}
          stroke="#a0a0a0" // y축 선의 색상
          tickStroke="#a0a0a0" // y축 눈금 선의 색상
          tickLabelProps={() => ({
            fill: "#a0a0a0", // 눈금 레이블의 색상
            fontSize: 11,
            textAnchor: "end",
          })}
        />

        {/* LinePath: 데이터를 연결하는 선 */}
        <LinePath
          data={probabilityData}
          x={(d, i) => xScale(i)} // x 위치는 데이터 인덱스에 따라 결정
          y={(d) => yScale(d)} // y 위치는 데이터 값에 따라 결정
          stroke="#f97316"
          strokeWidth={2}
        />

        {/* 각 데이터 포인트를 점으로 표시 */}
        {probabilityData.map((d, i) => (
          <Circle
            key={`point-${i}`}
            cx={xScale(i)} // x 위치
            cy={yScale(d)} // y 위치
            r={3} // 점의 반지름
            fill="#a0a0a0" // 점의 색상
          />
        ))}
      </svg>
    </div>
  );
}

export default AccidentProbability;
