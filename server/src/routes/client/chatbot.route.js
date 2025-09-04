import { Router } from "express";
import { chatbot } from "../../controllers/client/chatbot.controller.js";
const router = Router();
router.post("/ask", chatbot);
export default router;
