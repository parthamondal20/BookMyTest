import { Router } from "express";
import { chatbot } from "../controllers/chatbot.controller.js";
const router = Router();
router.post("/ask", chatbot);
export default router;
