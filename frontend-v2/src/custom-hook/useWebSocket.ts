import { wsUrl } from "config/app-config";

import { useState, useEffect, useRef } from "react";

import { AccidentType, accidentInit } from "module/accident";
import { RailRobotType } from "module/railRobot";
import { LoginType } from "module/login";

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

    return 0;
  });

  return railRobots;
};

const useWebSocket = (cedcAuth: LoginType): UseWebSocketReturn => {
  const [data, setData] = useState<UseWebSocketReturn>({
    accident: accidentInit,
    railRobots: [],
  });
  const wsRef = useRef<WebSocket | null>(null);
  const heartbeatTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (wsRef.current) {
      wsRef.current.close();
    }
    if (!cedcAuth.adminId || !cedcAuth.password) {
      console.error("WebSocket 인증 정보가 없습니다.");
      return;
    }

    const connect = () => {
      const socket = new WebSocket(
        `${wsUrl}?cedc-auth=${cedcAuth.adminId}:${cedcAuth.password}`
      );
      wsRef.current = socket;

      // WebSocket 이벤트 처리
      wsRef.current.onopen = () => {
        if (!wsRef.current) {
          return;
        }
        wsRef.current.send("ping");

        heartbeatTimerRef.current = setInterval(() => {
          if (!wsRef.current) {
            return;
          }
          if (
            wsRef.current.readyState === WebSocket.CLOSED ||
            wsRef.current.readyState === WebSocket.CLOSING
          ) {
            if (heartbeatTimerRef.current) {
              clearInterval(heartbeatTimerRef.current);
            }
            return;
          }
          wsRef.current.send("ping");
        }, 30000);
        console.log("WebSocket 연결이 열렸습니다.");
      };

      wsRef.current.onmessage = (event: MessageEvent) => {
        console.log("메시지 수신:", event.data);

        if (event.data === "pong") {
          return;
        }

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
        setData((prev) => {
          return {
            accident:
              JSON.stringify(prev.accident) === JSON.stringify(accident)
                ? prev.accident
                : accident,
            railRobots:
              JSON.stringify(prev.railRobots) === JSON.stringify(railRobots)
                ? prev.railRobots
                : railRobots,
          };
        });
      };

      wsRef.current.onclose = () => {
        if (heartbeatTimerRef.current) {
          clearInterval(heartbeatTimerRef.current);
        }
        console.log("WebSocket 연결이 닫혔습니다. 다시 연결합니다.");
        setTimeout(function () {
          connect();
        }, 3000);
      };

      wsRef.current.onerror = (error) => {
        if (heartbeatTimerRef.current) {
          clearInterval(heartbeatTimerRef.current);
        }
        console.error("WebSocket 오류:", error);
      };
    };

    connect();

    // 컴포넌트가 언마운트될 때 WebSocket 연결 닫기
    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [cedcAuth]);

  return data;
};

export default useWebSocket;
