const allowedOrigin = [
  "http://localhost:5173",
  "http://localhost:5500",
  `http://localhost:${process.env.PORT}`,
  `https://taskify-backend-aw6w.onrender.com`,
  `https://taskify-s4bt.onrender.com`,
];

module.exports = allowedOrigin;
