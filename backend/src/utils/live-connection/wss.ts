import { WebSocketServer, WebSocket } from "ws";
import { RailRobotType } from "@model/railRobot";
import { accidentService, railRobotService } from "@service/index";

// WebSocket 서버 설정
const wss = new WebSocketServer({ noServer: true });

// WebSocket 클라이언트 목록
const clients: WebSocket[] = [];

export class Wss {
  connection() {
    try {
      // WebSocket 연결 처리
      wss.on("connection", (ws: WebSocket) => {
        clients.push(ws);
        console.log("New WebSocket connection established.");

        ws.on("close", () => {
          // 연결이 종료되면 클라이언트 목록에서 제거
          const index = clients.indexOf(ws);
          if (index !== -1) {
            clients.splice(index, 1);
          }
          console.log("WebSocket connection closed.");
        });
      });
    } catch (error) {
      console.error(error);
    }
  }

  subscribe(request: any, socket: any, head: any) {
    try {
      // 요청 URL에 따라 WebSocket 연결을 처리
      const pathname = new URL(request.url!, `http://${request.headers.host}`)
        .pathname;

      if (pathname === "/ws-subscribe") {
        wss.handleUpgrade(request, socket, head, (ws) => {
          wss.emit("connection", ws, request);
        });
      } else {
        socket.destroy();
      }
    } catch (error) {
      console.error(error);
    }
  }

  async broadcast() {
    try {
      const [accident, railRobotList] = await Promise.all([
        accidentService.get(),
        railRobotService.getAllRobot(),
      ]);

      const railRobots: { [key: string]: RailRobotType } = {};
      railRobotList.forEach((railRobot) => {
        railRobots[railRobot.id] = railRobot;
      });

      const broadcastData = JSON.stringify({
        accident: accident,
        railRobots: railRobots,
      });

      // 클라이언트 목록에 데이터를 전송
      clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(broadcastData);
        }
      });

      console.log("Broadcasted data to all clients.");
    } catch (error) {
      console.error(error);
    }
  }
}
