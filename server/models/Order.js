import { Schema, model } from "mongoose";
import { productSchema } from "./Product";

const orderSchema = new Schema({
  orderItems: [productSchema],
  shippingAddress: {
    name: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    county: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true },
  },
  paymentMethod: { type: String, required: true },
  subtotal: { type: Number, required: true },
  shippingCost: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

export default model("Order", orderSchema);
