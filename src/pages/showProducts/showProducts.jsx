import React, { useEffect, useState } from "react";
import "./showProducts.scss";

function ShowProducts() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchCategory, setSearchCategory] = useState("");
  const [searchName, setSearchName] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    quantity: "",
    totalPrice: "",
    category: "",
    size: "",
    pricePerPiece: "",
    sellingPrice: "",
  });
  const [showError, setShowError] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("products") || "[]");
    setProducts(stored);
    setFiltered(stored);
    const uniqueCats = [
      ...new Set(stored.map((p) => p.category?.toLowerCase()).filter(Boolean)),
    ];
    setCategories(uniqueCats);
  }, []);

  useEffect(() => {
    const filteredList = products.filter((product) => {
      const matchCategory = searchCategory
        ? product.category?.toLowerCase() === searchCategory
        : true;
      const matchName = searchName
        ? product.name?.toLowerCase().includes(searchName.toLowerCase())
        : true;
      return matchCategory && matchName;
    });
    setFiltered(filteredList.reverse());
  }, [searchCategory, searchName, products]);

  const totalValue = filtered.reduce((acc, p) => {
    const qty = parseFloat(p.quantity?.toString().trim()) || 0;
    const unitPrice = parseFloat(p.pricePerPiece?.toString().trim()) || 0;
    return acc + qty * unitPrice;
  }, 0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let updatedData = { ...formData, [name]: value };

    if (editIndex !== null) {
      const quantity = parseFloat(updatedData.quantity);
      const totalPrice = parseFloat(updatedData.totalPrice);
      if (!isNaN(quantity) && !isNaN(totalPrice) && quantity > 0) {
        updatedData.pricePerPiece = (totalPrice / quantity).toFixed(2);
      }
    }

    setFormData(updatedData);
  };

  const handleEditClick = (index) => {
    setEditIndex(index);
    const p = filtered[index];
    setFormData({
      name: p.name || "",
      quantity: p.quantity || "",
      totalPrice: p.totalPrice || "",
      category: p.category || "",
      size: p.size || "",
      pricePerPiece: p.pricePerPiece || "",
      sellingPrice: p.sellingPrice || "",
    });
    setShowError(false);
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

    const updatedProducts = [...products];
    const productToEdit = filtered[editIndex];
    const originalIndex = products.findIndex(
      (p) =>
        p.name === productToEdit.name &&
        p.category === productToEdit.category &&
        p.size === productToEdit.size &&
        p.quantity === productToEdit.quantity &&
        p.totalPrice === productToEdit.totalPrice
    );

    if (originalIndex !== -1) {
      updatedProducts[originalIndex] = formData;
      setProducts(updatedProducts);
      setFiltered([...updatedProducts].reverse());
      localStorage.setItem("products", JSON.stringify(updatedProducts));
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 1500);
    }

    setEditIndex(null);
    setShowError(false);
  };

  const handleCancel = () => {
    setEditIndex(null);
    setShowError(false);
  };

  return (
    <div id="show-products-outer">
      <div id="show-product-inner">
        <div id="show-product-total">
          <h3>
            Total Products: <p>{filtered.length}</p>
          </h3>
          <h3>
            Total Categories: <p>{categories.length}</p>
          </h3>
          <h3>
            Total Value: <p>{totalValue.toFixed(2)}</p>
          </h3>
        </div>

        <div id="show-products-search">
          <div id="search-by-category">
            <h4>Search by categories</h4>
            <select
              name="categories"
              id="categories"
              value={searchCategory}
              onChange={(e) => setSearchCategory(e.target.value)}
            >
              <option value="">All</option>
              {categories.map((cat, idx) => (
                <option key={idx} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div id="search-by-name">
            <h4>Search by name</h4>
            <input
              type="text"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              placeholder="Enter product name"
            />
          </div>
        </div>

        <div id="show-products-list">
          {filtered.length === 0 ? (
            <p>No products found.</p>
          ) : (
            filtered.map((product, index) => {
              const quantity = parseFloat(product.quantity || 0);
              const totalPrice = parseFloat(product.totalPrice || 0);
              const pricePerPiece = product.pricePerPiece || "0.00";

              return (
                <div id="show-product-card" key={index}>
                  <p>
                    <strong>Name:</strong>{" "}
                    <span className="highlight">{product.name}</span>
                  </p>
                  <p>
                    <strong>Category:</strong>{" "}
                    <span className="highlight">{product.category}</span>
                  </p>
                  <p>
                    <strong>Quantity:</strong>{" "}
                    <span className="highlight">{product.quantity}</span>
                  </p>
                  <p>
                    <strong>Size:</strong>{" "}
                    <span className="highlight">{product.size}</span>
                  </p>
                  <p>
                    <strong>Total Spend:</strong>{" "}
                    <span className="highlight">{totalPrice}</span>
                  </p>
                  <p>
                    <strong>Price per Piece:</strong>{" "}
                    <span className="highlight">{pricePerPiece}</span>
                  </p>
                  <p>
                    <strong>Selling Price:</strong>{" "}
                    <span className="highlight">
                      {product.sellingPrice || "N/A"}
                    </span>
                  </p>
                  <button
                    id="show-pro-edit-btn"
                    onClick={() => handleEditClick(index)}
                  >
                    Edit
                  </button>
                </div>
              );
            })
          )}
        </div>

        {editIndex !== null && (
          <div id="show-pro-edit-form">
            <h2>Edit Product</h2>
            <form id="edit-product-form" onSubmit={handleSubmit}>
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
                placeholder="Total Spend"
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
              {showError && (
                <p className="form-error">Fill all the form fields</p>
              )}
              <button type="submit">Save Changes</button>
              <button
                type="button"
                onClick={handleCancel}
                style={{ marginTop: "10px" }}
              >
                Cancel
              </button>
            </form>
          </div>
        )}

        {showNotification && (
          <div id="add-pro-notification">Product updated</div>
        )}
      </div>
    </div>
  );
}

export default ShowProducts;
