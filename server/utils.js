import jwt from "jsonwebtoken";
const nodemailer = require("nodemailer");

import { transporter } from "./server";
import Product, { productSchema } from "./models/Product";

export const getToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
      name: user.name,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_SECRET,
    { expiresIn: "48h" }
  );
};

// check if user is logged in
export const isAuth = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    // remove bearer from token
    const onlyToken = token.split(" ")[1];
    jwt.verify(onlyToken, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        res.status(401).send({ msg: "Token is not valid" });
      }
      req.user = decode;
      next();
      return;
    });
  } else {
    return res.status(401).send({ msg: "Token not supplied" });
  }
};

// check if user is an administrator
export const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    return next();
  }
  return res.status(401).send({ msg: "Admin token required" });
};

// check details of item in order request body vs details in database
export const verifyItem = async (cartItem) => {
  const item = await Product.findById(cartItem._id);
  if (item) {
    if (item.price === cartItem.price) {
      return true;
    } else {
      return false;
    }
  }
  return false;
};

// send email to admin if countInStock for item
// is less than 5
export const lowStockEmail = async (items) => {
  // create email details/body
  const createMail = (product) => {
    return {
      from: "<ECOM Stock Management System>", // sender address
      to: process.env.EMAIL, // receiver email
      subject: "Low Stock Warning",
      text: `The following item is running low in stock: 
    ID: ${product._id}, 
    Name: ${product.name}, 
    Brand: ${product.brand},  
    Colour: ${product.colour},  
    Number of Item in Stock: ${product.countInStock}`,
    };
  };

  // loop through low stock items and send email for each item
  for (let item of items) {
    try {
      await transporter.sendMail(createMail(item));
    } catch (err) {
      console.log(err);
    }
  }
};
