import { Router } from "express";
const router = Router();
import { getAllTests, getTestDetails } from "../../controllers/client/test.controller.js";
router.get("/all", getAllTests);
router.get("/:id", getTestDetails);
export default router;
