import { Router } from "express";
import { getAllUserData } from "../../controllers/admin/user.controller.js";
const router = Router();
router.get("/all", getAllUserData);
export default router;
