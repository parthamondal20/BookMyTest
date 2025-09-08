import { Router } from "express";
import { getAllOrders } from "../../controllers/admin/order.controller.js";
const router = Router();
router.get("/all", getAllOrders);
export default router;
