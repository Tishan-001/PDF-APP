import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import './App.css';
import Register from "./Auth/Register";
import Login from "./Auth/Login";
import Dashboard from "./Pages/Dashboard";
import { useAuth } from "./Contexts/AuthContext";

const App = () =>{
  const { isAuthenticated } = useAuth();
  return (
    <Router>
      <Routes>
        <Route path="/" element={!isAuthenticated ? <Register/> : <Navigate to="/dashboard"/>}/>
        <Route path="/login" element={!isAuthenticated ? <Login/> : <Navigate to="/dashboard"/>}/>
        <Route path="/dashboard" element={isAuthenticated ? <Dashboard/> : <Login/>}/>
      </Routes>
    </Router>
  );
  
};

export default App;