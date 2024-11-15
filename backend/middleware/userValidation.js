const { UserSchema } = require("../config/types");

const userValidation=(req,res,next)=>{
    const { username, password } = req.body;
    const parse = UserSchema.safeParse({ username, password });
    if (!parse.success) {
      return res.status(400).json({
        status: "failure",
        message: "Invalid input data",
        errors: parsed.error.errors,
      });
    }
    next();
}

module.exports = userValidation;