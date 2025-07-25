import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import NavBar from "../pages/navBar/navBar";
import Sidebar from "../pages/SideBar/sideBar";
import Dashboard from "../pages/dashboard/dashboard";
import Add from "../pages/addProducts/addProducts";
import ShowProducts from "../pages/showProducts/showProducts";
import ToDo from "../pages/toDo/toDo";
import SellProducts from "../pages/sellProducts/sellProducts";
import PreviousDay from "../pages/previousDay/previousDay";
import PreviousReport from "../pages/previousReport";
import Ongoing from "../pages/onGoingSales/onGoingSales";
import Login from "../pages/Login/login";

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

const Mainpage = () => {
  return (
    <Router>
      <Routes>
        {/* Public Login Route */}
        <Route path="/login" element={<Login />} />

        {/* Protected Routes with Layout */}
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <>
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
                      <Route
                        path="/previousReport"
                        element={<PreviousReport />}
                      />
                      {/* Fallback route */}
                      <Route path="*" element={<Navigate to="/dashboard" />} />
                    </Routes>
                  </div>
                </div>
              </>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default Mainpage;
