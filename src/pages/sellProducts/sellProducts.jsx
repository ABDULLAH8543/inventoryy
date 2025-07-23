import React, { useEffect, useState } from "react";
import "../showProducts/showProducts.scss";

function ShowProducts() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchCategory, setSearchCategory] = useState("");
  const [searchName, setSearchName] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [formData, setFormData] = useState({ quantity: "" });
  const [showError, setShowError] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("products") || "[]");
    setProducts(stored);
    setFiltered([...stored].reverse());
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
    setFiltered([...filteredList].reverse());
  }, [searchCategory, searchName, products]);

  const totalValue = filtered.reduce((acc, p) => {
    const qty = parseFloat(p.quantity || 0);
    const price = parseFloat(p.pricePerPiece || 0);
    return acc + qty * price;
  }, 0);

  const handleEditClick = (index) => {
    const p = filtered[index];
    setEditIndex(index);
    setFormData({ quantity: p.quantity || "" });
    setShowError(false);
  };

  const handleChange = (e) => {
    setFormData({ quantity: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newQty = parseFloat(formData.quantity);

    if (isNaN(newQty) || newQty < 0) {
      setShowError(true);
      return;
    }

    const updatedProducts = [...products];
    const productToEdit = filtered[editIndex];

    const productIndex = products.findIndex(
      (p) =>
        p.name === productToEdit.name &&
        p.category === productToEdit.category &&
        p.size === productToEdit.size &&
        p.totalPrice === productToEdit.totalPrice &&
        p.quantity === productToEdit.quantity
    );

    if (productIndex === -1) return;

    const original = { ...products[productIndex] };
    const oldQty = parseFloat(original.quantity);
    const costPrice = parseFloat(original.pricePerPiece || 0);
    const sellingPrice = parseFloat(original.sellingPrice || 0);
    const soldQty = oldQty - newQty;

    if (soldQty > 0) {
      const soldEntry = {
        name: original.name,
        category: original.category,
        size: original.size,
        quantity: soldQty,
        pricePerPiece: costPrice,
        sellingPrice: sellingPrice,
        revenue: ((sellingPrice - costPrice) * soldQty).toFixed(2),
        date: new Date().toLocaleDateString("en-GB"),
      };

      const existingSold = JSON.parse(localStorage.getItem("sold") || "[]");
      localStorage.setItem(
        "sold",
        JSON.stringify([...existingSold, soldEntry])
      );
    }

    if (newQty === 0) {
      updatedProducts.splice(productIndex, 1);
    } else {
      original.quantity = newQty.toString();
      updatedProducts[productIndex] = original;
    }

    setProducts(updatedProducts);
    setFiltered([...updatedProducts].reverse());
    localStorage.setItem("products", JSON.stringify(updatedProducts));

    setEditIndex(null);
    setShowError(false);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 1500);
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
            <h4>Search by Category</h4>
            <select
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
            <h4>Search by Name</h4>
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
              const pricePerPiece = parseFloat(product.pricePerPiece || 0);
              const total = (quantity * pricePerPiece).toFixed(2);

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
                    <span className="highlight">{product.totalPrice}</span>
                  </p>
                  <p>
                    <strong>Price per Piece:</strong>{" "}
                    <span className="highlight">
                      {pricePerPiece.toFixed(2)}
                    </span>
                  </p>
                  <p>
                    <strong>Total Value:</strong>{" "}
                    <span className="highlight">{total}</span>
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
                    Sell
                  </button>
                </div>
              );
            })
          )}
        </div>

        {editIndex !== null && (
          <div id="show-pro-edit-form">
            <h2>Edit Quantity</h2>
            <form id="edit-product-form" onSubmit={handleSubmit}>
              <input
                type="number"
                name="quantity"
                placeholder="New Quantity"
                value={formData.quantity}
                onChange={handleChange}
                className="no-spinner"
              />
              {showError && (
                <p className="form-error">Enter valid quantity (0 or more)</p>
              )}
              <button type="submit">Update</button>
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

        {showNotification && <div id="add-pro-notification">Updated</div>}
      </div>
    </div>
  );
}

export default ShowProducts;
