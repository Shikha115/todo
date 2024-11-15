const { z } = require("zod");

const TodoSchema = z.object({
  title: z.string(),
  desp: z.string(),
  isCompleted: z.boolean(),
});
const TodoID = z.string();

const UserSchema = z.object({
  username: z.string(),
  password: z.string(),
});

module.exports = { TodoSchema, TodoID, UserSchema };
