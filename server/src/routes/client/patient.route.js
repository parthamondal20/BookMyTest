import { Router } from "express";
const router = Router();
import {
  getUserAddressess,
  saveUserAddress,
  getSavedpatientDetails,
} from "../../controllers/client/patient.controller.js";
router.get("/address/:userId", getUserAddressess);
router.put("/save-address", saveUserAddress);
router.get("/details/:user_id", getSavedpatientDetails);
export default router;
