const express = require("express");
const cors = require("cors");
const corsOptions = require("./config/corOptions");
const dbConnection = require("./config/dbConnection");
// const { logger } = require("./middleware/logs");
const errorLog = require("./middleware/errorLog");
const { default: mongoose } = require("mongoose");
require("dotenv").config();
const app = express();

const port = process.env.PORT || 5500;

//database connection
dbConnection(process.env.DB_URL);

//middlewares
app.use(express.json());
app.use(cors(corsOptions)); //
// app.use(logger);

//routes
app.use("/", require("./routes/user.route"));
app.use("/todos", require("./routes/todo.route"));
app.get("*", (req, res) => {
  res.status(404).json({ message: "Page Not Found" });
});




app.use(errorLog);

mongoose.connection.on("open", () => {
  console.log("Database connected");
  app.listen(port, () =>
    console.log(`Server is running on http://localhost:${port}`)
  );
});
mongoose.connection.on("error", (err) => {
  console.log("Database connection error", err);
});