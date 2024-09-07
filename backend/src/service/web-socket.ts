import { Request } from "express";
import { WebSocketServer, WebSocket } from "ws";
import { RailRobotType } from "@model/rail-robot";
import { accidentService, railRobotService } from "@service/index";
import { authService } from "@service/index";
import { customLogger } from "@utils/index";

// WebSocket 서버 설정
const webSoketServer = new WebSocketServer({ noServer: true });

// WebSocket 클라이언트 목록
const clients: WebSocket[] = [];

export class WebSocketServ {
  getBroadcastData = async () => {
    const [accident, railRobotList] = await Promise.all([
      accidentService.get(),
      railRobotService.getAllRobot(),
    ]);

    const railRobots: { [key: string]: RailRobotType } = {};
    railRobotList.forEach((railRobot) => {
      railRobots[railRobot.id] = railRobot;
    });

    return JSON.stringify({
      accident: accident || {},
      railRobots: railRobots || {},
    });
  };

  connection = () => {
    try {
      // WebSocket 연결 처리
      webSoketServer.on("connection", async (ws: WebSocket, req: Request) => {
        if (!authService.isAuthentic(req, true)) {
          ws.send("Unauthorized");
          ws.close();
          customLogger.log("WebSocket", "unauthorized request", req);
          return;
        }

        clients.push(ws);
        customLogger.log(
          "WebSocket",
          `connection established - ${clients.length} clients.`,
          req
        );

        ws.on("close", () => {
          // 연결이 종료되면 클라이언트 목록에서 제거
          const index = clients.indexOf(ws);
          ws.close();
          if (index !== -1) {
            clients.splice(index, 1);
          }
          customLogger.log(
            "WebSocket",
            `disconnected - ${clients.length} clients.`,
            req
          );
        });

        const broadcastData = await this.getBroadcastData();
        ws.send(broadcastData);
      });
    } catch (error) {
      console.error(error);
    }
  };

  subscribe = (request: any, socket: any, head: any) => {
    try {
      // 요청 URL에 따라 WebSocket 연결을 처리
      const pathname = new URL(request.url!, `http://${request.headers.host}`)
        .pathname;

      if (pathname !== "/ws-subscribe") {
        socket.end();
        return;
      }

      webSoketServer.handleUpgrade(request, socket, head, (ws) => {
        webSoketServer.emit("connection", ws, request);
      });
    } catch (error) {
      console.error(error);
    }
  };

  broadcast = async () => {
    try {
      if (clients.length === 0) {
        return;
      }

      const broadcastData = await this.getBroadcastData();

      // 클라이언트 목록에 데이터를 전송
      clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(broadcastData);
        }
      });

      customLogger.log(
        "WebSocket",
        `broadcasted data to ${clients.length} clients.`
      );
    } catch (error) {
      console.error(error);
    }
  };
}
