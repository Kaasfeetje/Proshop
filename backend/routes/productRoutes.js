import express from "express";
import asyncHandler from "express-async-handler";

import Product from "../models/productModel.js";

const router = express.Router();

//@desc     Fetch all Products
//@route    GET /api/products
//@access   Public
router.get(
    "/",
    asyncHandler(async (req, res) => {
        const products = await Product.find({});
        res.status(200).send(products);
    })
);

//@desc     Fetch single product
//@route    GET /api/products/:id
//@access   Public
router.get(
    "/:id",
    asyncHandler(async (req, res) => {
        const product = await Product.findById(req.params.id);

        if (!product) {
            res.status(404);
            throw new Error("Product not found!");
        }

        res.status(200).send(product);
    })
);

export default router;