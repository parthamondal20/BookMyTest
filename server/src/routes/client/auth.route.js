import {
  registerUser,
  loginUser,
  refreshAccessToken,
  logoutUser,
} from "../../controllers/client/auth.controller.js";
import { Router } from "express";
const router = Router();
router.post("/refresh", refreshAccessToken);
router.post("/login", loginUser);
router.post("/register", registerUser);
router.post("/logout", logoutUser);
export default router;
