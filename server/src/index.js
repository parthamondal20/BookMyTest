import connectDB from "./config/db.js";
import app from "./app.js";
import { createServer } from "http";
import { Server } from "socket.io";

const port = process.env.PORT || 5000;

// Create HTTP server
const server = createServer(app);

//attach socket.io

const io = new Server(server, {
  cors: {
    origin: [process.env.CLIENT_URL, process.env.ADMIN_URL],
    credentials: true,
  },
});

// handle socket connection

io.on("connection", (socket) => {
  console.log("⚡ New client connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("❌ Client disconnected:", socket.id);
  });
});

export { io };

import initAdmin from "./utils/initAdmin.js";

connectDB()
  .then(async () => {
    await initAdmin();
    server.listen(port, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.error(`Failed to connect to the database: ${error.message}`);
    process.exit(1); // Exit the process with failure
  });
