import { Router } from "express";
const router = Router();
import {
  addToCart,
  getUserCart,
  mergeCart,
  removeFromCart,
} from "../controllers/cart.controller.js";
router.post("/add-to-cart", addToCart);
router.get("/get-cart/:userId", getUserCart);
router.post("/remove-from-cart", removeFromCart);
router.post("/merge", mergeCart);
export default router;
