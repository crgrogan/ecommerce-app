import express from "express";

import Filter from "../models/Filter";
import { isAuth, isAdmin } from "../utils";

const router = express.Router();

// get all filters
router.get("/", async (req, res, next) => {
  try {
    const filters = await Filter.find({});
    res.send(filters);
  } catch (err) {
    next(err);
  }
});

// update filters
router.post("/", async (req, res, next) => {
  const { colours, brands, categories } = req.body;
  try {
    const filters = await Filter.findOne().sort({ $natural: -1 }).limit(1); //for the latest record
    if (filters) {
      filters.colours = colours;
      filters.categories = categories;
      filters.brands = brands;
    }
    const newFilters = await filters.save();
    if (newFilters) {
      return res
        .status(201)
        .send({ msg: "New filters created", data: newFilters });
    }
    return res.status(400).send({ msg: "Error creating filters" });
  } catch (err) {
    next(err);
  }
});

export default router;
