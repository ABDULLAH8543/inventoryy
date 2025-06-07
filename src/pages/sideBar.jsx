// // import React from "react";
// // import { useState } from "react";
// // import DashboardIcon from "@mui/icons-material/Dashboard";
// // import AddBoxIcon from "@mui/icons-material/AddBox";
// // import ViewListIcon from "@mui/icons-material/ViewList";
// // import SellIcon from "@mui/icons-material/Sell";
// // import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
// // import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
// // import DvrIcon from "@mui/icons-material/Dvr";
// // import LogoutIcon from "@mui/icons-material/Logout";
// // import ClearAllIcon from "@mui/icons-material/ClearAll";
// // import "./style.scss";

// // function Sidebar() {

// //   const [showOptions, setShowOptions] = useState(false);
// //   const [width, setWidth] = useState(window.innerWidth<=1000);

// //   const handleoptions = () => {
// //     console.log("clicked");
// //     const mobile = window.innerWidth <= 1000;
// //     setWidth(mobile);
// //     if (mobile) {
// //       setShowOptions(!showOptions);
// //       let mainHeading = document.getElementById("main-heading");
// //       let options = document.getElementById("options");
// //       let sidebar_fully_outer = document.getElementById("sidebar_fully_outer");
// //       let main_second_body = document.getElementById("main-second-body");
// //       if (showOptions) {
// //         options.style.display = "none";
// //         mainHeading.style.display = "block";
// //         sidebar_fully_outer.style.zIndex = "1";
// //         main_second_body.style.zIndex = "0";
// //         mainHeading.style.zIndex = "1";
// //       } else {
// //         options.style.display = "block";
// //         sidebar_fully_outer.style.zIndex = "0";
// //         main_second_body.style.zIndex = "1";
// //       }
// //     } else {
// //       setShowOptions(true);
// //     }
// //   }
// //   return (
// //     <div id="sidebar_fully_outer">
// //       <div id="sidebar_inner">
// //         <div id="more-options-btn" onClick={handleoptions}>
// //           <ClearAllIcon />
// //         </div>
// //         <div id="main-heading">
// //           <p>shop name</p>
// //         </div>
// //         <div id="options">
// //           <ul>
// //             <li>
// //               <div id="icon">
// //                 <DashboardIcon />
// //               </div>
// //               <p>Dashboard</p>
// //             </li>
// //             <li>
// //               <div id="icon">
// //                 <AddBoxIcon />
// //               </div>
// //               <p>Add products</p>
// //             </li>
// //             <li>
// //               <div id="icon">
// //                 <ViewListIcon />
// //               </div>
// //               <p>Show products</p>
// //             </li>
// //             <div id="special-options">
// //               <li>Dashboard</li>
// //               <li>Dashboard</li>
// //               <li>Dashboard</li>
// //               <li>Dashboard</li>
// //               <li>Dashboard</li>
// //               <li>Dashboard</li>
// //               <li>Dashboard</li>
// //             </div>
// //             <li>
// //               <div id="icon">
// //                 <SellIcon />
// //               </div>
// //               <p>Sell products</p>
// //             </li>
// //             <li>
// //               <div id="icon">
// //                 <PlaylistAddIcon />
// //               </div>
// //               <p>To-do</p>
// //             </li>
// //             <li>
// //               <div id="icon">
// //                 <DvrIcon />
// //               </div>
// //               <p>Previous day</p>
// //             </li>
// //             <li>
// //               <div id="icon">
// //                 <ReceiptLongIcon />
// //               </div>
// //               <p>Previous report</p>
// //             </li>
// //             <li>
// //               <div id="icon">
// //                 <LogoutIcon />
// //               </div>
// //               <p>logout</p>
// //             </li>
// //           </ul>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // export default Sidebar;

// import React, { useState, useEffect } from "react";
// import DashboardIcon from "@mui/icons-material/Dashboard";
// import AddBoxIcon from "@mui/icons-material/AddBox";
// import ViewListIcon from "@mui/icons-material/ViewList";
// import SellIcon from "@mui/icons-material/Sell";
// import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
// import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
// import DvrIcon from "@mui/icons-material/Dvr";
// import LogoutIcon from "@mui/icons-material/Logout";
// import ClearAllIcon from "@mui/icons-material/ClearAll";
// import CloseIcon from "@mui/icons-material/Close";
// import "./style.scss";
// import { Navigate } from "react-router-dom";

