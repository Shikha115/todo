import asyncHandler from "express-async-handler";
import { genSaltSync, hashSync, compareSync } from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user";

//register user
const register = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  const duplicate = await User.findOne({ username });
  if (duplicate) {
    return res
      .status(400)
      .json({ status: "failure", message: "User already exists" });
  }
  const salt = genSaltSync(10);
  const hashPassword = hashSync(password, salt);
  const user = new User({ username, password: hashPassword });
  await user.save();
  res
    .status(201)
    .json({ status: "success", message: "User created", data: user });
});

//login user
const login = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) {
    return res
      .status(400)
      .json({ status: "failure", message: "User doesn't exists" });
  }
  const isMatch = compareSync(password, user.password);
  if (!isMatch) {
    return res
      .status(400)
      .json({ status: "failure", message: "Invalid password" });
  }
  //user exist and password is correct, create a jwt token
  const token = jwt.sign(req.body, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  res.status(200).json({ status: "success", message: "User logged in", token });
});

export default { register, login };
