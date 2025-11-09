import React, { memo } from "react";
import { useDeleteTodo, useGetTodos, useUpdateTodo } from "../api/todos.api";

function TodoCard({ todos }) {
  const { mutateAsync: updateTodo } = useUpdateTodo();
  const { mutateAsync: deleteTodo } = useDeleteTodo();

  const handleUpdateTodo = async (id, isCompleted) => {
    await updateTodo({ id, isCompleted });
  };

  const handleDeleteTodo = async (id) => {
    await deleteTodo(id);
  };

  return (
    <div className="container">
      <ul id="todo-list" className="max-h-[300px] overflow-y-scroll">
        {todos &&
          todos.length > 0 &&
          todos.map((item, i) => {
            return (
              <li key={i}>
                <div className="label items-center flex gap-[5px] justify-between">
                  <div className="items-center flex gap-[10px]">
                    <input
                      type="checkbox"
                      checked={item.isCompleted}
                      onChange={(e) =>
                        handleUpdateTodo(item._id, e.target.checked)
                      }
                      className="custom-checkbox "
                    />
                    <div
                      className={`custom-checkbox-label relative flex-1 font-semibold capitalize mb-0 ${
                        item.isCompleted ? "active" : ""
                      }`}
                    >
                      {item.title}
                    </div>
                  </div>
                  <button onClick={() => handleDeleteTodo(item._id)}>
                    Delete
                  </button>
                </div>

                <p className="text-[12px] mt-1">{item.desp}</p>
              </li>
            );
          })}
      </ul>
    </div>
  );
}

export default memo(TodoCard);
