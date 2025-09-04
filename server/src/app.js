import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
dotenv.config({ path: "./.env" });
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const allowedOrigins = [process.env.CLIENT_URL, process.env.ADMIN_URL];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like mobile apps, curl, Postman)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(cookieParser());

// ================= CLIENT ROUTES =================

import authRoutes from "./routes/client/auth.route.js";
import testRoutes from "./routes/client/test.route.js";
import cartRoutes from "./routes/client/cart.route.js";
import chatbotRoutes from "./routes/client/patient.route.js";
import patientRoutes from "./routes/client/chatbot.route.js";

app.use("/api/v1/client/auth", authRoutes);
app.use("/api/v1/client/test", testRoutes);
app.use("/api/v1/client/cart", cartRoutes);
app.use("/api/v1/client/patient", patientRoutes);
app.use("/api/v1/client/chatbot", chatbotRoutes);

// ================= ADMIN ROUTES =================

import adminTestRoutes from "./routes/admin/test.route.js";
app.use("/api/v1/admin/test", adminTestRoutes);

import errorHandler from "./middlewares/errorHandler.js";
app.use(errorHandler);
export default app;
