import React, { useState, useEffect } from "react";
import {
  Dashboard as DashboardIcon,
  AddBox as AddBoxIcon,
  ViewList as ViewListIcon,
  Sell as SellIcon,
  PlaylistAdd as PlaylistAddIcon,
  ReceiptLong as ReceiptLongIcon,
  Dvr as DvrIcon,
  Logout as LogoutIcon,
  ClearAll as ClearAllIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import { useNavigate, useLocation } from "react-router-dom";
import "./style.scss";

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [showOptions, setShowOptions] = useState(window.innerWidth > 1000);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1000);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const mainMenuItems = [
    { label: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
    { label: "Add products", icon: <AddBoxIcon />, path: "/add" },
    { label: "Show products", icon: <ViewListIcon />, path: "/ShowProducts" },
    { label: "Sell products", icon: <SellIcon />, path: "/sellProducts" },
    { label: "To-do", icon: <PlaylistAddIcon />, path: "/toDo" },
    {
      label: "On going sales",
      icon: <AppRegistrationIcon />,
      path: "/ongoing",
    },
    { label: "Previous day", icon: <DvrIcon />, path: "/previousDay" },
    {
      label: "Previous report",
      icon: <ReceiptLongIcon />,
      path: "/previousReport",
    },
  ];

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 1000;
      setIsMobile(mobile);
      setShowOptions(!mobile);
      applySidebarStyles(!mobile);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const applySidebarStyles = (show) => {
    const sidebar = document.getElementById("sidebar_fully_outer");
    const mainBody = document.getElementById("main-second-body");

    if (!sidebar || !mainBody) return;

    if (show) {
      sidebar.style.zIndex = "1";
      sidebar.style.left = "0";
      mainBody.style.zIndex = "0";
      mainBody.style.height = "80%";
    } else {
      sidebar.style.zIndex = "0";
      sidebar.style.left = "5%";
      mainBody.style.zIndex = "1";
      mainBody.style.height = "100%";
    }
  };

  const toggleOptions = () => {
    const newShow = !showOptions;
    setShowOptions(newShow);
    applySidebarStyles(newShow);
  };

  const handleNavigation = (path) => {
    navigate(path);
    if (isMobile) {
      setShowOptions(false);
      applySidebarStyles(false);
    }
  };

  const handleLogoutClick = () => {
    setShowLogoutConfirm(true);
  };

  const confirmLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/login");
    setShowLogoutConfirm(false);
  };

  const cancelLogout = () => {
    setShowLogoutConfirm(false);
  };

  return (
    <div id="sidebar_fully_outer">
      <div id="sidebar_inner">
        <div id="more-options-btn" onClick={toggleOptions}>
          {showOptions ? <CloseIcon /> : <ClearAllIcon />}
        </div>

        {showOptions && (
          <>
            <div id="main-heading">
              <p>Shop Name</p>
            </div>

            <div id="options">
              <ul>
                {mainMenuItems.map((item, index) => (
                  <li
                    key={index}
                    className={
                      location.pathname === item.path ? "active-option" : ""
                    }
                    onClick={() => handleNavigation(item.path)}
                  >
                    <div id="icon">{item.icon}</div>
                    <p>{item.label}</p>
                  </li>
                ))}
                <li onClick={handleLogoutClick}>
                  <div id="icon">
                    <LogoutIcon />
                  </div>
                  <p>Logout</p>
                </li>
              </ul>
            </div>
          </>
        )}
      </div>

      {showLogoutConfirm && (
        <div id="logout-confirm-overlay">
          <div className="logout-dialog">
            <h3>Are you sure you want to logout?</h3>
            <div className="logout-buttons">
              <button
                onClick={confirmLogout}
                style={{ backgroundColor: "red", color: "white" }}
              >
                Logout
              </button>
              <button onClick={cancelLogout}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Sidebar;
