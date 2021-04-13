import express from "express";

import User from "../models/User";
import { getToken } from "../utils";

const router = express.Router();

// login user
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    // check if user exists in database
    const userFound = await User.findOne({ email, password });
    if (userFound) {
      res.send({
        _id: userFound.id,
        email: userFound.email,
        name: userFound.name,
        isAdmin: userFound.isAdmin,
        token: getToken(userFound),
      });
    } else {
      res.status(401).send({ msg: "Invalid email or password" });
    }
  } catch (err) {
    res.send({ msg: err.message });
  }
});

// register new user
router.post("/register", async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;
  try {
    // check if email already in use
    const emailInUse = await User.findOne({ email });
    const user = new User({
      name,
      email,
      password,
      isAdmin: false,
    });
    const newUser = await user.save();
    if (newUser) {
      res.send({
        _id: user.id,
        email: user.email,
        name: user.name,
        isAdmin: user.isAdmin,
        token: getToken(user),
      });
    } else {
      res.status(401).send({ msg: "Invalid credentials" });
    }
  } catch (err) {
    res.send({ msg: err.message });
  }
});

// create new administrator
router.get("/createadmin", async (req, res) => {
  try {
    const user = new User({
      name: "Conor",
      email: "conor@gmail.com",
      password: "123456",
      isAdmin: true,
    });

    const newUser = await user.save();
    res.send({ user: newUser });
  } catch (err) {
    res.send({ msg: err.message });
  }
});

export default router;
