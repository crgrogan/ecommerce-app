import express from "express";
import apicache from "apicache";

let cache = apicache.options({
  respectCacheControl: true, // allow cache to be overridden if necessary
}).middleware;

import Product from "../models/Product.js";
import { isAuth, isAdmin } from "../utils.js";

const router = express.Router();

// get all products
router.get("/", cache("5 minutes"), async (req, res, next) => {
  try {
    const products = await Product.find({});
    res.send(products);
  } catch (err) {
    next(err);
  }
});

// get products based on filters provided
router.get("/filter", cache("5 minutes"), async (req, res, next) => {
  try {
    const { q, category, colour, brand, sortby } = req.query;
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
    let products;
    if (q) {
      products = sortby
        ? await Product.find({ $text: { $search: q }, ...filters }).sort({
            price: sortby,
          })
        : await Product.find({ $text: { $search: q }, ...filters });
    } else {
      products = sortby
        ? await Product.find({ ...filters }).sort({ price: sortby })
        : await Product.find({ ...filters });
    }
    res.send(products);
  } catch (err) {
    next(err);
  }
});

// add new product
router.post("/", isAuth, isAdmin, async (req, res, next) => {
  const {
    img,
    category,
    name,
    brand,
    price,
    colour,
    description,
    countInStock,
  } = req.body;
  try {
    const product = new Product({
      name,
      img,
      category,
      brand,
      price,
      colour,
      description,
      countInStock,
    });
    const newProduct = await product.save();
    if (newProduct) {
      return res.status(201).send({
        msg: "Product created/updated successfully",
        data: newProduct,
      });
    }
    return res.status(400).send("Error creating/updating product");
  } catch (err) {
    next(err);
  }
});

// Get specific product
router.get("/:id", cache("5 minutes"), async (req, res, next) => {
  const id = req.params.id;
  try {
    const currentProduct = await Product.findById(id);
    if (currentProduct) {
      res.send(currentProduct);
    } else {
      res.status(404).send({ msg: "Product not found" });
    }
  } catch (err) {
    next(err);
  }
});

// Get product details for cart and update with quantity
router.post("/:id", async (req, res, next) => {
  const id = req.params.id;
  const { qty } = req.body;
  try {
    const currentProduct = await Product.findById(id);
    currentProduct.qty = qty;
    if (currentProduct) {
      res.send(currentProduct);
    } else {
      res.status(404).send({ msg: "Product not found" });
    }
  } catch (err) {
    next(err);
  }
});

// edit product
router.put("/:id", isAuth, isAdmin, async (req, res, next) => {
  const productId = req.params.id;
  const {
    img,
    category,
    name,
    brand,
    price,
    description,
    countInStock,
    colour,
  } = req.body;
  try {
    const product = await Product.findById(productId);
    if (product) {
      product.price = price;
      product.name = name;
      product.img = img;
      product.category = category;
      product.brand = brand;
      product.description = description;
      product.countInStock = countInStock;
      product.colour = colour;
    }

    const updatedProduct = await product.save();

    if (updatedProduct) {
      return res
        .status(200)
        .send({ msg: "Product edited successfully", data: product });
    }
    return res.status(400).send({ msg: "Error deleting product" });
  } catch (err) {
    next(err);
  }
});

// delete product
router.delete("/:id", isAuth, isAdmin, async (req, res, next) => {
  const productId = req.params.id;
  try {
    const productToDelete = await Product.findById(productId);

    if (productToDelete) {
      await productToDelete.remove();
      return res.send({ msg: "Product deleted successfully" });
    }

    return res.status(400).send({ msg: "Error deleting product" });
  } catch (err) {
    next(err);
  }
});

export default router;
