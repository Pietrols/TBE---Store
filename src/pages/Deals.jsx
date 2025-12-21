import { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard.jsx";
import { Clock, Zap, TrendingUp, Percent } from "lucide-react";

export default function Deals() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59,
  });

  // Fetch products with discounts
  useEffect(() => {
    const fetchDeals = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://dummyjson.com/products?limit=100"
        );
        const data = await response.json();

        // Filter products with discounts and sort by discount percentage
        const dealsProducts = data.products
          .filter((p) => p.discountPercentage > 0)
          .sort((a, b) => b.discountPercentage - a.discountPercentage);

        setProducts(dealsProducts);
        setError(null);
      } catch {
        setError("Failed to load deals. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchDeals();
  }, []);

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { hours: prev.hours, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          return { hours: 23, minutes: 59, seconds: 59 }; // Reset
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading amazing deals...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-xl mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Categorize deals
  const flashDeals = products.filter((p) => p.discountPercentage >= 20);
  const todaysDeals = products.filter(
    (p) => p.discountPercentage >= 10 && p.discountPercentage < 20
  );
  const clearanceSale = products.filter(
    (p) => p.discountPercentage > 0 && p.discountPercentage < 10
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Hero Banner */}
        <div className="bg-linear-to-r from-red-600 via-orange-600 to-yellow-500 rounded-2xl p-8 mb-8 text-white shadow-xl">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Zap size={32} className="animate-pulse" />
              <h1 className="text-5xl font-bold">Flash Deals</h1>
              <Zap size={32} className="animate-pulse" />
            </div>
            <p className="text-xl mb-6 opacity-90">
              Limited time offers - Don't miss out!
            </p>

            {/* Countdown Timer */}
            <div className="flex items-center justify-center gap-4 bg-white/20 backdrop-blur-sm rounded-lg p-6 ">
              <Clock size={24} />
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <div className="text-3xl font-bold">
                    {String(timeLeft.hours).padStart(2, "0")}
                  </div>
                  <div className="text-sm opacity-75">Hours</div>
                </div>
                <div className="text-3xl">:</div>
                <div className="text-center">
                  <div className="text-3xl font-bold">
                    {String(timeLeft.minutes).padStart(2, "0")}
                  </div>
                  <div className="text-sm opacity-75">Minutes</div>
                </div>
                <div className="text-3xl">:</div>
                <div className="text-center">
                  <div className="text-3xl font-bold">
                    {String(timeLeft.seconds).padStart(2, "0")}
                  </div>
                  <div className="text-sm opacity-75">Seconds</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6 flex items-start gap-4">
            <div className="bg-red-100 p-3 rounded-lg">
              <Percent className="text-red-600" size={24} />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {flashDeals.length}
              </p>
              <p className="text-gray-600">Flash Deals (20%+ off)</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 flex items-start gap-4">
            <div className="bg-orange-100 p-3 rounded-lg">
              <TrendingUp className="text-orange-600" size={24} />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {todaysDeals.length}
              </p>
              <p className="text-gray-600">Today's Deals (10-20% off)</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 flex items-start gap-4">
            <div className="bg-blue-100 p-3 rounded-lg">
              <Zap className="text-blue-600" size={24} />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {products.length}
              </p>
              <p className="text-gray-600">Total Deals Available</p>
            </div>
          </div>
        </div>

        {/* Flash Deals (20%+ off) */}
        {flashDeals.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <Zap className="text-red-600" size={28} />
              <h2 className="text-3xl font-bold text-gray-900">
                Flash Deals - Up to 20% Off!
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {flashDeals.slice(0, 8).map((product) => (
                <div key={product.id} className="relative">
                  <div className="absolute -top-2 -right-2 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold z-10 shadow-lg">
                    -{product.discountPercentage.toFixed(0)}%
                  </div>
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Today's Deals (10-20% off) */}
        {todaysDeals.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <TrendingUp className="text-orange-600" size={28} />
              <h2 className="text-3xl font-bold text-gray-900">
                Today's Best Deals
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {todaysDeals.slice(0, 8).map((product) => (
                <div key={product.id} className="relative">
                  <div className="absolute -top-2 -right-2 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold z-10 shadow-lg">
                    -{product.discountPercentage.toFixed(0)}%
                  </div>
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Clearance Sale */}
        {clearanceSale.length > 0 && (
          <section>
            <div className="flex items-center gap-3 mb-6">
              <Percent className="text-blue-600" size={28} />
              <h2 className="text-3xl font-bold text-gray-900">
                Clearance Sale
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {clearanceSale.slice(0, 8).map((product) => (
                <div key={product.id} className="relative">
                  <div className="absolute -top-2 -right-2 bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-bold z-10 shadow-lg">
                    -{product.discountPercentage.toFixed(0)}%
                  </div>
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* All Deals */}
        <section className="mt-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            All Deals ({products.length})
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
