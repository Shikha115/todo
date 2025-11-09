import React, { useEffect, useState, memo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLocalStorageState } from "../hooks/localStorage";
import {
  useGetTodos,
  useCreateTodo,
  useUpdateTodo,
  useDeleteTodo,
} from "../api/todos.api";
import { useActionState } from "react";
import TodoCard from "../components/TodoCard";

function Index() {
  const navigate = useNavigate();

  const [data, setData] = useState({
    title: "",
    desp: "",
    isCompleted: false,
  });
  const [filter, setFilter] = useState("all");
  const [_, __, RemoveToken] = useLocalStorageState("token");
  const { data: todos } = useGetTodos();
  const { mutateAsync: createTodo } = useCreateTodo();

  const handleSubmit = async (_prev, formData) => {
    const title = formData.get("title");
    const desp = formData.get("desp");
    if (title && desp) {
      await createTodo({ title, desp, isCompleted: false });
      setData({ title: "", desp: "", isCompleted: false });
    }
    return null;
  };

  const [_result, submitAction, isPending] = useActionState(handleSubmit, null);

  const filteredTodos = todos?.filter((todo) => {
    if (filter === "completed") return todo.isCompleted;
    if (filter === "pending") return !todo.isCompleted;
    return true;
  });

  return (
    <div className="">
      {/* <h2 className="text-center">Your Todo List</h2> */}
      {/* filters */}
      {filteredTodos && filteredTodos.length > 0 && (
        <div className="container mb-4 !w-full !max-w-full">
          <div className="flex gap-2 justify-center">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-2 rounded ${
                filter === "all"
                  ? "bg-[#ffd700] text-black"
                  : "bg-white text-black"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter("completed")}
              className={`px-4 py-2 rounded ${
                filter === "completed"
                  ? "bg-[#ffd700] text-black"
                  : "bg-white text-black"
              }`}
            >
              Completed
            </button>
            <button
              onClick={() => setFilter("pending")}
              className={`px-4 py-2 rounded ${
                filter === "pending"
                  ? "bg-[#ffd700] text-black"
                  : "bg-white text-black"
              }`}
            >
              Pending
            </button>
          </div>
        </div>
      )}
      {/* ============ */}
      <div className="flex flex-col lg:flex-row gap-5 items-start">
        <div className="w-full lg:w-auto">
          <div className="container">
            <div id="todo-container">
              <form id="todo-form" action={submitAction}>
                <input
                  type="text"
                  placeholder="Title"
                  name="title"
                  value={data.title}
                  onChange={(e) =>
                    setData((prev) => ({ ...prev, title: e.target.value }))
                  }
                  required
                  className="w-full"
                />
                <input
                  type="text"
                  placeholder="Description"
                  name="desp"
                  value={data.desp}
                  onChange={(e) =>
                    setData((prev) => ({ ...prev, desp: e.target.value }))
                  }
                  required
                  className="w-full"
                />
                <button type="submit" disabled={isPending} className="w-full">
                  {isPending ? "Adding..." : "Add Todo"}
                </button>
              </form>
            </div>
          </div>
          <div className="text-center text-[17px] mt-5">
            <p
              className="text-[#ffd700] cursor-pointer"
              onClick={() => {
                RemoveToken();
                navigate("/");
              }}
            >
              Logged in successfully. Logout
            </p>
          </div>
        </div>
        {/* ============ */}
        {filteredTodos && filteredTodos.length > 0 && (
          <div className="w-full lg:w-auto">
            <TodoCard todos={filteredTodos} />
          </div>
        )}
      </div>
    </div>
  );
}

export default memo(Index);
