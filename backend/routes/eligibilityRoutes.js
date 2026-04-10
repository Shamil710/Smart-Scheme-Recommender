import { authMiddleware } from "../middleware/authMiddleware.js";
import {
  autoEligibility,
  checkUserEligibility,
} from "../controllers/eligibilityController.js";
import { validateEligibility } from "../validations/eligibilityValidation.js";
import express from "express";

const router = express.Router();

// Route to check user eligibility for schemes
router.get("/check", checkUserEligibility); // manual
router.get("/auto", authMiddleware, autoEligibility); // profile
export default router;
