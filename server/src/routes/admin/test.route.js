import { Router } from "express";
const router = Router();
import {
  getAllTests,
  getTestDetails,
  editTest,
  addTest,
  deleteTest,
} from "../../controllers/admin/test.controller.js";
router.get("/all", getAllTests);
router.get("/:id", getTestDetails);
router.put("/edit", editTest);
router.post("/add", addTest);
router.delete("/delete/:testId", deleteTest);
export default router;
