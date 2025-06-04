import React from "react";
import DashboardIcon from '@mui/icons-material/Dashboard';
import AddBoxIcon from '@mui/icons-material/AddBox';
import ViewListIcon from '@mui/icons-material/ViewList';
import SellIcon from '@mui/icons-material/Sell';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import DvrIcon from '@mui/icons-material/Dvr';
import LogoutIcon from '@mui/icons-material/Logout';
import ClearAllIcon from '@mui/icons-material/ClearAll';
import "./style.scss";

function Sidebar() {
  return (
    <div id="sidebar_fully_outer">
      <div id="sidebar_inner">
        <div id="more-options-btn">
      <ClearAllIcon/>
          </div>
        <div id="main-heading">
          <p>shop name</p>
        </div>
        <div id="options">
          <ul>
            <li><div id="icon"><DashboardIcon/></div><p>Dashboard</p></li>
            <li><div id="icon"><AddBoxIcon/></div><p>Add products</p></li>
            <li><div id="icon"><ViewListIcon/></div><p>Show products</p></li>
            <div id="special-options">
              <li>Dashboard</li>
              <li>Dashboard</li>
              <li>Dashboard</li>
              <li>Dashboard</li>
              <li>Dashboard</li>
              <li>Dashboard</li>
              <li>Dashboard</li>
            </div>
            <li><div id="icon"><SellIcon/></div><p>Sell products</p></li>
            <li><div id="icon"><PlaylistAddIcon/></div><p>To-do</p></li>
            <li><div id="icon"><DvrIcon/></div><p>Previous day</p></li>
            <li><div id="icon"><ReceiptLongIcon/></div><p>Previous report</p></li>
            <li><div id="icon"><LogoutIcon/></div><p>logout</p></li>
            </ul>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
