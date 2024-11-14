import React from 'react'
import { Outlet } from 'react-router-dom'

function Layout() {
  return (
    <section className="page" style={{ position: "relative" }}>
    <h1 className="title">
      <b>👉🏻 Taskify...</b>
    </h1>
    <div className="container">
        <Outlet />
    </div>
  </section>
  )
}

export default Layout