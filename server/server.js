import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
const cors = require("cors");

import userRoutes from "./routes/users";
import productRoutes from "./routes/products";
import categoryRoutes from "./routes/categories";

dotenv.config();

const mongodbUrl = process.env.MONGODB_URL;

// connect to database
mongoose
  .connect(mongodbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to database"));

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// routes
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);

const PORT = process.env.PORT || 5000;

// connect to server
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
