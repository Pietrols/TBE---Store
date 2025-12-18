import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  ShoppingCart,
  Heart,
  Star,
  Truck,
  Shield,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  Check,
  Minus,
  Plus,
} from "lucide-react";
import { UseCart } from "../context/UseCart";
import ProductCard from "../components/ProductCard";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = UseCart();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  // Fetch product details
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://dummyjson.com/products/${id}`);

        if (!response.ok) {
          throw new Error("Product not found");
        }

        const data = await response.json();
        setProduct(data);
        setError(null);

        // Fetch related products from the same category
        if (data.category) {
          const relatedResponse = await fetch(
            `https://dummyjson.com/products/category/${data.category}?limit=8`
          );
          const relatedData = await relatedResponse.json();
          // Filter out the current product
          setRelatedProducts(
            relatedData.products.filter((p) => p.id !== parseInt(id))
          );
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
    window.scrollTo(0, 0);
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      setAddedToCart(true);
      setTimeout(() => setAddedToCart(false), 2000);
    }
  };

  const handleQuantityChange = (delta) => {
    setQuantity((prev) => Math.max(1, Math.min(prev + delta, product.stock)));
  };

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setSelectedImage(
      (prev) => (prev - 1 + product.images.length) % product.images.length
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading product...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Product Not Found
          </h2>
          <p className="text-gray-600 mb-6">{error || "Product not found"}</p>
          <button
            onClick={() => navigate("/shop")}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            Back to Shop
          </button>
        </div>
      </div>
    );
  }

  const discountedPrice = (
    product.price *
    (1 - product.discountPercentage / 100)
  ).toFixed(2);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-600 mb-6">
          <Link to="/" className="hover:text-blue-600">
            Home
          </Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-blue-600">
            Shop
          </Link>
          <span>/</span>
          <span className="text-gray-900 capitalize">{product.category}</span>
          <span>/</span>
          <span className="text-gray-400 truncate max-w-xs">
            {product.title}
          </span>
        </nav>

        {/* Product Main Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Image Gallery */}
            <div>
              <div className="relative mb-4 bg-gray-100 rounded-xl overflow-hidden aspect-square">
                <img
                  src={product.images[selectedImage]}
                  alt={product.title}
                  className="w-full h-full object-contain"
                />

                {product.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-colors"
                    >
                      <ChevronLeft size={24} />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-colors"
                    >
                      <ChevronRight size={24} />
                    </button>
                  </>
                )}

                {product.discountPercentage > 0 && (
                  <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    -{product.discountPercentage.toFixed(0)}% OFF
                  </div>
                )}
              </div>

              {/* Thumbnail Gallery */}
              {product.images.length > 1 && (
                <div className="grid grid-cols-4 gap-3">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                        selectedImage === idx
                          ? "border-blue-600 ring-2 ring-blue-200"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <img
                        src={img}
                        alt={`${product.title} ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="flex flex-col">
              <div className="mb-4">
                <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium mb-3 capitalize">
                  {product.category}
                </span>
                <h1 className="text-3xl font-bold text-gray-900 mb-3">
                  {product.title}
                </h1>
                <p className="text-gray-600 mb-4">{product.description}</p>

                {/* Rating */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={20}
                        className={
                          i < Math.floor(product.rating)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }
                      />
                    ))}
                  </div>
                  <span className="text-gray-600">
                    {product.rating.toFixed(1)} ({product.reviews?.length || 0}{" "}
                    reviews)
                  </span>
                </div>

                {/* Brand */}
                {product.brand && (
                  <p className="text-gray-700 mb-4">
                    <span className="font-semibold">Brand:</span>{" "}
                    {product.brand}
                  </p>
                )}

                {/* Price */}
                <div className="mb-6">
                  <div className="flex items-baseline gap-3 mb-2">
                    <span className="text-4xl font-bold text-gray-900">
                      ${discountedPrice}
                    </span>
                    {product.discountPercentage > 0 && (
                      <span className="text-xl text-gray-400 line-through">
                        ${product.price.toFixed(2)}
                      </span>
                    )}
                  </div>
                  <p className="text-green-600 font-medium">
                    You save: $
                    {(product.price - parseFloat(discountedPrice)).toFixed(2)}
                  </p>
                </div>

                {/* Stock Status */}
                <div className="mb-6">
                  {product.stock > 0 ? (
                    <div className="flex items-center gap-2 text-green-600">
                      <Check size={20} />
                      <span className="font-medium">
                        In Stock ({product.stock} available)
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-red-600">
                      <span className="font-medium">Out of Stock</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Quantity and Add to Cart */}
              <div className="space-y-4 mt-auto">
                <div className="flex items-center gap-4">
                  <span className="font-medium text-gray-700">Quantity:</span>
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button
                      onClick={() => handleQuantityChange(-1)}
                      disabled={quantity <= 1}
                      className="p-3 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <Minus size={18} />
                    </button>
                    <span className="px-6 py-2 font-semibold min-w-[60px] text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => handleQuantityChange(1)}
                      disabled={quantity >= product.stock}
                      className="p-3 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <Plus size={18} />
                    </button>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={handleAddToCart}
                    disabled={product.stock === 0}
                    className={`flex-1 flex items-center justify-center gap-2 px-8 py-4 rounded-lg font-semibold transition-all ${
                      addedToCart
                        ? "bg-green-600 hover:bg-green-700"
                        : "bg-blue-600 hover:bg-blue-700"
                    } text-white disabled:bg-gray-400 disabled:cursor-not-allowed`}
                  >
                    {addedToCart ? (
                      <>
                        <Check size={20} />
                        Added to Cart
                      </>
                    ) : (
                      <>
                        <ShoppingCart size={20} />
                        Add to Cart
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => setIsFavorite(!isFavorite)}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      isFavorite
                        ? "bg-red-50 border-red-500 text-red-500"
                        : "border-gray-300 text-gray-600 hover:border-red-500 hover:text-red-500"
                    }`}
                  >
                    <Heart
                      size={24}
                      className={isFavorite ? "fill-current" : ""}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-md flex items-start gap-4">
            <div className="bg-blue-100 p-3 rounded-lg">
              <Truck className="text-blue-600" size={24} />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">
                Free Shipping
              </h3>
              <p className="text-sm text-gray-600">
                On orders over $50 or with Prime membership
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md flex items-start gap-4">
            <div className="bg-green-100 p-3 rounded-lg">
              <Shield className="text-green-600" size={24} />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">
                Secure Payment
              </h3>
              <p className="text-sm text-gray-600">
                100% secure payment with SSL encryption
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md flex items-start gap-4">
            <div className="bg-orange-100 p-3 rounded-lg">
              <RefreshCw className="text-orange-600" size={24} />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Easy Returns</h3>
              <p className="text-sm text-gray-600">
                30-day return policy for unused items
              </p>
            </div>
          </div>
        </div>

        {/* Product Details */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Product Details
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">
                Specifications
              </h3>
              <dl className="space-y-2">
                <div className="flex justify-between py-2 border-b">
                  <dt className="text-gray-600">Category</dt>
                  <dd className="font-medium capitalize">{product.category}</dd>
                </div>
                {product.brand && (
                  <div className="flex justify-between py-2 border-b">
                    <dt className="text-gray-600">Brand</dt>
                    <dd className="font-medium">{product.brand}</dd>
                  </div>
                )}
                <div className="flex justify-between py-2 border-b">
                  <dt className="text-gray-600">SKU</dt>
                  <dd className="font-medium">{product.sku}</dd>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <dt className="text-gray-600">Weight</dt>
                  <dd className="font-medium">
                    {product.weight || "N/A"} {product.weight ? "kg" : ""}
                  </dd>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <dt className="text-gray-600">Warranty</dt>
                  <dd className="font-medium">
                    {product.warrantyInformation || "N/A"}
                  </dd>
                </div>
              </dl>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">
                Shipping & Returns
              </h3>
              <dl className="space-y-2">
                <div className="flex justify-between py-2 border-b">
                  <dt className="text-gray-600">Shipping Info</dt>
                  <dd className="font-medium text-right">
                    {product.shippingInformation || "Standard Shipping"}
                  </dd>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <dt className="text-gray-600">Return Policy</dt>
                  <dd className="font-medium text-right">
                    {product.returnPolicy || "30 days"}
                  </dd>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <dt className="text-gray-600">Availability</dt>
                  <dd className="font-medium">
                    {product.availabilityStatus || "In Stock"}
                  </dd>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <dt className="text-gray-600">Minimum Order</dt>
                  <dd className="font-medium">
                    {product.minimumOrderQuantity || 1}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              You May Also Like
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {relatedProducts.slice(0, 4).map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
