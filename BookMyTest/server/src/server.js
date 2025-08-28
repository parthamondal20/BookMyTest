import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
dotenv.config({ path: "./.env" });
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(cookieParser());
import authRoutes from "./routes/auth.route.js";
import testRoutes from "./routes/test.route.js";
import cartRoutes from "./routes/cart.route.js";
import chatbotRoutes from "./routes/chatbot.route.js";
import userRoutes from "./routes/user.route.js";
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/test", testRoutes);
app.use("/api/v1/cart", cartRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/chatbot", chatbotRoutes);
import errorHandler from "./middlewares/errorHandler.js";
app.use(errorHandler);
export default app;