// function Sidebar() {
//   const [showOptions, setShowOptions] = useState(false);
//   const [isMobile, setIsMobile] = useState(window.innerWidth <= 1000);

//   useEffect(() => {
//     const handleResize = () => {
//       const mobile = window.innerWidth <= 1000;
//       setIsMobile(mobile);
//       if (!mobile) {
//         setShowOptions(true);
//         resetZIndex();
//       }
//     };

//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   const toggleOptions = () => {
//     const sidebar = document.getElementById("sidebar_fully_outer");
//     const mainBody = document.getElementById("main-second-body");
//     const sidebar_fully_outer = document.getElementById("sidebar_fully_outer");
//     const main_second_body = document.getElementById("main-second-body");
//     if (!showOptions) {
//       sidebar.style.zIndex = "1";
//       mainBody.style.zIndex = "0";
//       sidebar_fully_outer.style.left = "0";
//       main_second_body.style.height = "80%";
//     } else {
//       sidebar.style.zIndex = "0";
//       mainBody.style.zIndex = "1";
//       sidebar_fully_outer.style.left = "5%";
//       main_second_body.style.height = "100%";
//     }

//     setShowOptions((prev) => !prev);
//   };

//   const resetZIndex = () => {
//     const sidebar = document.getElementById("sidebar_fully_outer");
//     const mainBody = document.getElementById("main-second-body");

//     sidebar.style.zIndex = "1";
//     mainBody.style.zIndex = "0";
//   };

//   const addpro = () => {
//     Navigate("/add");
//   };

//   return (
//     <div id="sidebar_fully_outer">
//       <div id="sidebar_inner">
//         <div id="more-options-btn" onClick={toggleOptions}>
//           {showOptions ? <CloseIcon /> : <ClearAllIcon />}
//         </div>

//         {(showOptions || !isMobile) && (
//           <div id="main-heading">
//             <p>shop name</p>
//           </div>
//         )}

//         {(showOptions || !isMobile) && (
//           <div id="options">
//             <ul>
//               <li>
//                 <div id="icon">
//                   <DashboardIcon />
//                 </div>
//                 <p>Dashboard</p>
//               </li>
//               <li>
//                 <div id="icon">
//                   <AddBoxIcon />
//                 </div>
//                 <p onClick={addpro}>Add products</p>
//               </li>
//               <li>
//                 <div id="icon">
//                   <ViewListIcon />
//                 </div>
//                 <p>Show products</p>
//               </li>

//               <div id="special-options">
//                 <li>Dashboard</li>
//                 <li>Dashboard</li>
//                 <li>Dashboard</li>
//                 <li>Dashboard</li>
//                 <li>Dashboard</li>
//                 <li>Dashboard</li>
//                 <li>Dashboard</li>
//               </div>

