import { Router } from "express";
import { createOrder } from "../../controllers/client/order.controller.js";
const router = Router();
router.post("/save-order", createOrder);
export default router;
