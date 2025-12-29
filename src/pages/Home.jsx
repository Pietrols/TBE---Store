import { Link } from "react-router-dom";
import { useState } from "react";
import useCategoryProducts from "../hooks/useCategoryProducts.jsx";
import ProductCard from "../components/ProductCard.jsx";
import SignUpModal from "../components/SignUpModal.jsx";
import { Zap, ShoppingBag, TrendingUp, Star } from "lucide-react";

export default function Home() {
  const [showSignUp, setShowSignUp] = useState(false);

  // Fetch different categories
  const { products: techProducts } = useCategoryProducts("laptops", 4);
  const { products: trendingProducts } = useCategoryProducts("motorcycle", 10);
  const { products: dealProducts } = useCategoryProducts("mens-shoes", 4);

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
      {/* Hero Section - Premium Banner */}
      <section className="relative bg-linear-to-r from-blue-600 via-blue-500 to-cyan-500 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-300 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 z-10">
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm w-fit px-4 py-2 rounded-full">
                <Zap size={20} className="text-yellow-300" />
                <span className="text-sm font-semibold">
                  Limited Time Offers
                </span>
              </div>

              <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                Shop Smart, Live Better
              </h1>

              <p className="text-lg text-blue-100 max-w-lg">
                Discover thousands of premium products at unbeatable prices.
                From cutting-edge tech to lifestyle essentials, we have
                everything you need.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link
                  to="/shop"
                  className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-lg font-bold hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl"
                >
                  <ShoppingBag size={20} />
                  Shop Now
                </Link>
                <button
                  onClick={() => setShowSignUp(true)}
                  className="inline-flex items-center justify-center gap-2 bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-lg font-bold hover:bg-white/30 transition-all border border-white/30"
                >
                  Create Account
                </button>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-4 pt-8">
                <div>
                  <p className="text-3xl font-bold">10K+</p>
                  <p className="text-sm text-blue-100">Products</p>
                </div>
                <div>
                  <p className="text-3xl font-bold">50K+</p>
                  <p className="text-sm text-blue-100">Happy Customers</p>
                </div>
                <div>
                  <p className="text-3xl font-bold">99%</p>
                  <p className="text-sm text-blue-100">Satisfaction</p>
                </div>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative h-96 md:h-full min-h-96 z-10">
              <img
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=600&fit=crop"
                alt="Shopping"
                className="w-full h-full object-cover rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-6 shadow-xl max-w-xs">
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-green-100 p-2 rounded-full">
                    <TrendingUp className="text-green-600" size={20} />
                  </div>
                  <p className="font-semibold text-gray-900">Trending Now</p>
                </div>
                <p className="text-sm text-gray-600">
                  Up to 50% off on selected items
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Highlight Sections */}
      <section className="max-w-7xl mx-auto px-4 py-16 space-y-16">
        {/* Top Tech Section */}
        <div className="grid md:grid-cols-2 gap-8 items-center bg-white rounded-2xl p-8 shadow-md hover:shadow-lg transition-shadow">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-1 h-8 bg-linear-to-b from-purple-600 to-blue-600 rounded-full"></div>
              <h2 className="text-4xl font-bold text-gray-900">Top Tech</h2>
            </div>
            <p className="text-gray-600 text-lg max-w-md">
              Discover the latest gadgets and devices that will revolutionize
              your digital lifestyle.
            </p>
            <Link
              to="/shop?category=laptops"
              className="inline-flex items-center gap-2 bg-linear-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
            >
              Explore Tech →
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {techProducts.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>

        {/* Trending Products Carousel */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Star className="text-yellow-500" fill="currentColor" />
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                  Trending This Week
                </h2>
              </div>
              <p className="text-gray-600">
                Handpicked favorites loved by our community
              </p>
            </div>
            <Link
              to="/deals"
              className="text-blue-600 font-semibold hover:text-blue-700 hidden md:block"
            >
              View All →
            </Link>
          </div>

          <div className="flex gap-4 overflow-x-auto pb-4 snap-x">
            {trendingProducts.slice(0, 8).map((product) => (
              <div key={product.id} className="shrink-0 w-48 snap-start">
                <ProductCard product={product} circular={true} />
                <p className="text-center mt-2 text-sm font-medium truncate w-48">
                  {product.title}
                </p>
                <p className="text-center font-bold text-gray-600">
                  ${product.price}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Flash Deals Section */}
        <div className="relative bg-linear-to-r from-orange-500 via-red-500 to-pink-500 rounded-2xl p-8 md:p-12 text-white overflow-hidden shadow-lg">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          </div>

          <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <Zap className="text-yellow-300" size={32} />
                <h2 className="text-4xl md:text-5xl font-bold">Flash Deals</h2>
              </div>
              <p className="text-lg text-red-100 max-w-md">
                Limited stock, incredible savings. Don't miss out on these
                amazing offers!
              </p>
              <Link
                to="/deals"
                className="inline-flex items-center gap-2 bg-white text-red-600 px-8 py-4 rounded-lg font-bold hover:bg-red-50 transition-all shadow-lg"
              >
                View All Deals →
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {dealProducts.slice(0, 4).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>

        {/* Why Shop With Us */}
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-linear-to-br from-blue-50 to-blue-100 rounded-2xl p-8 border border-blue-200">
            <div className="bg-blue-600 w-14 h-14 rounded-full flex items-center justify-center mb-4">
              <ShoppingBag className="text-white" size={28} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Easy Shopping
            </h3>
            <p className="text-gray-700">
              Browse thousands of products with our intuitive search and filters
            </p>
          </div>

          <div className="bg-linear-to-br from-green-50 to-green-100 rounded-2xl p-8 border border-green-200">
            <div className="bg-green-600 w-14 h-14 rounded-full flex items-center justify-center mb-4">
              <Zap className="text-white" size={28} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Fast Checkout
            </h3>
            <p className="text-gray-700">
              Secure payment and quick delivery to your doorstep
            </p>
          </div>

          <div className="bg-linear-to-br from-purple-50 to-purple-100 rounded-2xl p-8 border border-purple-200">
            <div className="bg-purple-600 w-14 h-14 rounded-full flex items-center justify-center mb-4">
              <Star className="text-white" size={28} fill="white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Quality Guaranteed
            </h3>
            <p className="text-gray-700">
              All products verified with 30-day returns and support
            </p>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-linear-to-r from-slate-900 to-slate-800 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-4xl md:text-5xl font-bold">
            Ready to Start Shopping?
          </h2>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            Join thousands of satisfied customers and discover amazing products
            at unbeatable prices
          </p>
          <button
            onClick={() => setShowSignUp(true)}
            className="inline-flex items-center gap-2 bg-linear-to-r from-blue-600 to-cyan-600 text-white px-8 py-4 rounded-lg font-bold hover:shadow-xl transition-all"
          >
            Get Started Now
          </button>
        </div>
      </section>

      {/* Sign Up Modal */}
      {showSignUp && <SignUpModal onClose={() => setShowSignUp(false)} />}
    </div>
  );
}
