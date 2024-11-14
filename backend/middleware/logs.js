const path = require("path");
const fs = require("fs").promises;
const { format } = require("date-fns");
const { v4: uuid } = require("uuid"); 

const logEvent = async (file, msg) => {
  const filePath = path.join(__dirname,"..", "logs",file);
  const fileMsg = `${format(new Date(), "yyyy-MM-dd")}\t${uuid()}\t${msg}\n`;
  try {
    await fs.appendFile(filePath, fileMsg);
  } catch (err) {
    console.log(err);
  }
};

const logger = (req, res, next) => {
  const msg = `${req.method}\t${req.url}\t${req.get("origin")}`;
  logEvent("reqLog.log", msg);
  console.log(`reqLog = ${msg}`);
};

module.exports = { logger, logEvent };
