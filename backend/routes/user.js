const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/user");
const userValidation = require("../middleware/userValidation");
const { authenticateToken } = require("../middleware/authenticateToken");

router.post("/login",userValidation, login);
router.post("/register", userValidation, register);


router.get("/protectedRoute", authenticateToken, (req, res) => {
    res.json({ message: "This is a protected route", user: req.user });
});

module.exports = router;
