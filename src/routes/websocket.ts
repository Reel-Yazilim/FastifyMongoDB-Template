import { Socket } from "socket.io";
import { server } from "../lib/server";

function SocketHandler(socket: Socket) {
  socket.on("connection", () => {
    server.log.info("Client connected", socket.id);
  });

  socket.on("disconnect", () => {
    server.log.info("Client disconnected", socket.id);
  });
}

export default SocketHandler;
