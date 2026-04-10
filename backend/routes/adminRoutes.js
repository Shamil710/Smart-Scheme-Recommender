import express from "express";
import { addSchemeController,getAllSchemesController,updateSchemeController,deleteSchemeController,getSchemeByIdController} from "../controllers/adminController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { isAdmin } from "../middleware/adminMiddleware.js";

const router = express.Router();
console.log("ADMIN ROUTES LOADED"); 
router.post("/add-scheme", authMiddleware, isAdmin, addSchemeController);
router.get("/schemes", authMiddleware, isAdmin, getAllSchemesController);
router.get("/scheme/:id", authMiddleware, isAdmin, getSchemeByIdController);
router.patch("/update-scheme/:id", authMiddleware, isAdmin, updateSchemeController);
router.delete("/delete-scheme/:id", authMiddleware, isAdmin, deleteSchemeController);


export default router;