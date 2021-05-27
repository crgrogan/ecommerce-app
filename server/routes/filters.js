import express from "express";
import apicache from "apicache";

let cache = apicache.options({
  respectCacheControl: true, // allow cache to be overridden if necessary
}).middleware;

import Filter from "../models/Filter.js";
import { isAuth, isAdmin } from "../utils.js";

const router = express.Router();

// get all filters
router.get("/", cache("5 minutes"), async (req, res, next) => {
  try {
    const filters = await Filter.find({});
    res.send(filters);
  } catch (err) {
    next(err);
  }
});

// update filters
router.post("/", isAuth, isAdmin, async (req, res, next) => {
  const { colour, brand, category } = req.body;
  try {
    const filters = await Filter.findOne().sort({ $natural: -1 }).limit(1); // for the latest record
    if (filters) {
      if (colour.name) {
        // capitalize first letter of each word in field name
        colour.name = colour.name.replace(/\b\w/g, (l) => l.toUpperCase());
        filters.colours.push(colour);
      }
      if (category.name && category.img) {
        // capitalize first letter of each word in field name
        category.name = category.name.replace(/\b\w/g, (l) => l.toUpperCase());
        filters.categories.push(category);
      }
      if (brand.name) {
        // capitalize first letter of each word in field name
        brand.name = brand.name.replace(/\b\w/g, (l) => l.toUpperCase());
        filters.brands.push(brand);
      }
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

// delete filter
router.put("/:id", isAuth, isAdmin, async (req, res, next) => {
  const filterId = req.params.id;
  const { category } = req.body;
  try {
    const filterDeleted = await Filter.updateOne(
      {},
      { $pull: { [category]: { _id: filterId } } }
    );

    if (filterDeleted) {
      return res.send({ msg: "Filter deleted successfully" });
    }
    return res.status(400).send({ msg: "Error deleting filter" });
  } catch (err) {
    next(err);
  }
});

export default router;
