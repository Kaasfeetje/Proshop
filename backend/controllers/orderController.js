import asyncHandler from "express-async-handler";

import Order from "../models/orderModel.js";
import User from "../models/userModel.js";

//@desc     Create new Order
//@route    POST /api/orders
//@access   Private
export const addOrderItems = asyncHandler(async (req, res) => {
    const {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
    } = req.body;

    if (orderItems && orderItems.length === 0) {
        res.status(400);
        throw new Error("No order items");
    }

    const order = new Order({
        orderItems,
        user: req.user._id,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
    });

    const createdOrder = await order.save();

    res.status(201).json(createdOrder);
});

//@desc     Get order by id
//@route    GET /api/orders/:id
//@access   Private
export const getOrderById = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate(
        "user",
        "name email"
    );

    if (order) {
        res.json(order);
    } else {
        res.status(404);
        throw new Error("Order not found");
    }
});

//@desc     Update order to paid
//@route    PUT /api/orders/:id/pay
//@access   Private
export const updateOrderToPaid = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);

    if (order) {
        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.payer.email_address,
        };

        const updatedOrder = await order.save();
        res.json(updatedOrder);
    } else {
        res.status(404);
        throw new Error("Order not found");
    }
});

//@desc     Get logged in user orders
//@route    GET /api/orders/myorders
//@access   Private
export const getMyOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id });

    res.json(orders);
});

//@desc     Get All Orders
//@route    GET /api/orders
//@access   Private/Admin
export const getOrders = asyncHandler(async (req, res) => {
    const pageSize = 5;
    const page = Number(req.query.pageNumber) || 1;

    let user;
    if (req.query.keyword) {
        user = await User.findOne({
            name: { $regex: req.query.keyword, $options: "i" },
        });
    }

    let keyword;
    if (!user) {
        keyword = {};
    } else {
        keyword = { user: user._id };
    }

    const count = await Order.countDocuments({ ...keyword });

    const orders = await Order.find({ ...keyword })
        .populate("user", "id name")
        .limit(pageSize)
        .skip(pageSize * (page - 1));

    res.status(200).send({
        orders,
        page,
        pages: Math.ceil(count / pageSize),
    });
});

//@desc     Update order to delivered
//@route    PUT /api/orders/:id/delivered
//@access   Private/Admin
export const updateOrderToDelivered = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);

    if (order) {
        order.isDelivered = true;
        order.deliveredAt = Date.now();

        const updatedOrder = await order.save();
        res.json(updatedOrder);
    } else {
        res.status(404);
        throw new Error("Order not found");
    }
});
