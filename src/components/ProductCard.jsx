import { Link } from "react-router-dom";
import { UseCart } from "../context/UseCart.jsx";
import { ShoppingCart } from "lucide-react";

export default function ProductCard({ product, circular = false }) {
  const { addToCart } = UseCart();

  const handleAddToCart = (e) => {
    e.preventDefault(); // Prevent navigation when clicking add to cart
    e.stopPropagation(); // Stop event from bubbling up
    addToCart(product);
  };

  return (
    <Link
      to={`/product/${product.id}`}
      className={`group block bg-white rounded-lg shadow-md hover:shadow-xl transition-all ${
        circular ? "w-40 h-40" : ""
      }`}
    >
      <div
        className={`relative ${
          circular ? "w-45 h-45" : "h-48"
        } overflow-hidden ${circular ? "rounded-full" : "rounded-t-lg"}`}
      >
        <img
          src={product.thumbnail}
          alt={product.title}
          className={`w-full h-full object-cover group-hover:scale-110 transition-transform duration-300`}
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
          <h3 className="font-semibold text-gray-800 truncate group-hover:text-blue-600 transition-colors">
            {product.title}
          </h3>
          <p className="text-sm text-gray-500 truncate mt-1">
            {product.brand || product.category}
          </p>
          <div className="flex items-center justify-between mt-2">
            <p className="text-xl font-bold text-gray-900">
              ${product.price.toFixed(2)}
            </p>
            {product.rating && (
              <div className="flex items-center">
                <span className="text-yellow-500 mr-1">★</span>
                <span className="text-sm text-gray-600">
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
