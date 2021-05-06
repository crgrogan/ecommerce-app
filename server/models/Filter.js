import { Schema, model } from "mongoose";

const filterSchema = new Schema({
  categories: [
    {
      img: { type: String },
      name: { type: String },
    },
  ],
  colours: [
    {
      name: { type: String },
    },
  ],
  brands: [
    {
      name: { type: String },
    },
  ],
});

export default model("Filter", filterSchema);
