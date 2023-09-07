import { Socket } from "socket.io";
import Server from "../index";

function SocketHandler(socket: Socket) {
  socket.on("connection", () => {
    Server.log.info("Client connected", socket.id);
  });

  socket.on("disconnect", () => {
    Server.log.info("Client disconnected", socket.id);
  });
}

export default SocketHandler;
