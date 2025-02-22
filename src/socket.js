import { io } from "socket.io-client";

const SOCKET_URL = "http://localhost:5000"; // Change this when deploying

const socket = io(SOCKET_URL, {
  withCredentials: true,
  transports: ["websocket"],
});

socket.on("connect", () => {
  console.log("Connected to Socket.IO server:", socket.id);
});

export default socket;
