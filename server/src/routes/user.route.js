import { Router } from "express";
const router = Router();
import { getUserAddressess } from "../controllers/user.controller.js";
router.get("/address/:userId", getUserAddressess);
// router.put("/save-address");
export default router;
