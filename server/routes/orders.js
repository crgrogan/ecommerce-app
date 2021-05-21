import express from "express";
import apicache from "apicache";

let cache = apicache.middleware;

import Order from "../models/Order";
import Product from "../models/Product";
import { isAuth, isAdmin, verifyItem, lowStockEmail } from "../utils";

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
    // check to see if order items details match details in database
    for (let item of cartItems) {
      let priceMatch = await verifyItem(item);
      if (!priceMatch) {
        return res.status(400).send({ msg: "Error verifying cart item" });
      }
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
router.get("/:id", cache("30 seconds"), async (req, res, next) => {
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
      let lowStockItems = [];
      // reduce countInStock of order items
      for (let item of order.orderItems) {
        let product = await Product.findById(item._id);
        product.countInStock -= item.qty;
        await product.save();
        if (product.countInStock < 5) {
          lowStockItems.push(product);
        }
      }
      if (lowStockItems.length > 0) {
        lowStockEmail(lowStockItems);
      }
      // update order payment info
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

// return all orders for given user
router.get("/list/:id", isAuth, async (req, res, next) => {
  const userId = req.params.id;
  try {
    const orders = await Order.find({ user: userId });
    if (orders) {
      res.send(orders);
    } else {
      res.status(404).send({ msg: "No orders found for current user" });
    }
  } catch (err) {
    next(err);
  }
});

// get all orders
router.get("/", isAuth, isAdmin, async (req, res) => {
  try {
    const orders = await Order.find({});
    res.send(orders);
  } catch (err) {
    next(err);
  }
});

export default router;
