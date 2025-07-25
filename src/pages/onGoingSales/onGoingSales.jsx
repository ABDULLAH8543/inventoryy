// src/pages/onGoingSales/Ongoing.jsx
import React, { useEffect, useState } from "react";
import "./ongoingSales.scss"; // optional styling file

function Ongoing() {
  const [soldItems, setSoldItems] = useState([]);

  useEffect(() => {
    const today = new Date().toLocaleDateString("en-GB");
    const stored = JSON.parse(localStorage.getItem("sold") || "[]");
    const todaysSales = stored.filter((item) => item.date === today);
    setSoldItems(todaysSales);
  }, []);

  return (
    <div id="ongoing-sales-outer">
      <h2>Ongoing Sales (Today)</h2>
      {soldItems.length === 0 ? (
        <p>No products sold yet today.</p>
      ) : (
        soldItems.map((item, idx) => (
          <div id="ongoing-sales-card" key={idx}>
            <p>
              <strong>Name:</strong> {item.name}
            </p>
            <p>
              <strong>Category:</strong> {item.category}
            </p>
            <p>
              <strong>Size:</strong> {item.size}
            </p>
            <p>
              <strong>Quantity Sold:</strong> {item.quantity}
            </p>
            <p>
              <strong>Price Per Piece:</strong> {item.pricePerPiece}
            </p>
            <p>
              <strong>Selling Price Per Piece:</strong> {item.sellingPrice}
            </p>
            <p>
              <strong>Revenue (Profit):</strong> {item.revenue}
            </p>
            <p>
              <strong>Date:</strong> {item.date}
            </p>
          </div>
        ))
      )}
    </div>
  );
}

export default Ongoing;
