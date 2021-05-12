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

// get order details for an existing order
router.get("/:id", async (req, res, next) => {
  const id = req.params.id;
  try {
    const order = await Order.findById(id);
    if (order) {
      res.send(order);
    } else {
      res.status(404).send({ msg: "Order not found" });
    }
  } catch (err) {
    next(err);
  }
});

// update isPaid status after an order has been paid
router.put("/:id", async (req, res, next) => {
  const id = req.params.id;
  const { update_time, status, email_address } = req.body;
  try {
    const order = await Order.findById(id);
    if (order) {
      order.isPaid = true;
      order.paymentDetails = {
        userId: id,
        status,
        email: email_address,
        paidAt: update_time,
      };
      const updatedOrder = await order.save();
      res.send(updatedOrder);
    } else {
      res.status(404).send({ msg: "Order not found" });
    }
  } catch (err) {
    next(err);
  }
});

export default router;
