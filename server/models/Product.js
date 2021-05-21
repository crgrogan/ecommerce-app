import { Schema, model } from "mongoose";

export const productSchema = new Schema({
  img: { type: String, required: [true, "Image URL is required"] },
  category: { type: String, required: [true, "Item category is required"] },
  name: { type: String, required: [true, "Item name is required"] },
  brand: { type: String, required: [true, "Item brand is required"] },
  colour: { type: String, required: [true, "Item colour is required"] },
  price: { type: Number, required: [true, "Item price is required"] },
  description: {
    type: String,
    required: [true, "Item description is required"],
  },
  countInStock: {
    type: Number,
    default: 0,
    required: [true, "Number of item in stock is required"],
  },
  qty: { type: Number },
});

// capitalize strings before saving to database
productSchema.pre("save", function (next) {
  this.name = this.name.replace(/\b\w/g, (l) => l.toUpperCase());
  this.category = this.category.replace(/\b\w/g, (l) => l.toUpperCase());
  this.brand = this.brand.replace(/\b\w/g, (l) => l.toUpperCase());
  this.colour = this.colour.replace(/\b\w/g, (l) => l.toUpperCase());
  next();
});

export default model("Product", productSchema);
