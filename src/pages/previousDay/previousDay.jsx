// src/pages/previousDay/PreviousDay.jsx
import React, { useEffect, useState } from "react";
import "./previousDay.scss"; // Assuming you have a CSS file for styling

function PreviousDay() {
  const [soldItems, setSoldItems] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("sold") || "[]");

    // Get yesterday's date in dd/mm/yyyy format
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const formattedYesterday = yesterday.toLocaleDateString("en-GB"); // e.g., "22/07/2025"

    const previousDaySales = stored.filter(
      (item) => item.date === formattedYesterday
    );

    setSoldItems(previousDaySales);
  }, []);

  return (
    <div id="previous-day-sales-outer">
      <h2>Previous Day Sales</h2>
      {soldItems.length === 0 ? (
        <p>No products sold yesterday.</p>
      ) : (
        soldItems.map((item, idx) => (
          <div id="previous-day-sales-card" key={idx}>
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
              <strong>Selling Price:</strong> {item.sellingPrice}
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

export default PreviousDay;
