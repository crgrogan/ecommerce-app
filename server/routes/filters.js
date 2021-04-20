import express from "express";

import Filter from "../models/Filter";
import { isAuth, isAdmin } from "../utils";

const router = express.Router();

// get all filters
router.get("/", async (req, res) => {
  const filters = await Filter.find({});
  res.send(filters);
});

// update filters
// add isAuth, isAdmin,
router.post("/", async (req, res) => {
  const { colours, brands, categories } = req.body;
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
  return res.status(500).send({ msg: "Error creating filters" });
});

export default router;
