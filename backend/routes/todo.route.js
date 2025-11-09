const express = require("express");

const {
  getAlltodo,
  createAtodo,
  updateAtodo,
  deleteAtodo,
} = require("../controllers/todo.controller");
const router = express.Router();

router
  .route("/")
  .get(getAlltodo)
  .post(createAtodo)
  .patch(updateAtodo)
  .delete(deleteAtodo);

module.exports = router;
