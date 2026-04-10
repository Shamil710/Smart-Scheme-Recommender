import express from "express";
const router = express.Router();

import { registerUser , loginUser , currentProfile , logoutUser , updateProfile} from "../controllers/authController.js";
import { validateProfileUpdate } from "../validations/profileValidations.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

router.post("/register", registerUser);
router.post("/logout", authMiddleware, logoutUser);
router.post("/login", loginUser);
router.get("/profile",authMiddleware,currentProfile);


router.put(
  "/profile",
  authMiddleware,
  validateProfileUpdate,
  updateProfile
);



export default router;