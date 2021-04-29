import express from "express";

import Product from "../models/Product";
import { isAuth, isAdmin } from "../utils";

const router = express.Router();

// get all products
router.get("/", async (req, res) => {
  const products = await Product.find({});
  res.send(products);
});

// get products based on filters provided
router.get("/filter", async (req, res) => {
  const { category, colour, brand, sortby } = req.query;
  let filters = {
    category,
    colour,
    brand,
  };
  for (let key in filters) {
    let value = filters[key];
    // delete property if empty string or undefined
    if (!value) {
      delete filters[key];
    } else {
      // capitalize words in remaining values in filters
      filters[key] = value.replace(/\b\w/g, (l) => l.toUpperCase());
    }
  }
  const products = sortby
    ? await Product.find({ ...filters }).sort({ price: sortby })
    : await Product.find({ ...filters });
  res.send(products);
});

// add new product
router.post("/", async (req, res) => {
  const {
    img,
    category,
    name,
    brand,
    price,
    description,
    rating,
    countInStock,
    numReviews,
  } = req.body;
  const product = new Product({
    name,
    img,
    category,
    brand,
    price,
    description,
    rating,
    countInStock,
    numReviews,
  });
  const newProduct = await product.save();
  if (newProduct) {
    return res
      .status(201)
      .send({ msg: "New product created", data: newProduct });
  }
  return res.status(500).send({ msg: "Error creating product" });
});

// Get specific product
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const currentProduct = await Product.findById(id);
    if (currentProduct) {
      res.send(currentProduct);
      return;
    } else {
      res.status(404).send({ msg: "Product not found" });
      return;
    }
  } catch (err) {
    console.log(err);
    res.send({ msg: err.message });
  }
});

// Get product details for cart and update with quantity
router.post("/:id", async (req, res) => {
  const id = req.params.id;
  const { qty } = req.body;
  const currentProduct = await Product.findById(id);
  currentProduct.qty = qty;
  if (currentProduct) {
    res.send(currentProduct);
  } else {
    res.status(404).send({ msg: "Product not found" });
  }
});

// edit product
router.put("/:id", isAuth, isAdmin, async (req, res) => {
  const productId = req.params.id;
  const {
    img,
    category,
    name,
    brand,
    price,
    description,
    rating,
    countInStock,
    numReviews,
  } = req.body;
  const product = await Product.findById(productId);

  if (product) {
    product.price = price;
    product.name = name;
    product.img = img;
    product.category = category;
    product.brand = brand;
    product.description = description;
    product.countInStock = countInStock;
  }

  const updatedProduct = await product.save();

  if (updatedProduct) {
    return res
      .status(200)
      .send({ msg: "Product edited successfully", data: product });
  }

  return res.status(500).send({ msg: "Error editing product" });
});

// delete product
router.delete("/:id", isAuth, isAdmin, async (req, res) => {
  const productId = req.params.id;

  const productToDelete = await Product.findById(productId);

  if (productToDelete) {
    await productToDelete.remove();
    return res.send({ msg: "Product deleted successfully" });
  }

  return res.send({ msg: "Error deleting product" });
});

export default router;
