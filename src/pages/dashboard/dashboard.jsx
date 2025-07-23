import React, { useEffect, useState } from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import { useNavigate } from "react-router-dom";
import "./dashboard.scss";

function Home() {
  const Navigate = useNavigate();

  const today = new Date();
  const daysInMonth = today.getDate();
  const dateLabels = Array.from({ length: daysInMonth }, (_, i) =>
    (i + 1).toString()
  );
  const chartData = Array.from({ length: daysInMonth }, () =>
    Math.floor(Math.random() * 100)
  );

  const [totalProducts, setTotalProducts] = useState(0);
  const [totalCategories, setTotalCategories] = useState(0);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("products") || "[]");
    setTotalProducts(stored.length);

    const categorySet = new Set(
      stored
        .map((item) => item.category?.toLowerCase().trim())
        .filter((cat) => cat)
    );
    setTotalCategories(categorySet.size);
  }, []);

  return (
    <div id="dashboard-container">
      <div id="dashboard-main-headings">
        <h1 id="dashboard-shop-name">shop name</h1>
        <h1 id="dashboard-main-heading">Dashboard</h1>
      </div>

      <div id="dashboard-options">
        <div id="graph">
          <div id="main-graph">
            <LineChart
              xAxis={[{ scaleType: "point", data: dateLabels }]}
              series={[{ data: chartData, showMark: false }]}
              height={250}
              grid={{ horizontal: false, vertical: false }}
            />
          </div>
        </div>

        <div id="todays-profit" onClick={() => Navigate("/ongoing")}>
          <p>Today Profit</p>784324329
        </div>

        <div id="total-products" onClick={() => Navigate("/ShowProducts")}>
          <p>Total Products</p>
          {totalProducts}
        </div>

        <div id="total-catagories" onClick={() => Navigate("/ShowProducts")}>
          <p>Total Categories</p>
          {totalCategories}
        </div>

        <div id="todo" onClick={() => Navigate("/toDo")}>
          <p>Total To-do</p>43412
        </div>

        <div id="previous-day-sales" onClick={() => Navigate("/previousDay")}>
          <p>Previous Day Sales</p>23456789
        </div>

        <div
          id="previous-month-sales"
          onClick={() => Navigate("/previousReport")}
        >
          <p>Previous months report</p>3
        </div>
      </div>
    </div>
  );
}

export default Home;
