import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Stack from "react-bootstrap/Stack";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";

import "./App.css";

import Login from "./components/Login";
import Dashboard from "./components/Dashboard";

function App() {
  let navigate = useNavigate();
  const [userId, setUserId] = useState("");
  const addUserId = (enteredText) => {
    console.log(enteredText);
    setUserId(enteredText);

    navigate("login");
  };

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login onAddUserId={addUserId} />} />
        <Route path="login" element={<Dashboard userId={userId} />} />
      </Routes>
    </div>
  );
}

export default App;
