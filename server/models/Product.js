import { Schema, model } from "mongoose";

const productSchema = new Schema({
  img: { type: String, required: true },
  category: { type: String, required: true },
  name: { type: String, required: true },
  brand: { type: String, required: true },
  price: { type: Number, required: true },
  rating: { type: Number, default: 0, required: true },
  description: { type: String, required: true },
  numReviews: { type: Number, default: 0, required: true },
  countInStock: { type: Number, default: 0, required: true },
  qty: { type: Number },
});

export default model("Product", productSchema);
