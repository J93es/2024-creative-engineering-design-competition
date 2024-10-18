import { useContext, useEffect, useState } from "react";
import { AccidentContext } from "pages/body/Index";
import { LinePath } from "@visx/shape";
import { curveMonotoneX } from "@visx/curve";
import { scaleLinear } from "@visx/scale";
import { AxisLeft, AxisBottom } from "@visx/axis";
import { Circle } from "@visx/shape";

function AccidentProbability() {
  const accident = useContext(AccidentContext);
  const [probabilityData, setProbabilityData] = useState<number[]>([]);
  const width = 500;
  const height = 250;
  const margin = { top: 20, right: 40, bottom: 40, left: 40 };

  const xScale = scaleLinear({
    domain: [0, probabilityData.length - 1],
    range: [margin.left, width - margin.right],
  });

  const yScale = scaleLinear({
    domain: [80, 100],
    range: [height - margin.bottom, margin.top],
  });

  useEffect(() => {
    if (accident.id) {
      setProbabilityData((prev) => {
        if (!accident.probability) {
          return prev;
        }

        if (prev.length > 5) {
          return [...prev.slice(1), accident.probability * 100];
        }
        return [...prev, accident.probability * 100];
      });
    } else {
      setProbabilityData([]);
    }
  }, [accident]);

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
          curve={curveMonotoneX} // 선을 부드럽게 그리기 위한 곡선 옵션
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
