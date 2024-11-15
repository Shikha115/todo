const { logEvent } = require("./logs");

const errorLog = async (err, req, res, next) => {
  const msg = `${err.name}\t${err.message}\t${req.method}\t${
    req.url
  }\t${req.get("origin")}`;

  await logEvent("errorLog.log", msg);

  res.json({
    status: "failure",
    data: "msg from error middleware",
    message: err.message,
  });
  next();
};

module.exports = errorLog;
