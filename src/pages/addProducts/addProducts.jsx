import React, { useEffect, useState } from "react";
import "./addProducts.scss";

function AddProduct() {
  const [formData, setFormData] = useState({
    name: "",
    quantity: "",
    totalPrice: "",
    category: "",
    size: "",
    pricePerPiece: "",
    sellingPrice: "",
  });

  const [categories, setCategories] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [showError, setShowError] = useState(false);

  // Load categories from localStorage
  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem("products") || "[]");
    const uniqueCategories = [
      ...new Set(
        storedProducts
          .map((p) => p.category?.toLowerCase().trim())
          .filter((cat) => cat)
      ),
    ];
    setCategories(uniqueCategories);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedData = { ...formData, [name]: value };

    const quantity = parseFloat(updatedData.quantity);
    const totalPrice = parseFloat(updatedData.totalPrice);

    if (!isNaN(quantity) && !isNaN(totalPrice) && quantity > 0) {
      updatedData.pricePerPiece = (totalPrice / quantity).toFixed(2);
    } else {
      updatedData.pricePerPiece = "";
    }

    setFormData(updatedData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, quantity, totalPrice, category, size, sellingPrice } =
      formData;

    if (
      !name ||
      !quantity ||
      !totalPrice ||
      !category ||
      !size ||
      !sellingPrice
    ) {
      setShowError(true);
      return;
    }

    setShowError(false);

    const existingProducts = JSON.parse(
      localStorage.getItem("products") || "[]"
    );
    localStorage.setItem(
      "products",
      JSON.stringify([...existingProducts, formData])
    );

    setFormData({
      name: "",
      quantity: "",
      totalPrice: "",
      category: "",
      size: "",
      pricePerPiece: "",
      sellingPrice: "",
    });

    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 1000);

    // Update categories after adding new product
    const updatedCategories = [
      ...new Set(
        [...existingProducts, formData]
          .map((p) => p.category?.toLowerCase().trim())
          .filter((cat) => cat)
      ),
    ];
    setCategories(updatedCategories);
  };

  return (
    <div className="add-outer-container">
      <div className="add-inner-container">
        <h1>Add Product</h1>
        <form id="add-product-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={formData.name}
            onChange={handleChange}
          />
          <input
            type="number"
            name="quantity"
            placeholder="Product Quantity"
            value={formData.quantity}
            onChange={handleChange}
            className="no-spinner"
          />
          <input
            type="number"
            name="totalPrice"
            placeholder="Total Price"
            value={formData.totalPrice}
            onChange={handleChange}
            className="no-spinner"
          />
          <input
            type="text"
            name="category"
            placeholder="Product Category"
            value={formData.category}
            onChange={handleChange}
            list="category-options"
          />
          <datalist id="category-options">
            {categories.map((cat, idx) => (
              <option key={idx} value={cat} />
            ))}
          </datalist>
          <input
            type="text"
            name="size"
            placeholder="Product Size"
            value={formData.size}
            onChange={handleChange}
          />
          <input
            type="text"
            name="pricePerPiece"
            placeholder="Price per piece"
            value={formData.pricePerPiece}
            readOnly
          />
          <input
            type="number"
            name="sellingPrice"
            placeholder="Selling Price per piece"
            value={formData.sellingPrice}
            onChange={handleChange}
            className="no-spinner"
          />

          {showError && <p className="form-error">Fill all the form fields</p>}

          <button type="submit">Add Product</button>
        </form>
      </div>

      {showNotification && (
        <div id="add-pro-notification">Product added successfully</div>
      )}
    </div>
  );
}

export default AddProduct;
