// import React from "react";
// import { useState } from "react";
// import DashboardIcon from "@mui/icons-material/Dashboard";
// import AddBoxIcon from "@mui/icons-material/AddBox";
// import ViewListIcon from "@mui/icons-material/ViewList";
// import SellIcon from "@mui/icons-material/Sell";
// import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
// import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
// import DvrIcon from "@mui/icons-material/Dvr";
// import LogoutIcon from "@mui/icons-material/Logout";
// import ClearAllIcon from "@mui/icons-material/ClearAll";
// import "./style.scss";

// function Sidebar() {

//   const [showOptions, setShowOptions] = useState(false);
//   const [width, setWidth] = useState(window.innerWidth<=1000);

//   const handleoptions = () => {
//     console.log("clicked");
//     const mobile = window.innerWidth <= 1000;
//     setWidth(mobile);
//     if (mobile) {
//       setShowOptions(!showOptions);
//       let mainHeading = document.getElementById("main-heading");
//       let options = document.getElementById("options");
//       let sidebar_fully_outer = document.getElementById("sidebar_fully_outer");
//       let main_second_body = document.getElementById("main-second-body");
//       if (showOptions) {
//         options.style.display = "none";
//         mainHeading.style.display = "block";
//         sidebar_fully_outer.style.zIndex = "1";
//         main_second_body.style.zIndex = "0";
//         mainHeading.style.zIndex = "1";
//       } else {
//         options.style.display = "block";
//         sidebar_fully_outer.style.zIndex = "0";
//         main_second_body.style.zIndex = "1";
//       }
//     } else {
//       setShowOptions(true);
//     }
//   }
//   return (
//     <div id="sidebar_fully_outer">
//       <div id="sidebar_inner">
//         <div id="more-options-btn" onClick={handleoptions}>
//           <ClearAllIcon />
//         </div>
//         <div id="main-heading">
//           <p>shop name</p>
//         </div>
//         <div id="options">
//           <ul>
//             <li>
//               <div id="icon">
//                 <DashboardIcon />
//               </div>
//               <p>Dashboard</p>
//             </li>
//             <li>
//               <div id="icon">
//                 <AddBoxIcon />
//               </div>
//               <p>Add products</p>
//             </li>
//             <li>
//               <div id="icon">
//                 <ViewListIcon />
//               </div>
//               <p>Show products</p>
//             </li>
//             <div id="special-options">
//               <li>Dashboard</li>
//               <li>Dashboard</li>
//               <li>Dashboard</li>
//               <li>Dashboard</li>
//               <li>Dashboard</li>
//               <li>Dashboard</li>
//               <li>Dashboard</li>
//             </div>
//             <li>
//               <div id="icon">
//                 <SellIcon />
//               </div>
//               <p>Sell products</p>
//             </li>
//             <li>
//               <div id="icon">
//                 <PlaylistAddIcon />
//               </div>
//               <p>To-do</p>
//             </li>
//             <li>
//               <div id="icon">
//                 <DvrIcon />
//               </div>
//               <p>Previous day</p>
//             </li>
//             <li>
//               <div id="icon">
//                 <ReceiptLongIcon />
//               </div>
//               <p>Previous report</p>
//             </li>
//             <li>
//               <div id="icon">
//                 <LogoutIcon />
//               </div>
//               <p>logout</p>
//             </li>
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Sidebar;

import React, { useState, useEffect } from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AddBoxIcon from "@mui/icons-material/AddBox";
import ViewListIcon from "@mui/icons-material/ViewList";
import SellIcon from "@mui/icons-material/Sell";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import DvrIcon from "@mui/icons-material/Dvr";
import LogoutIcon from "@mui/icons-material/Logout";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import CloseIcon from "@mui/icons-material/Close";
import "./style.scss";
import { Navigate } from "react-router-dom";

function Sidebar() {
  const [showOptions, setShowOptions] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1000);

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
    const sidebar_fully_outer = document.getElementById("sidebar_fully_outer");
    const main_second_body = document.getElementById("main-second-body");
    if (!showOptions) {
      sidebar.style.zIndex = "1";
      mainBody.style.zIndex = "0";
      sidebar_fully_outer.style.left = "0";
      main_second_body.style.height = "80%";
    } else {
      sidebar.style.zIndex = "0";
      mainBody.style.zIndex = "1";
      sidebar_fully_outer.style.left = "5%";
      main_second_body.style.height = "100%";
    }

    setShowOptions((prev) => !prev);
  };

  const resetZIndex = () => {
    const sidebar = document.getElementById("sidebar_fully_outer");
    const mainBody = document.getElementById("main-second-body");

    sidebar.style.zIndex = "1";
    mainBody.style.zIndex = "0";
  };

  const addpro = () => {
    Navigate("/add");
  };

  return (
    <div id="sidebar_fully_outer">
      <div id="sidebar_inner">
        <div id="more-options-btn" onClick={toggleOptions}>
          {showOptions ? <CloseIcon /> : <ClearAllIcon />}
        </div>

        {(showOptions || !isMobile) && (
          <div id="main-heading">
            <p>shop name</p>
          </div>
        )}

        {(showOptions || !isMobile) && (
          <div id="options">
            <ul>
              <li>
                <div id="icon">
                  <DashboardIcon />
                </div>
                <p>Dashboard</p>
              </li>
              <li>
                <div id="icon">
                  <AddBoxIcon />
                </div>
                <p onClick={addpro}>Add products</p>
              </li>
              <li>
                <div id="icon">
                  <ViewListIcon />
                </div>
                <p>Show products</p>
              </li>

              <div id="special-options">
                <li>Dashboard</li>
                <li>Dashboard</li>
                <li>Dashboard</li>
                <li>Dashboard</li>
                <li>Dashboard</li>
                <li>Dashboard</li>
                <li>Dashboard</li>
              </div>

              <li>
                <div id="icon">
                  <SellIcon />
                </div>
                <p>Sell products</p>
              </li>
              <li>
                <div id="icon">
                  <PlaylistAddIcon />
                </div>
                <p>To-do</p>
              </li>
              <li>
                <div id="icon">
                  <DvrIcon />
                </div>
                <p>Previous day</p>
              </li>
              <li>
                <div id="icon">
                  <ReceiptLongIcon />
                </div>
                <p>Previous report</p>
              </li>
              <li>
                <div id="icon">
                  <LogoutIcon />
                </div>
                <p>logout</p>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default Sidebar;
