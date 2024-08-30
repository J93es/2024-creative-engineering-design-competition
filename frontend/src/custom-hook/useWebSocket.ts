import { wsUrl } from "config/app-config";

import { useState, useEffect, useRef } from "react";

import { AccidentType, accidentInit } from "module/accident";
import { RailRobotType } from "module/railRobot";

interface UseWebSocketReturn {
  accident: AccidentType;
  railRobots: RailRobotType[];
}

const sortRailRobotsById = (
  railRobots: RailRobotType[] | undefined
): RailRobotType[] => {
  if (!railRobots || railRobots.length === 0) {
    throw new Error(`RailRobot is not exist`);
  }

  railRobots.sort(function (a, b) {
    if ((a.id ?? 0) > (b.id ?? 0)) {
      return 1;
    }
    if ((a.id ?? 0) < (b.id ?? 0)) {
      return -1;
    }
    // a must be equal to b
    return 0;
  });

  return railRobots;
};

const useWebSocket = (): UseWebSocketReturn => {
  const [data, setData] = useState<UseWebSocketReturn>({
    accident: accidentInit,
    railRobots: [],
  });
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    // WebSocket 연결 생성
    const socket = new WebSocket(wsUrl);
    wsRef.current = socket;

    // WebSocket 이벤트 처리
    wsRef.current.onopen = () => {
      console.log("WebSocket 연결이 열렸습니다.");
    };

    wsRef.current.onmessage = (event: MessageEvent) => {
      console.log("메시지 수신:", event.data);

      const parsing = () => {
        try {
          return JSON.parse(event.data);
        } catch (e) {
          return null;
        }
      };

      const resData = parsing();
      if (!resData) {
        console.error("WebSocket 데이터 파싱에 실패했습니다.");
        return;
      }

      const accident: AccidentType = (resData.accident as AccidentType) ?? {};
      const railRobots = sortRailRobotsById(
        Object.keys(resData.railRobots ?? {}).map(
          (key) => resData.railRobots[key]
        )
      );
      setData({ accident: accident, railRobots: railRobots });
    };

    wsRef.current.onclose = () => {
      console.log("WebSocket 연결이 닫혔습니다.");
    };

    wsRef.current.onerror = (error) => {
      console.error("WebSocket 오류:", error);
    };

    // 컴포넌트가 언마운트될 때 WebSocket 연결 닫기
    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, []);

  return data;
};

export default useWebSocket;
