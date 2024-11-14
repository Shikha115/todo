const allowedOrigin = [
  "http://localhost:5173",
  "http://localhost:5500",
  `http://localhost:${process.env.PORT}`,
];

module.exports = allowedOrigin;
