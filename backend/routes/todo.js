const express = require("express");
const { getAlltodo, createAtodo, updateAtodo, deleteAtodo } = require("../controllers/todo");
const router = express.Router();


router.route('/').get(getAlltodo)
.post(createAtodo)
.put(updateAtodo)
.delete(deleteAtodo);


module.exports = router;