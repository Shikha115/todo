import React, { memo } from "react";
import { Outlet } from "react-router-dom";
import useThemeStore from "../store/themeStore";

function Layout() {
  const { theme, toggleTheme } = useThemeStore();

  return (
    <section className="page" style={{ position: "relative" }}>
      <h1 className="title">
        <b>👉🏻 Taskify...</b>
      </h1>
      <button
        onClick={toggleTheme}
        style={{
          position: "fixed",
          top: "10px",
          right: "10px",
          height: "40px",
          width: "40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "50%",
          backgroundColor: theme=="light"?"#fff":"#333",
          border: "none",
          cursor: "pointer",
          zIndex: 1000,
        }}
      >
        {theme === "light" ? "🌙" : "☀️"}
      </button>
      <Outlet />
    </section>
  );
}

export default memo(Layout);
