import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./components/Index";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Layout from "./components/Layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/index" element={<Index />} />
          <Route index element={<SignIn />} />
          <Route path="/register" element={<SignUp />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
