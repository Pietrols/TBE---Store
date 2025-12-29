import { Link } from "react-router-dom";
import { UseCart } from "../context/UseCart.jsx";
import { ShoppingCart } from "lucide-react";

export default function ProductCard({ product, circular = false }) {
  const { addToCart } = UseCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <Link
      to={`/product/${product.id}`}
      className={`group block bg-white rounded-lg shadow-md hover:shadow-xl transition-all ${
        circular ? "w-35 h-35" : ""
      }`}
    >
      {/* Image Container - Shorter rectangular shape to fit text below */}
      <div
        className={`relative overflow-hidden transition-transform duration-300 ${
          circular
            ? "w-35 h-35 rounded-full"
            : "w-full aspect-square rounded-t-lg bg-gray-100"
        }`}
      >
        <img
          src={product.thumbnail || product.images?.[0]}
          alt={product.title}
          className="w-90% h-90% object-cover"
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/300?text=No+Image";
          }}
        />

        {/* Quick Add to Cart Button */}
        {!circular && (
          <button
            onClick={handleAddToCart}
            className="absolute bottom-2 right-2 bg-blue-600 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-blue-700 z-10"
            aria-label="Add to cart"
          >
            <ShoppingCart size={20} />
          </button>
        )}

        {/* Discount Badge */}
        {product.discountPercentage > 0 && !circular && (
          <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
            -{product.discountPercentage.toFixed(0)}% OFF
          </div>
        )}
      </div>

      {!circular && (
        <div className="p-4">
          <h3 className="font-semibold text-gray-800 truncate group-hover:text-blue-600 transition-colors text-sm md:text-base">
            {product.title}
          </h3>
          <p className="text-xs md:text-sm text-gray-500 truncate mt-1">
            {product.brand || product.category}
          </p>
          <div className="flex items-center justify-between mt-2">
            <p className="text-lg md:text-xl font-bold text-gray-900">
              ${product.price.toFixed(2)}
            </p>
            {product.rating && (
              <div className="flex items-center">
                <span className="text-yellow-500 mr-1">★</span>
                <span className="text-xs md:text-sm text-gray-600">
                  {product.rating.toFixed(1)}
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </Link>
  );
}
