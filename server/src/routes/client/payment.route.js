import { Router } from "express";
import { createRazorpayOrder } from "../../controllers/client/payment.controller.js";
const router = Router();
router.post("/create-order", createRazorpayOrder);
export default router;
