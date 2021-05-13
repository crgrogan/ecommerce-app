import express from "express";

import User from "../models/User";
import { getToken, isAuth } from "../utils";

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
router.post("/createadmin", async (req, res, next) => {
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

// update existing user's details
router.put("/profile/details", isAuth, async (req, res) => {
  const user = await User.findById(req.user._id);
  try {
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      const updatedUser = await user.save();
      res.send({
        msg: "User updated successfully",
        field: "details",
        user: {
          _id: updatedUser._id,
          name: updatedUser.name,
          email: updatedUser.email,
          isAdmin: updatedUser.isAdmin,
          token: getToken(updatedUser),
        },
      });
    } else {
      res.status(404).send({ msg: "User not found", field: "details" });
    }
  } catch (err) {
    next(err);
  }
});

// update existing user's password
router.put("/profile/password", isAuth, async (req, res) => {
  const user = await User.findById(req.user._id);
  try {
    if (user) {
      user.password = req.body.password;
      const updatedUser = await user.save();
      res.send({
        msg: "Password updated successfully",
        field: "password",
        user: {
          _id: updatedUser._id,
          name: updatedUser.name,
          email: updatedUser.email,
          isAdmin: updatedUser.isAdmin,
          token: getToken(updatedUser),
        },
      });
    } else {
      res.status(404).send({ msg: "User not found", field: "password" });
    }
  } catch (err) {
    next(err);
  }
});

export default router;
