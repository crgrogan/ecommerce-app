import express from "express";

import Order from "../models/Order";
import { isAuth } from "../utils";

const router = express.Router();

// add new order
router.post("/", isAuth, async (req, res, next) => {
  const {
    cartItems,
    shippingAddress,
    paymentMethod,
    subtotal,
    shippingCost,
    totalPrice,
  } = req.body;
  try {
    if (cartItems.length === 0) {
      return res.status(400).send({ msg: "Cart is empty" });
    }
    const order = new Order({
      orderItems: cartItems,
      shippingAddress,
      paymentMethod,
      subtotal,
      shippingCost,
      totalPrice,
      user: req.user._id,
    });
    const newOrder = await order.save();
    if (newOrder) {
      return res.status(201).send({ msg: "New order created", data: newOrder });
    }
    return res.status(400).send("Error creating order");
  } catch (err) {
    next(err);
  }
});

export default router;
