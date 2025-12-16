import { X, ShoppingCart, Package } from "lucide-react";
import { UseCart } from "../context/UseCart";
import { useAuth } from "../hooks/useAuth";
import { Link } from "react-router-dom";

export default function NotificationPanel({ isOpen, onClose }) {
  const { cartItems } = UseCart();
  const { currentUser } = useAuth();

  if (!isOpen) return null;

  const orders = currentUser?.orders || [];

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0  bg-opacity-30 z-40" onClick={onClose} />

      {/* Panel */}
      <div className="fixed right-4 top-16 w-96 bg-white rounded-lg shadow-2xl z-50 max-h-[80vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="font-bold text-lg">Notifications</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto flex-1">
          {/* Cart Items Section */}
          <div className="p-4 border-b">
            <div className="flex items-center gap-2 mb-3">
              <ShoppingCart className="text-blue-600" size={20} />
              <h4 className="font-semibold">
                Items in Cart ({cartItems.length})
              </h4>
            </div>

            {cartItems.length === 0 ? (
              <p className="text-gray-500 text-sm">Your cart is empty</p>
            ) : (
              <div className="space-y-2">
                {cartItems.slice(0, 3).map((item) => (
                  <div key={item.id} className="flex gap-3 items-center">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">
                        {item.title}
                      </p>
                      <p className="text-xs text-gray-500">
                        ${item.price} x {item.quantity}
                      </p>
                    </div>
                  </div>
                ))}
                {cartItems.length > 3 && (
                  <p className="text-xs text-gray-500 text-center pt-2">
                    +{cartItems.length - 3} more items
                  </p>
                )}
                <Link
                  to="/cart"
                  onClick={onClose}
                  className="block text-center text-sm text-blue-600 hover:text-blue-700 font-medium mt-3"
                >
                  View Full Cart →
                </Link>
              </div>
            )}
          </div>

          {/* Orders Section */}
          {currentUser && (
            <div className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <Package className="text-green-600" size={20} />
                <h4 className="font-semibold">Recent Orders</h4>
              </div>

              {orders.length === 0 ? (
                <p className="text-gray-500 text-sm">No orders yet</p>
              ) : (
                <div className="space-y-3">
                  {orders.slice(0, 3).map((order) => (
                    <div key={order.id} className="border rounded-lg p-3">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="text-sm font-medium">
                            Order #{order.id}
                          </p>
                          <p className="text-xs text-gray-500">
                            {new Date(order.date).toLocaleDateString()}
                          </p>
                        </div>
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            order.status === "delivered"
                              ? "bg-green-100 text-green-700"
                              : order.status === "shipped"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {order.status}
                        </span>
                      </div>

                      {/* Progress Bar */}
                      <div className="mb-2">
                        <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                          <span>Processing</span>
                          <span>Shipped</span>
                          <span>Delivered</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full transition-all"
                            style={{
                              width:
                                order.status === "processing"
                                  ? "33%"
                                  : order.status === "shipped"
                                  ? "66%"
                                  : "100%",
                            }}
                          />
                        </div>
                      </div>

                      <p className="text-sm font-semibold">
                        ${order.total.toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
