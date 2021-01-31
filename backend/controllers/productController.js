import asyncHandler from "express-async-handler";

import Product from "../models/productModel.js";
import Order from "../models/orderModel.js";

//@desc     Fetch all Products
//@route    GET /api/products
//@access   Public
export const getProducts = asyncHandler(async (req, res) => {
    const pageSize = 10;
    const page = Number(req.query.pageNumber) || 1;

    const keyword = req.query.keyword
        ? {
              name: {
                  $regex: req.query.keyword,
                  $options: "i",
              },
          }
        : {};

    const count = await Product.countDocuments({ ...keyword });

    const products = await Product.find({ ...keyword })
        .limit(pageSize)
        .skip(pageSize * (page - 1));
    res.status(200).send({
        products,
        page,
        pages: Math.ceil(count / pageSize),
    });
});

//@desc     Fetch single product
//@route    GET /api/products/:id
//@access   Public
export const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
        res.status(404);
        throw new Error("Product not found!");
    }

    product.requestCount += 1;
    await product.save();

    res.status(200).send(product);
});

//@desc     Delete product
//@route    DELETE /api/products/:id
//@access   Private/Admin
export const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
        await product.remove();
        res.json({ message: "Product removed" });
    } else {
        res.status(404);
        throw new Error("Product not found");
    }
});

//@desc     Create product
//@route    POST /api/products
//@access   Private/Admin
export const createProduct = asyncHandler(async (req, res) => {
    const product = new Product({
        name: "Sample Name",
        price: 0,
        user: req.user._id,
        image: "/images/sample.jpg",
        brand: "Sample Brand",
        category: "Sample category",
        countInStock: 0,
        numReviews: 0,
        description: "Sample Description",
    });

    const createdProduct = await product.save();

    res.status(201).json(createdProduct);
});

//@desc     Update product
//@route    PUT /api/products/:id
//@access   Private/Admin
export const updateProduct = asyncHandler(async (req, res) => {
    const {
        name,
        price,
        description,
        image,
        brand,
        category,
        countInStock,
    } = req.body;
    const product = await Product.findById(req.params.id);

    if (product) {
        product.name = name;
        product.price = price;
        product.description = description;
        product.image = image;
        product.brand = brand;
        product.category = category;
        product.countInStock = countInStock;

        const updatedProduct = await product.save();
        res.status(200).json(updatedProduct);
    } else {
        res.status(404);
        throw new Error("Product not found");
    }
});

//@desc     Create New Review
//@route    POST /api/products/:id/reviews
//@access   Private
export const createProductReview = asyncHandler(async (req, res) => {
    const { rating, comment } = req.body;
    const product = await Product.findById(req.params.id);

    const order = await Order.findOne({
        user: req.user._id,
        "orderItems.product": product._id,
    });

    if (!order || !order.isPaid) {
        res.status(400);
        throw new Error(
            "You must have purchased the product before you can leave a review"
        );
    }

    if (product) {
        const alreadyReviewed = product.reviews.find(
            (r) => r.user.toString() === req.user._id.toString()
        );

        if (alreadyReviewed) {
            res.status(400);
            throw new Error("Product already reviewed");
        }

        const review = {
            name: req.user.name,
            rating: Number(rating),
            comment,
            user: req.user._id,
        };

        product.reviews.push(review);
        product.numReviews = product.reviews.length;
        product.rating =
            product.reviews.reduce((acc, item) => item.rating + acc, 0) /
            product.reviews.length;

        await product.save();
        res.status(201).json({ message: "Review added" });
    } else {
        res.status(404);
        throw new Error("Product not found");
    }
});

//@desc     Get Top Products
//@route    GET /api/products/top
//@access   Public
export const getTopProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({}).sort({ rating: -1 }).limit(3);

    res.json(products);
});

//@desc     Get Analytics
//@route    GET /api/products/analytics
//@access   Private/Admin
export const getAnalytics = asyncHandler(async (req, res) => {
    const products = await Product.find({}).select("requestCount name");

    const updatedProducts = await Promise.all(
        products.map(async (product) => {
            const orderCount = await Order.countDocuments({
                "orderItems.product": product._id,
            });
            return {
                _id: product._id,
                name: product.name,
                visitCount: product.requestCount,
                orderCount: orderCount,
            };
        })
    );

    res.json(updatedProducts);
});
