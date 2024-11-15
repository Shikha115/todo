import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { url } from "../api/url";


function Index() {
  const navigate = useNavigate();

  const [data, setData] = useState({
    title: "",
    desp: "",
    isCompleted: false,
  });
  const [todos, setTodos] = useState([]);

  const getAllTodos = async () => {
    try {
      const response = await axios.get(url.todoUrl);
      console.log("get todos", response.data);

      setTodos(response.data.data);
    } catch (error) {
      console.error("get todos error", error.response.data);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("handle submit");
    try {
      const response = await axios.post(url.todoUrl, data);
      console.log("post todos", response.data.data);
      //update todos state
      if (data.title && data.desp) {
        setTodos((prev) => [...prev, response.data.data]);
      }
    } catch (error) {
      console.error("post todos error", error.response.data);
    }
  };

  const handleUpdate = async (value, id) => {
    console.log("handle update");
    try {
      const response = await axios.patch(url.todoUrl, {
        isCompleted: value,
        id,
      });
      console.log("patch todos", response.data.data);
      //update todos state
      const arr = todos.map((item) => {
        item._id === id && (item.isCompleted = value);
        return item;
      });
      setTodos(arr);
    } catch (error) {
      console.error("patch todos error", error.response.data);
    }
  };

  const deleteATodo = async (id) => {
    console.log("handle delete: ", id);
    try {
      const response = await axios.delete(url.todoUrl, {
        data: { id },
      });
      console.log("delete todos", response.data);

      //update todos state
      const arr = todos.filter((item) => item._id !== id);
      setTodos(arr);
    } catch (error) {
      console.error("delete todos error", error.response.data);
    }
  };

  useEffect(() => {
    console.log("API URL:", import.meta.env.VITE_API_URL);
    getAllTodos();
  }, []);

  return (
    <div id="todo-container">
      <h2>Your Todo List</h2>
      <form id="todo-form">
        <input
          type="text"
          id="todo-input"
          placeholder="Title"
          value={data.title}
          onChange={(e) =>
            setData((prev) => ({ ...prev, title: e.target.value }))
          }
          required
        />
        <input
          type="text"
          id="todo-input"
          placeholder="Description"
          value={data.desp}
          onChange={(e) =>
            setData((prev) => ({ ...prev, desp: e.target.value }))
          }
          required
        />
        <button type="submit" onClick={handleSubmit}>
          Add Todo
        </button>
      </form>
      <ul id="todo-list">
        {todos &&
          todos.length > 0 &&
          todos.map((item, i) => {
            return (
              <li key={i}>
                <div>
                  <input
                    id={`checkItem${i}`}
                    type="checkbox"
                    defaultChecked={item.isCompleted}
                    onChange={(e) => handleUpdate(e.target.checked, item._id)}
                    style={{ display: "none" }}
                  />
                  <label
                    htmlFor={`checkItem${i}`}
                    className={item.isCompleted ? "active" : ""}
                  >
                    <span>
                      <b>{item.title}:</b>
                    </span>
                    <span>
                      <small>{item.desp}</small>
                    </span>
                  </label>
                </div>
                <button onClick={() => deleteATodo(item._id)}>Delete</button>
              </li>
            );
          })}
      </ul>
      {/*    */}
      <p style={{ textAlign: "center", fontSize: "17px" }}>
        <p
          style={{ color: "#ffd700",cursor: "pointer" }}
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/login");
          }}
        >
          {" "}
          Logged in successfully. Logout
        </p>
      </p>
      <p id="response-message"></p>
    </div>
  );
}

export default Index;
