import { Fragment } from "react";
import React from "react";
import AuthForm from "./components/Auth/Auth";
import Home from "./components/Pages/home";
import "./App.css";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<AuthForm />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
