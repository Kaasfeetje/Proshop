import express from "express";
import {
    authUser,
    deleteUser,
    getUserById,
    getUserProfile,
    getUsers,
    registerUser,
    updateUser,
    updateUserProfile,
} from "../controllers/userController.js";
import { admin, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, admin, getUsers);
router.post("/", registerUser);
router.post("/login", authUser);
router.get("/profile", protect, getUserProfile);
router.put("/profile", protect, updateUserProfile);

router.delete("/:id", protect, admin, deleteUser);
router.get("/:id", protect, admin, getUserById);
router.put("/:id", protect, admin, updateUser);

export default router;
