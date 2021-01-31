import express from "express";

import {
    getProductById,
    getProducts,
    deleteProduct,
    updateProduct,
    createProduct,
    createProductReview,
    getTopProducts,
    getAnalytics,
} from "../controllers/productController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getProducts);
router.post("/", protect, admin, createProduct);

router.get("/top", getTopProducts);
router.get("/analytics", protect, admin, getAnalytics);

router.get("/:id", getProductById);
router.delete("/:id", protect, admin, deleteProduct);
router.put("/:id", protect, admin, updateProduct);

router.post("/:id/reviews", protect, createProductReview);

export default router;
