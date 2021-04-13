import express from "express";

import Category from "../models/Category";
import { isAuth, isAdmin } from "../utils";

const router = express.Router();

// get all categories
router.get("/", async (req, res) => {
  const categories = await Category.find({});
  res.send(categories);
});

// add new category
router.post("/", isAuth, isAdmin, async (req, res) => {
  const { name, img } = req.body;
  const category = new Category({
    name,
    img,
  });
  const newCategory = await category.save();
  if (newCategory) {
    return res
      .status(201)
      .send({ msg: "New category created", data: newCategory });
  }
  return res.status(500).send({ msg: "Error creating category" });
});

export default router;
