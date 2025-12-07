import { UseCart } from "../context/UseCart";
import { Trash2, Plus, Minus } from "lucide-react";
import { Link } from "react-router-dom";

export default function Cart() {
  const {
    cartItems,
    incrementQuantity,
    decrementQuantity,
    removeFromCart,
    getCartTotal,
  } = UseCart();

  if (cartItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto py-10 text-center text-gray-600 text-xl">
        Your cart is empty
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      <div className="space-y-4">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex items-center bg-white shadow rounded-lg p-4"
          >
            {/* Product Image */}
            <img
              src={item.thumbnail}
              alt={item.title}
              className="w-20 h-20 object-cover rounded-md mr-4"
            />

            {/* Product Info */}
            <div className="flex-1">
              <h2 className="font-semibold text-lg">{item.title}</h2>
              <p className="text-gray-600">${item.price.toFixed(2)}</p>
            </div>

            {/* Quantity Controls */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => decrementQuantity(item.id)}
                className="p-2 rounded-md border hover:bg-gray-100 transition"
              >
                <Minus size={16} />
              </button>

              <span className="w-8 text-center font-semibold">
                {item.quantity}
              </span>

              <button
                onClick={() => incrementQuantity(item.id)}
                className="p-2 rounded-md border hover:bg-gray-100 transition"
              >
                <Plus size={16} />
              </button>
            </div>

            {/* Remove Button */}
            <button
              onClick={() => removeFromCart(item.id)}
              className="ml-4 text-red-500 hover:text-red-700 transition p-2"
            >
              <Trash2 size={20} />
            </button>
          </div>
        ))}
      </div>

      {/* Cart Total + Checkout */}
      <div className="mt-10 text-right">
        <h2 className="text-2xl font-bold mb-4">
          Total: ${getCartTotal().toFixed(2)}
        </h2>

        <Link
          to="/checkout"
          className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition"
        >
          Proceed to Checkout
        </Link>
      </div>
    </div>
  );
}
