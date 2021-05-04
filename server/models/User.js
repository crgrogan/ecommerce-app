import { Schema, model } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  email: {
    type: String,
    required: [true, "Email address is required"],
    unique: [true, "Email address is already in use"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minLength: [4, "Password should be at least four characters"],
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false,
  },
});

export default model("User", userSchema);
