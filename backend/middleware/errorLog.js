const { logEvent } = require("./logs");

const errorLog = (err, req, res, next) => {
  const msg = `${err.name}\t${err.message}\t${req.method}\t${
    req.url
  }\t${req.get("origin")}`;

  logEvent("errorLog.log", msg);

  res.json({
    status: "failure",
    data: "msg from error middleware",
    message: err.message,
  });
};

module.exports = errorLog;
