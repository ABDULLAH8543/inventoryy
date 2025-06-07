import React from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import "./dashboard.scss";

function Home() {
  const months = ["1", "2", "3", "4", "5", "6"];
  return (
    <div id="dashboard-container">
      <div id="dashboard-main-headings">
        <h1 id="dashboard-shop-name">shop name</h1>
        <h1 id="dashboard-main-heading">Dashboard</h1>
      </div>
      <div id="dashboard-options">
        <div id="graph">
          <LineChart
            xAxis={[{ scaleType: "point", data: months }]}
            series={[{ data: [15, 20, 10, 30, 25, 18] }]}
            height={250}
          />
        </div>
        <div id="todays-profit"> today sales 456789</div>
        <div id="total-products">total 23423423</div>
        <div id="total-catagories">catagory 43242354</div>
        <div id="todo-list">
          <div id="one-todo">todo fd</div>
          <div id="two-todo">todo cds</div>
          <div id="three-todo">todo cds</div>
        </div>
        <div id="previous-day-sales">previous day sales 23456789</div>
      </div>
    </div>
  );
}

export default Home;
