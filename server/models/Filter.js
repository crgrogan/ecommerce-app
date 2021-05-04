import { Schema, model } from "mongoose";

const filterSchema = new Schema({
  categories: [
    {
      img: { type: String, required: [true, "Category image URL is required"] },
      name: { type: String, required: [true, "Category name is required"] },
    },
  ],
  colours: { type: [String], required: true },
  brands: { type: [String], required: true },
});

export default model("Filter", filterSchema);
