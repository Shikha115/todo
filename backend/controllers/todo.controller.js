const asyncHandler = require("express-async-handler");
const Todo = require("../models/todo.model.js");
const { TodoSchema, TodoID } = require("../config/types.js");
const mongoose = require("mongoose");

// ========== get all todo ==========
const getAlltodo = asyncHandler(async (req, res) => {
  const todo = await Todo.find({})
    .sort({
      createdAt: -1,
    })
    .lean();
  if (!todo) {
    return res
      .status(404)
      .json({ status: "failure", message: "No todos found" });
  }
  res
    .status(200)
    .json({ status: "success", message: "todo retrieved", data: todo });
});

// ========== create a todo ==========
const createAtodo = asyncHandler(async (req, res) => {
  const { title, desp, isCompleted = false } = req.body;
  const parsed = TodoSchema.safeParse(req.body);
  if (!parsed.success) {
    return res
      .status(400)
      .json({ message: "Invalid input data", errors: parsed.error.errors });
  }
  const duplicateTodo = await Todo.findOne({ title: title.trim() });
  if (duplicateTodo) {
    return res.status(400).json({ message: "Todo already exists" });
  }
  const newTodo = new Todo({
    title,
    desp,
    isCompleted,
  });
  await newTodo.save();
  res
    .status(201)
    .json({ status: "success", msg: "todo created", data: newTodo });
});

// ========== update a todo ==========
const updateAtodo = asyncHandler(async (req, res) => {
  const { isCompleted, id } = req.body;
  const todo = await Todo.findById(id);
  if (typeof isCompleted !== "boolean") {
    return res.status(400).json({ message: "Invalid input data type" });
  }
  if (!todo) {
    return res.status(404).json({ message: "Todo not found" });
  }
  todo.isCompleted = isCompleted;
  await todo.save();
  res.status(200).json({ status: "success", msg: "todo updated", data: todo });
});

// ========== delete a todo ==========
const deleteAtodo = asyncHandler(async (req, res) => {
  const { id } = req.body;
  const parse = TodoID.safeParse(id);
  if (!id || !mongoose.Types.ObjectId.isValid(id) || !parse.success) {
    return res.status(400).json({ message: "Invalid input data" });
  }

  const result = await Todo.deleteOne({ _id: id });

  if (result.deletedCount === 0) {
    return res.status(404).json({ message: "Todo not found" });
  }

  res.status(200).json({ status: "success", msg: "todo deleted", data: todo });
});

module.exports = { getAlltodo, createAtodo, deleteAtodo, updateAtodo };
