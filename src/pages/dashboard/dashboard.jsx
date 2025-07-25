// import React, { useEffect, useState } from "react";
// import { LineChart } from "@mui/x-charts/LineChart";
// import { useNavigate } from "react-router-dom";
// import "./dashboard.scss";

// function Home() {
//   const Navigate = useNavigate();

//   const today = new Date();
//   const daysInMonth = today.getDate();
//   const dateLabels = Array.from({ length: daysInMonth }, (_, i) =>
//     (i + 1).toString()
//   );
//   const chartData = Array.from({ length: daysInMonth }, () =>
//     Math.floor(Math.random() * 100)
//   );

//   const [totalProducts, setTotalProducts] = useState(0);
//   const [totalCategories, setTotalCategories] = useState(0);

//   useEffect(() => {
//     const stored = JSON.parse(localStorage.getItem("products") || "[]");
//     setTotalProducts(stored.length);

//     const categorySet = new Set(
//       stored
//         .map((item) => item.category?.toLowerCase().trim())
//         .filter((cat) => cat)
//     );
//     setTotalCategories(categorySet.size);
//   }, []);

//   return (
//     <div id="dashboard-container">
//       <div id="dashboard-main-headings">
//         <h1 id="dashboard-shop-name">shop name</h1>
//         <h1 id="dashboard-main-heading">Dashboard</h1>
//       </div>

//       <div id="dashboard-options">
//         <div id="graph">
//           <div id="main-graph">
//             <LineChart
//               xAxis={[{ scaleType: "point", data: dateLabels }]}
//               series={[{ data: chartData, showMark: false }]}
//               height={250}
//               grid={{ horizontal: false, vertical: false }}
//             />
//           </div>
//         </div>

//         <div id="todays-profit" onClick={() => Navigate("/ongoing")}>
//           <p>Today Profit</p>784324329
//         </div>

//         <div id="total-products" onClick={() => Navigate("/ShowProducts")}>
//           <p>Total Products</p>
//           {totalProducts}
//         </div>

//         <div id="total-catagories" onClick={() => Navigate("/ShowProducts")}>
//           <p>Total Categories</p>
//           {totalCategories}
//         </div>

//         <div id="todo" onClick={() => Navigate("/toDo")}>
//           <p>Total To-do</p>43412
//         </div>

//         <div id="previous-day-sales" onClick={() => Navigate("/previousDay")}>
//           <p>Previous Day Sales</p>23456789
//         </div>

//         <div
//           id="previous-month-sales"
//           onClick={() => Navigate("/previousReport")}
//         >
//           <p>Previous months report</p>3
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Home;

import React, { useEffect, useState } from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import { useNavigate } from "react-router-dom";
import "./dashboard.scss";

function Home() {
  const navigate = useNavigate();

  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  const daysInMonth = new Date(
    today.getFullYear(),
    today.getMonth() + 1,
    0
  ).getDate();
  const dateLabels = Array.from({ length: daysInMonth }, (_, i) =>
    (i + 1).toString()
  );

  const [totalProducts, setTotalProducts] = useState(0);
  const [totalCategories, setTotalCategories] = useState(0);
  const [totalTodos, setTotalTodos] = useState(0);
  const [todayRevenue, setTodayRevenue] = useState(0);
  const [yesterdayRevenue, setYesterdayRevenue] = useState(0);
  const [dailyRevenueData, setDailyRevenueData] = useState([]);

  // Parse both ISO and DD/MM/YYYY date formats
  const parseDate = (rawDate) => {
    if (typeof rawDate !== "string") return null;
    if (rawDate.includes("T")) {
      return new Date(rawDate);
    }
    // e.g. "26/07/2025"
    const parts = rawDate.split("/");
    if (parts.length === 3) {
      const [day, month, year] = parts.map(Number);
      return new Date(year, month - 1, day);
    }
    return null;
  };

  const isSameDay = (date1, date2) =>
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate();

  useEffect(() => {
    const products = JSON.parse(localStorage.getItem("products") || "[]");
    const todos = JSON.parse(localStorage.getItem("todoTasks") || "[]");
    const soldItems = JSON.parse(localStorage.getItem("sold") || "[]");

    setTotalProducts(products.length);

    const categorySet = new Set(
      products
        .map((item) => item.category?.toLowerCase().trim())
        .filter(Boolean)
    );
    setTotalCategories(categorySet.size);
    setTotalTodos(todos.length);

    const revenueMap = new Map();
    let todayTotal = 0;
    let yesterdayTotal = 0;

    soldItems.forEach((item) => {
      const itemDate = parseDate(item.date);
      if (!itemDate || isNaN(itemDate.getTime())) return; // skip invalid

      const day = itemDate.getDate();

      const revenue =
        parseFloat(item.sellingPrice || 0) * parseFloat(item.quantity || 0);

      revenueMap.set(day, (revenueMap.get(day) || 0) + revenue);

      if (isSameDay(itemDate, today)) {
        todayTotal += revenue;
      }

      if (isSameDay(itemDate, yesterday)) {
        yesterdayTotal += revenue;
      }
    });

    const chartData = dateLabels.map(
      (label) => revenueMap.get(parseInt(label)) || 0
    );

    setTodayRevenue(todayTotal.toFixed(2));
    setYesterdayRevenue(yesterdayTotal.toFixed(2));
    setDailyRevenueData(chartData);
  }, []);

  return (
    <div id="dashboard-container">
      <div id="dashboard-main-headings">
        <h1 id="dashboard-shop-name">Shop Name</h1>
        <h1 id="dashboard-main-heading">Dashboard</h1>
      </div>

      <div id="dashboard-options">
        <div id="graph">
          <div id="main-graph">
            <LineChart
              xAxis={[{ scaleType: "point", data: dateLabels }]}
              series={[{ data: dailyRevenueData, showMark: false }]}
              height={250}
              grid={{ horizontal: false, vertical: false }}
            />
          </div>
        </div>

        <div id="todays-profit" onClick={() => navigate("/ongoing")}>
          <p>Today's Revenue</p>
          <span>{todayRevenue}</span>
        </div>

        <div id="previous-day-sales" onClick={() => navigate("/previousDay")}>
          <p>Yesterday's Revenue</p>
          <span>{yesterdayRevenue}</span>
        </div>

        <div id="total-products" onClick={() => navigate("/ShowProducts")}>
          <p>Total Products</p>
          <span>{totalProducts}</span>
        </div>

        <div id="total-catagories" onClick={() => navigate("/ShowProducts")}>
          <p>Total Categories</p>
          <span>{totalCategories}</span>
        </div>

        <div id="todo" onClick={() => navigate("/toDo")}>
          <p>Total To-Do</p>
          <span>{totalTodos}</span>
        </div>

        <div
          id="previous-month-sales"
          onClick={() => navigate("/previousReport")}
        >
          <p>Previous Month Report</p>
          <span>{dailyRevenueData.reduce((a, b) => a + b, 0).toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}

export default Home;
