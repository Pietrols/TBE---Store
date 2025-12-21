import { Link } from "react-router-dom";
import { useState } from "react";
import useCategoryProducts from "../hooks/useCategoryProducts";
import ProductCard from "../components/ProductCard";
import SignUpModal from "../components/SignUpModal";

export default function Home() {
  const [showSignUp, setShowSignUp] = useState(false);

  // Fetch different categories
  const { products: techProducts } = useCategoryProducts("laptops", 4);
  const { products: trendingProducts } = useCategoryProducts("motorcycle", 10);
  const { products: dealProducts } = useCategoryProducts("mens-shoes", 4);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-12">
      {/* Hero Section - Top Tech */}
      <section className="bg-linear-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white shadow-xl">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl font-bold mb-4">Top Tech</h1>
            <p className="text-lg mb-6 opacity-90">
              Discover the latest and greatest in technology
            </p>
            <Link
              to="/shop"
              className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Shop Now
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {techProducts.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Shopping Made Easy */}
      <section className="bg-white rounded-2xl p-8 shadow-md">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4 text-gray-600">
              Shopping made easy
            </h2>
            <p className="text-gray-600 mb-6">
              Experience seamless online shopping with our user-friendly
              platform. Browse thousands of products, secure checkout, and fast
              delivery right to your door.
            </p>
            <button
              onClick={() => setShowSignUp(true)}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Start Now
            </button>
          </div>

          <div className="hidden md:block">
            <img
              src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500"
              alt="Shopping"
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Trending Products */}
      <section>
        <h2 className="text-3xl font-bold mb-6 text-gray-600">Trending</h2>
        <div className="flex gap-6 overflow-x-auto pb-4">
          {trendingProducts.slice(0, 6).map((product) => (
            <div key={product.id}>
              <ProductCard product={product} circular={true} />
              <p className="text-center mt-2 text-sm font-medium truncate w-40">
                {product.title}
              </p>
              <p className="text-center font-bold text-gray-600">
                ${product.price}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Best Deals */}
      <section className="bg-linear-to-r from-orange-500 to-red-500 rounded-2xl p-8 text-white shadow-xl">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">Best Deals</h2>
            <p className="text-lg mb-6 opacity-90">
              Don't miss out on our incredible offers!
            </p>
            <Link
              to="/deals"
              className="inline-block bg-white text-orange-600 px-8 py-3  rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Shop Now
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-4 ">
            {dealProducts.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Sign Up Modal */}
      {showSignUp && <SignUpModal onClose={() => setShowSignUp(false)} />}
    </div>
  );
}
