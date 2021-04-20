import { Schema, model } from "mongoose";

const filterSchema = new Schema({
  categories: [
    {
      img: { type: String, required: true },
      name: { type: String, required: true },
    },
  ],
  colours: { type: [String], required: true },
  brands: { type: [String], required: true },
});

export default model("Filter", filterSchema);
