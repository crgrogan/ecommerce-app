import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import cors from "cors";
import nodemailer from "nodemailer";

import errorController from "./controllers/errorController.js";
import userRoutes from "./routes/users.js";
import productRoutes from "./routes/products.js";
import filterRoutes from "./routes/filters.js";
import orderRoutes from "./routes/orders.js";

dotenv.config();

const __dirname = path.resolve();

const mongodbUrl = process.env.MONGODB_URL;

// set up nodemailer
export const transporter = nodemailer.createTransport({
  host: "smtp.live.com",
  port: 587,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

// verify nodemailer connection configuration
transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Server is ready to take messages");
  }
});

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
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/filters", filterRoutes);
app.use("/api/orders", orderRoutes);

// serve static assets if in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "/client/dist/index.html"));
  });
}

// error handling middleware
app.use(errorController);

const PORT = process.env.PORT || 5000;

// connect to server
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
