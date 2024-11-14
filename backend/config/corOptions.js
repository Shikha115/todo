const allowedOrigin = require("./allowedOrigin");

var corsOptions = {
  origin: function (origin, callback) {
    console.log("origin", origin);
    if (!origin || allowedOrigin.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200
};

module.exports = corsOptions;
