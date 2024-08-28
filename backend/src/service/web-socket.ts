import { Request, Response, NextFunction } from "express";
import { WebSocketServer, WebSocket } from "ws";
import { RailRobotType } from "@model/railRobot";
import { accidentService, railRobotService } from "@service/index";
import { authService } from "@service/index";
import { getIP } from "@tools/getIp";

// WebSocket 서버 설정
const webSoketServer = new WebSocketServer({ noServer: true });

// WebSocket 클라이언트 목록
const clients: WebSocket[] = [];

export class WebSocketServ {
  connection() {
    try {
      // WebSocket 연결 처리
      webSoketServer.on("connection", (ws: WebSocket, req: Request) => {
        if (!authService.isAuthentic(req)) {
          ws.send("Unauthorized");
          ws.close();
          console.log(
            `${getIP(
              req
            )} - - [${new Date()}] "New WebSocket connection established. But unauthorized" - "${
              req.headers["user-agent"]
            }"`
          );
          return;
        }

        clients.push(ws);
        console.log(
          `${getIP(
            req
          )} - - [${new Date()}] "New WebSocket connection established." - "${
            req.headers["user-agent"]
          }"`
        );

        ws.on("close", () => {
          // 연결이 종료되면 클라이언트 목록에서 제거
          const index = clients.indexOf(ws);
          ws.close();
          if (index !== -1) {
            clients.splice(index, 1);
          }
          console.log(
            `${getIP(
              req
            )} - - [${new Date()}] "WebSocket connection closed." - "${
              req.headers["user-agent"]
            }"`
          );
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
  }

  async broadcast() {
    try {
      if (clients.length === 0) {
        return;
      }

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

      console.log(`Broadcasted data to ${clients.length} clients.`);
    } catch (error) {
      console.error(error);
    }
  }
}
