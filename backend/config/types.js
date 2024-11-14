const { z } = require("zod");

const TodoSchema = z.object({
  title: z.string(),
  desp: z.string(),
});
const TodoID = z.string();

module.exports = { TodoSchema, TodoID };
