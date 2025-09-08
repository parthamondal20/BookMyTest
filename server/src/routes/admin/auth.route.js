import { Router } from "express";
import {
  loginAdmin,
  logOutAdmin,
} from "../../controllers/admin/auth.controller.js";
const router = Router();

router.post("/login", loginAdmin);
router.post("/logout", logOutAdmin);

export default router;
