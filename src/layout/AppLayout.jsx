import { Outlet, Link } from "react-router-dom";
import { Bell, ShoppingCart, User } from "lucide-react";
import { UseCart } from "../context/UseCart";

export default function AppLayout() {
  const { cartItems } = UseCart();
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Header */}
      <div className="bg-gray-900 text-white py-2 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link to="/" className="text-xl font-bold">
            TBE STORE
          </Link>

          <div className="flex items-center gap-6">
            <Link to="/auth" className="hover:text-gray-300 transition-colors">
              Sign up or Log in
            </Link>

            <div className="flex items-center gap-4">
              <button
                className="hover:text-gray-300 transition-colors"
                aria-label="Notifications"
              >
                <Bell size={20} />
              </button>

              <Link
                to="/cart"
                className="relative hover:text-gray-300 transition-colors"
              >
                <ShoppingCart size={20} />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>

              <button
                className="hover:text-gray-300 transition-colors"
                aria-label="Profile"
              >
                <User size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Search Header */}
      <div className="bg-white shadow-md py-4 px-4">
        <div className="max-w-7xl mx-auto flex justify-center">
          <div className="flex w-full max-w-3xl">
            <select className="border border-gray-300 rounded-l-md px-4 py-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>All Categories</option>
              <option>Electronics</option>
              <option>Fashion</option>
              <option>Home</option>
            </select>
            <input
              type="text"
              placeholder="Search for anything..."
              className="flex-1 border-t border-b border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="bg-blue-600 text-white px-8 py-2 rounded-r-md hover:bg-blue-700 transition-colors">
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="bg-gray-100 py-3 px-4 border-b">
        <div className="max-w-7xl mx-auto flex gap-6">
          <Link to="/" className="hover:text-blue-600 transition-colors">
            Home
          </Link>
          <Link to="/shop" className="hover:text-blue-600 transition-colors">
            Shop
          </Link>
          <Link to="/deals" className="hover:text-blue-600 transition-colors">
            Deals
          </Link>
          <Link to="/about" className="hover:text-blue-600 transition-colors">
            About
          </Link>
          <Link to="/contact" className="hover:text-blue-600 transition-colors">
            Contact
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 bg-gray-50">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">About TBE Store</h3>
            <p className="text-gray-400 text-sm">
              Your one-stop shop for everything tech and more.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link to="/shop" className="hover:text-white">
                  Shop
                </Link>
              </li>
              <li>
                <Link to="/deals" className="hover:text-white">
                  Deals
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white">
                  About
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Customer Service</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link to="/contact" className="hover:text-white">
                  Contact Us
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Returns
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  FAQ
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Follow Us</h3>
            <p className="text-gray-400 text-sm">
              Stay connected on social media
            </p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-8 pt-8 border-t border-gray-800 text-center text-gray-400 text-sm">
          <p>&copy; 2025 TBE Store. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
