import { Schema, model } from "mongoose";

const categorySchema = new Schema({
  img: { type: String, required: true },
  name: { type: String, required: true },
});

export default model("Category", categorySchema);
