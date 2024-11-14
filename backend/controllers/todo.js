const express = require("express");
const asyncHandler = require("express-async-handler");
const Todo = require("../modals/todo");
const { TodoSchema } = require("../config/types");

// ========== get all todo ==========
const getAlltodo = asyncHandler(async (req, res) => {
  const todo = await Todo.find({}).lean();
  if (!todo || !todo.length) {
    return res
      .status(404)
      .json({ status: "failure", message: "No todos found" });
  }
  res.status(200).json({ status: "success", data: todo });
});

// ========== create a todo ==========
const createAtodo = asyncHandler(async (req, res) => {
  const { title, desp } = req.body;
  if (!TodoSchema.safeParse(req.body).success) {
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
    desp, // Assuming `desp` is optional in your model
  });
  await newTodo.save();
  res.status(201).json({ status: "success", data: newTodo });
});

// ========== update a todo ==========
const deleteAtodo = asyncHandler(async (req, res) => {});

// ========== delete a todo ==========
const updateAtodo = asyncHandler(async (req, res) => {});

module.exports = { getAlltodo, createAtodo, deleteAtodo, updateAtodo };
