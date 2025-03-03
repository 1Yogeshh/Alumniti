// src/socket.js
import { io } from "socket.io-client";

// Retrieve the token from localStorage (or however you store it)
// Ensure you have the token from login before connecting.
const token = localStorage.getItem("token");

const socket = io("http://localhost:5000", {
  auth: { token },
  withCredentials: true,
});

export default socket;
