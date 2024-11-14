import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Index() {
  const [data, setData] = useState({
    title: "",
    desp: "",
    isCompleted: false,
  });
  const [todos, setTodos] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("handle submit")
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/todos`,
        data
      );
      console.log("post todos", response);
    } catch (error) {
      console.error("post todos", error);
    }
  };

  useEffect(() => {
    console.log("API URL:", import.meta.env.VITE_API_URL);

    (async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/todos`
        );
        console.log("get todos", response);
      } catch (error) {
        console.error("get todos", error);
      }
    })();
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
                <input
                  type="checkbox"
                  checked={item.isCompleted}
                  onChange={(e) => handleUpdate(e.target.checked, item._id)}
                />
                <span>{item.title}</span>
                <span>{item.desp}</span>
                <button>Delete</button>
              </li>
            );
          })}
      </ul>
      {/*    */}
      <p style={{ textAlign: "center", fontSize: "17px" }}>
        <Link to="#">Logged in successfully. Logout</Link>
      </p>
      <p id="response-message"></p>
    </div>
  );
}

export default Index;
