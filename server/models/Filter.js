import mongoose from "mongoose";

const filterSchema = new mongoose.Schema({
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

export default mongoose.model("Filter", filterSchema);
