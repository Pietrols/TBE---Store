import { Store, Users, Award, Heart } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50 ">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6">About TBE Store</h1>
          <p className="text-xl opacity-90">
            Your trusted partner in online shopping since 2025
          </p>
        </div>
      </div>

      {/* Story Section */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-3xl font-bold mb-6 text-gray-700 ">
              Our Story
            </h2>
            <p className="text-gray-600  mb-4 leading-relaxed">
              TBE Store was founded with a simple mission: to make online
              shopping accessible, enjoyable, and trustworthy for everyone. We
              believe that shopping should be an experience, not just a
              transaction.
            </p>
            <p className="text-gray-600 leading-relaxed">
              From humble beginnings, we've grown into a platform that connects
              thousands of customers with quality products from around the
              world. Our commitment to excellence and customer satisfaction
              drives everything we do.
            </p>
          </div>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600"
              alt="Shopping"
              className="rounded-lg shadow-2xl"
            />
          </div>
        </div>

        {/* Values Section */}
        <div className="grid md:grid-cols-4 gap-8 mb-20">
          <div className="text-center">
            <div className="bg-blue-900 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Store size={40} className="text-blue-600 dark:text-blue-300" />
            </div>
            <h3 className="font-bold text-lg mb-2 ">Wide Selection</h3>
            <p className="text-gray-600 text-sm">
              Thousands of products across multiple categories
            </p>
          </div>

          <div className="text-center">
            <div className="bg-green-900 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users size={40} className="text-green-300" />
            </div>
            <h3 className="font-bold text-lg mb-2 ">Customer First</h3>
            <p className="text-gray-600 text-sm">
              Your satisfaction is our top priority
            </p>
          </div>

          <div className="text-center">
            <div className="bg-purple-900 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award size={40} className="text-purple-300" />
            </div>
            <h3 className="font-bold text-lg mb-2 ">Quality Assured</h3>
            <p className="text-gray-600 text-sm">
              Only the best products make it to our store
            </p>
          </div>

          <div className="text-center">
            <div className="bg-red-900 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart size={40} className="text-red-300" />
            </div>
            <h3 className="font-bold text-lg mb-2 ">Made with Love</h3>
            <p className="text-gray-600 text-sm">
              Every detail crafted with care
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-white">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold mb-2">10K+</div>
              <div className="text-lg opacity-90">Happy Customers</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">5K+</div>
              <div className="text-lg opacity-90">Products</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">99%</div>
              <div className="text-lg opacity-90">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