//               <li>
//                 <div id="icon">
//                   <SellIcon />
//                 </div>
//                 <p>Sell products</p>
//               </li>
//               <li>
//                 <div id="icon">
//                   <PlaylistAddIcon />
//                 </div>
//                 <p>To-do</p>
//               </li>
//               <li>
//                 <div id="icon">
//                   <DvrIcon />
//                 </div>
//                 <p>Previous day</p>
//               </li>
//               <li>
//                 <div id="icon">
//                   <ReceiptLongIcon />
//                 </div>
//                 <p>Previous report</p>
//               </li>
//               <li>
//                 <div id="icon">
//                   <LogoutIcon />
//                 </div>
//                 <p>logout</p>
//               </li>
//             </ul>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Sidebar;

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
  const [showOptions, setShowOptions] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1000);
  const navigate = useNavigate();
  const location = useLocation();

  const mainMenuItems = [
    { label: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
    { label: "Add products", icon: <AddBoxIcon />, path: "/add" },
    { label: "Show products", icon: <ViewListIcon />, path: "/ShowProducts" },
    { label: "Sell products", icon: <SellIcon />, path: "/sellProducts" },
    {
      label: "On going sales",
      icon: <AppRegistrationIcon />,
      path: "/ongoing",
    },
    { label: "To-do", icon: <PlaylistAddIcon />, path: "/toDo" },
    { label: "Previous day", icon: <DvrIcon />, path: "/previousDay" },
    {
      label: "Previous report",
      icon: <ReceiptLongIcon />,
      path: "/previousReport",
    },
  ];

  const specialMenuItems = [
    { label: "Dashboard", path: "/special1" },
    { label: "Dashboard", path: "/special2" },
    { label: "Dashboard", path: "/special3" },
    { label: "Dashboard", path: "/special4" },
    { label: "Dashboard", path: "/special5" },
    { label: "Dashboard", path: "/special6" },
    { label: "Dashboard", path: "/special7" },
  ];

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 1000;
      setIsMobile(mobile);
      if (!mobile) {
        setShowOptions(true);
        resetZIndex();
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleOptions = () => {
    const sidebar = document.getElementById("sidebar_fully_outer");
    const mainBody = document.getElementById("main-second-body");

    if (!showOptions) {
      sidebar.style.zIndex = "1";
      mainBody.style.zIndex = "0";
      sidebar.style.left = "0";
      mainBody.style.height = "80%";
      document.body.classList.add("sidebar-open-mobile");
    } else {
      sidebar.style.zIndex = "0";
      mainBody.style.zIndex = "1";
      sidebar.style.left = "5%";
      mainBody.style.height = "100%";
      document.body.classList.remove("sidebar-open-mobile");
    }

    setShowOptions((prev) => !prev);
  };

  const resetZIndex = () => {
    const sidebar = document.getElementById("sidebar_fully_outer");
    const mainBody = document.getElementById("main-second-body");

    sidebar.style.zIndex = "1";
    mainBody.style.zIndex = "0";
  };

  const handleNavigation = (path) => {
    navigate(path);

    if (isMobile) {
      setShowOptions(false);
      const sidebar = document.getElementById("sidebar_fully_outer");
      const mainBody = document.getElementById("main-second-body");

      sidebar.style.zIndex = "0";
      mainBody.style.zIndex = "1";
      mainBody.style.height = "100%";
      sidebar.style.left = "5%";
      document.body.classList.remove("sidebar-open-mobile");
    }
  };

  return (
    <div id="sidebar_fully_outer">
      <div id="sidebar_inner">
        <div id="more-options-btn" onClick={toggleOptions}>
          {showOptions ? <CloseIcon /> : <ClearAllIcon />}
        </div>

        {(showOptions || !isMobile) && (
          <>
            <div id="main-heading">
              <p>shop name</p>
            </div>

            <div id="options">
              <ul>
                {mainMenuItems.map((item, index) => {
                  if (index === 3) {
                    return (
                      <React.Fragment key={index}>
                        <li
                          className={
                            location.pathname === mainMenuItems[2].path
                              ? "active-option"
                              : ""
                          }
                          onClick={() =>
                            handleNavigation(mainMenuItems[2].path)
                          }
                        >
                          <div id="icon">{mainMenuItems[2].icon}</div>
                          <p>{mainMenuItems[2].label}</p>
                        </li>

                        <div id="special-options">
                          {specialMenuItems.map((item, i) => (
                            <li
                              key={`special-${i}`}
                              className={
                                location.pathname === item.path
                                  ? "active-option"
                                  : ""
                              }
                              onClick={() => handleNavigation(item.path)}
                            >
                              <p>{item.label}</p>
                            </li>
                          ))}
                        </div>

                        <li
                          className={
                            location.pathname === item.path
                              ? "active-option"
                              : ""
                          }
                          onClick={() => handleNavigation(item.path)}
                        >
                          <div id="icon">{item.icon}</div>
                          <p>{item.label}</p>
                        </li>
                      </React.Fragment>
                    );
                  }
                  if (index === 2) return null;

                  return (
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
                  );
                })}

                <li>
                  <div id="icon">
                    <LogoutIcon />
                  </div>
                  <p>logout</p>
                </li>
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Sidebar;
