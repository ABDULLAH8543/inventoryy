import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "../pages/navBar/navBar";
import Dashboard from "../pages/dashboard/dashboard";
import Add from "../pages/addProducts/addProducts";
import Sidebar from "../pages/SideBar/sideBar";
import ShowProducts from "../pages/showProducts/showProducts";
import ToDo from "../pages/toDo";
import SellProducts from "../pages/sellProducts";
import PreviousDay from "../pages/previousDay";
import PreviousReport from "../pages/previousReport";
import Ongoing from "../pages/onGoingSales";

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
            <Route path="/ShowProducts" element={<ShowProducts />} />
            <Route path="/toDo" element={<ToDo />} />
            <Route path="/sellProducts" element={<SellProducts />} />
            <Route path="/ongoing" element={<Ongoing />} />
            <Route path="/previousDay" element={<PreviousDay />} />
            <Route path="/previousReport" element={<PreviousReport />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default Mainpage;
