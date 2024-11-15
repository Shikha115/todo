const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserSchema } = require("../config/types");
const User = require("../models/user");

//register user
const register = asyncHandler(async (req, res) => {
    const { username, password } = req.body;
    const duplicate = await User.findOne({ username });
    if(duplicate) {
      return res.status(400).json({status: "failure",message: "User already exists"});
    }
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);
    const user = new User({ username, password: hashPassword });
    await user.save();
    res.status(201).json({status: "success", message: "User created", data: user});
})

//login user
const login = asyncHandler(async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if(!user) {
      return res.status(400).json({status: "failure",message: "User doesn't exists"});
    }
    const isMatch = bcrypt.compareSync(password, user.password);
    if(!isMatch) {
      return res.status(400).json({status: "failure",message: "Invalid password"});
    }
    //user exist and password is correct, create a jwt token
    const token = jwt.sign(req.body, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(200).json({status: "success", message: "User logged in", token});
})

module.exports = { register, login };