import { useState } from "react";
import UseProducts from "../api/products.jsx";
import { UseCart } from "../context/UseCart.jsx";

export default function Products() {
  const { products, loading, error } = UseProducts();
  const { AddToCart } = UseCart(); // Fixed: directly use the hook, matching the case
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  if (loading) return <div>Loading products...</div>;
  if (error) return <div>Error loading products: {error}</div>; // Removed .message since error is already a string

  const categories = [
    "all",
    ...new Set(products.map((product) => product.category)),
  ];

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;
    const matchesSearch = product.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="page-container shop-page">
      <div className="filters-row">
        <div className="search-wrapper">
          <input
            type="text"
            className="search-input"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="categories">
          {categories.map(
            (
              category // Fixed: was 'categories' should be 'category'
            ) => (
              <button
                key={category}
                className={`category-button ${
                  selectedCategory === category ? "active" : ""
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            )
          )}
        </div>
      </div>

      <div className="products-grid">
        {filteredProducts.map((product) => (
          <div key={product.id} className="product-card">
            <div className="product-image">
              <img src={product.thumbnail} alt={product.title} />{" "}
              {/* Changed from .image to .thumbnail - check API response */}
            </div>
            <div className="product-details">
              <h3 className="product-title">{product.title}</h3>
              <p className="product-price">${product.price.toFixed(2)}</p>
              <button
                className="add-to-cart-button"
                onClick={() => AddToCart(product)} // Fixed: capital A
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
