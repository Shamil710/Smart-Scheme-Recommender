import express from "express";
import {
  saveUserScheme,
  getUserSavedSchemes,
  deleteUserSavedScheme,
  fetchAllSchemes,
  fetchSchemeById,
  getAllSchemesController,
} from "../controllers/schemeController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getAllSchemesController); // ✅ Explore

router.get("/all", fetchAllSchemes); // optional (admin/debug)
router.get("/saved", authMiddleware, getUserSavedSchemes);
router.get("/:id", fetchSchemeById);

router.post("/save", authMiddleware, saveUserScheme);
router.delete("/delete", authMiddleware, deleteUserSavedScheme);

export default router;
