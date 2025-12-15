import { Outlet, Link } from "react-router-dom";
import { Bell, ShoppingCart, User, LogOut } from "lucide-react";
import { UseCart } from "../context/UseCart";
import { useAuth } from "../hooks/useAuth";
import { useState } from "react";
import LoginModal from "../components/LoginModal";
import SignUpModal from "../components/SignUpModal";
import Profile from "../pages/Profile";

export default function AppLayout() {
  const { cartItems } = UseCart();
  const { currentUser, logout } = useAuth();

  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col  transition-colors bg-gray-100">
      {/* Top Header */}
      <div className="bg-gray-900 text-white py-2 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link to="/" className="text-xl font-bold">
            TBE STORE
          </Link>

          <div className="flex items-center gap-6">
            {currentUser ? (
              <div className="flex items-center gap-4">
                <button onClick={logout} className="hover:text-gray-300">
                  <LogOut size={20} />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowLogin(true)}
                className="hover:text-gray-300 transition-colors"
              >
                Sign up or Log in
              </button>
            )}

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

              <Link
                to="/profile"
                className="relative hover:text-gray-300 transition-colors"
              >
                {currentUser && currentUser.avatar ? (
                  <img
                    src={currentUser.avatar}
                    alt={`${currentUser.name}'s avatar`}
                    className="w-8 h-8 rounded-full object-cover border-2 border-white transition-opacity hover:opacity-80"
                  />
                ) : (
                  <User size={24} />
                )}
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-900 shadow-md py-4 px-4">
        <div className="max-w-7xl mx-auto flex justify-center">
          <div className="flex w-full max-w-3xl">
            <select className="border border-gray-300  rounded-l-md px-4 py-2  bg-white text-gray-900 font-normal textfocus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>All Categories</option>
              <option>Electronics</option>
              <option>Fashion</option>
              <option>Home</option>
            </select>
            <input
              type="text"
              placeholder="Search for anything..."
              className="flex-1 border-t border-b  px-4 py-2 text-gray-900 font-normal bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="bg-blue-500 text-white px-8 py-2 rounded-r-md hover:bg-blue-700 transition-colors">
              Search
            </button>
          </div>
        </div>
      </div>

      <nav className="bg-gray-900  py-3 px-4 border-b">
        <div className="max-w-7xl mx-auto flex gap-6">
          <Link
            to="/"
            className=" text-white hover:text-blue-400 transition-colors"
          >
            Home
          </Link>
          <Link
            to="/shop"
            className="text-white hover:text-blue-400 transition-colors"
          >
            Shop
          </Link>
          <Link
            to="/deals"
            className="hover:text-blue-400 text-white transition-colors"
          >
            Deals
          </Link>
          <Link
            to="/about"
            className="text-white hover:text-blue-400 transition-colors"
          >
            About
          </Link>
          <Link
            to="/contact"
            className="text-white hover:text-blue-400 transition-colors"
          >
            Contact
          </Link>
        </div>
      </nav>

      <main className="flex-1">
        <Outlet />
      </main>

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

      {showLogin && (
        <LoginModal
          onClose={() => setShowLogin(false)}
          switchToSignup={() => {
            setShowLogin(false);
            setShowSignup(true);
          }}
        />
      )}

      {showSignup && (
        <SignUpModal
          onClose={() => setShowSignup(false)}
          switchToLogin={() => {
            setShowSignup(false);
            setShowLogin(true);
          }}
        />
      )}
    </div>
  );
}
