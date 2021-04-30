import express from "express";

import User from "../models/User";
import { getToken } from "../utils";

const router = express.Router();

// login user
router.post("/login", async (req, res, next) => {
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
    next(err);
  }
});

// register new user
router.post("/register", async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    // check if email already in use
    const emailInUse = await User.findOne({ email });
    if (emailInUse) {
      return res.status(409).send({ msg: "Email already in use" });
    }
    const user = new User({
      name,
      email,
      password,
      isAdmin: false,
    });
    const newUser = await user.save();
    if (newUser) {
      res.status(201).send({
        _id: user.id,
        email: user.email,
        name: user.name,
        isAdmin: user.isAdmin,
        token: getToken(user),
      });
    } else {
      res.status(400).send({ msg: "Error creating new user" });
    }
  } catch (err) {
    next(err);
  }
});

// create new administrator
router.get("/createadmin", async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    const user = new User({
      name,
      email,
      password,
      isAdmin: true,
    });
    const newUser = await user.save();
    if (newUser) {
      res.status(201).send({ user: newUser });
    } else {
      res.status(400).send({ msg: "Error creating new administrator" });
    }
  } catch (err) {
    next(err);
  }
});

export default router;
