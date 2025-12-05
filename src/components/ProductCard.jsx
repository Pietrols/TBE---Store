import { Link } from "react-router-dom";
import { UseCart } from "../context/UseCart";
import { ShoppingCart } from "lucide-react";

export default function ProductCard({ product, circular = false }) {
  const { AddToCart } = UseCart();

  const handleAddToCart = (e) => {
    e.preventDefault(); // Prevent navigation if card is clickable
    AddToCart(product);
  };

  return (
    <Link
      to={`/product/${product.id}`}
      className={`group block bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow overflow-hidden ${
        circular ? "w-40 h-40" : ""
      }`}
    >
      <div
        className={`relative ${
          circular ? "w-40 h-40" : "h-48"
        } overflow-hidden`}
      >
        <img
          src={product.thumbnail}
          alt={product.title}
          className={`w-full h-full object-cover group-hover:scale-110 transition-transform duration-300 ${
            circular ? "rounded-full" : ""
          }`}
        />
        {/* Quick Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          className="absolute bottom-2 right-2 bg-blue-600 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-blue-700"
          aria-label="Add to cart"
        >
          <ShoppingCart size={20} />
        </button>
      </div>

      {!circular && (
        <div className="p-4">
          <h3 className="font-semibold text-gray-800 truncate group-hover:text-blue-600 transition-colors">
            {product.title}
          </h3>
          <p className="text-xl font-bold text-gray-900 mt-2">
            ${product.price.toFixed(2)}
          </p>
          {product.rating && (
            <div className="flex items-center mt-2">
              <span className="text-yellow-500">★</span>
              <span className="text-sm text-gray-600 ml-1">
                {product.rating}
              </span>
            </div>
          )}
        </div>
      )}
    </Link>
  );
}
