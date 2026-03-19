import { io } from "socket.io-client";

const socket = io("http://localhost:3000", {
  autoConnect: true,
  reconnection: true,
  reconnectionAttempts: 10,
  reconnectionDelay: 1000,
});

socket.on("connect", () => {
  console.log("Socket.io connected to server (port 3000)");
});

socket.on("connect_error", (error) => {
  console.error("Socket.io connection error:", error);
});

export default socket;
