import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "../pages/navBar";
import Dashboard from "../pages/dashboard";
import Add from "../pages/addProducts";
import Sidebar from "../pages/sideBar";

const Mainpage = () => {
  return (
    <Router>
      <NavBar />
      <div id="side-bar">
        <Sidebar />
        <div id="main-second-body">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/add" element={<Add />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default Mainpage;
