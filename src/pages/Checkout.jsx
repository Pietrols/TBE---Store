import { useState } from "react";
import { UseCart } from "../context/UseCart.jsx";
import { useAuth } from "../hooks/useAuth.jsx";
import { useNavigate } from "react-router-dom";
import { CreditCard, Smartphone, Building, CheckCircle } from "lucide-react";

export default function Checkout() {
  const { cartItems, getCartTotal, clearCart } = UseCart();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [orderComplete, setOrderComplete] = useState(false);

  const [shippingInfo, setShippingInfo] = useState({
    fullName: currentUser?.name || "",
    email: currentUser?.email || "",
    address: currentUser?.shippingAddress?.address || "",
    city: currentUser?.shippingAddress?.city || "",
    zipCode: currentUser?.shippingAddress?.zipCode || "",
    phone: currentUser?.shippingAddress?.phone || "",
  });

  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
  });

  const handleShippingSubmit = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();

    // Create order object
    const order = {
      id: Date.now(),
      date: new Date().toISOString(),
      items: cartItems,
      total: getCartTotal() + 10 + getCartTotal() * 0.1,
      status: "processing",
      shippingInfo: shippingInfo,
      paymentMethod: paymentMethod,
    };

    // Simulate payment processing
    setTimeout(() => {
      // Save order to localStorage
      if (currentUser) {
        const users = JSON.parse(localStorage.getItem("users") || "[]");
        const updatedUsers = users.map((user) => {
          if (user.id === currentUser.id) {
            return {
              ...user,
              orders: [...(user.orders || []), order],
              shippingAddress: {
                address: shippingInfo.address,
                city: shippingInfo.city,
                zipCode: shippingInfo.zipCode,
                phone: shippingInfo.phone,
              },
            };
          }
          return user;
        });
        localStorage.setItem("users", JSON.stringify(updatedUsers));
        localStorage.setItem(
          "currentUser",
          JSON.stringify(updatedUsers.find((u) => u.id === currentUser.id))
        );
      }

      setOrderComplete(true);
      clearCart();
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }, 1500);
  };

  if (cartItems.length === 0 && !orderComplete) {
    return (
      <div className="min-h-screen  flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-gray-600  mb-4">Your cart is empty</p>
          <button
            onClick={() => navigate("/shop")}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  if (orderComplete) {
    return (
      <div className="min-h-screen  flex items-center justify-center px-4">
        <div className="bg-white  rounded-2xl p-12 text-center max-w-md">
          <div className="flex justify-center mb-6">
            <div className="bg-green-100  p-4 rounded-full">
              <CheckCircle
                size={64}
                className="text-green-600 dark:text-green-300"
              />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gray-600  mb-4">
            Order Successful!
          </h2>
          <p className="text-gray-600  mb-6">
            Thank you for your purchase. Your order has been confirmed.
          </p>
          <p className="text-sm text-gray-500 ">Redirecting to home...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-200  py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-600 mb-8">Checkout</h1>

        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-center">
            <div className="flex items-center">
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full ${
                  step >= 1
                    ? "bg-blue-600 text-white"
                    : "bg-gray-300 text-gray-600"
                }`}
              >
                1
              </div>
              <div
                className={`w-32 h-1 ${
                  step >= 2 ? "bg-blue-600" : "bg-gray-300"
                }`}
              />
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full ${
                  step >= 2
                    ? "bg-blue-600 text-white"
                    : "bg-gray-300 text-gray-600"
                }`}
              >
                2
              </div>
            </div>
          </div>
          <div className="flex justify-center mt-2 gap-24">
            <span className="text-sm text-gray-600 ">Shipping</span>
            <span className="text-sm text-gray-600">Payment</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {step === 1 ? (
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h2 className="text-2xl font-bold mb-6 text-gray-600 ">
                  Shipping Information
                </h2>
                <form onSubmit={handleShippingSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-600  mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        required
                        value={shippingInfo.fullName}
                        onChange={(e) =>
                          setShippingInfo({
                            ...shippingInfo,
                            fullName: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600  mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        required
                        value={shippingInfo.email}
                        onChange={(e) =>
                          setShippingInfo({
                            ...shippingInfo,
                            email: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-600  mb-1">
                      Address
                    </label>
                    <input
                      type="text"
                      required
                      value={shippingInfo.address}
                      onChange={(e) =>
                        setShippingInfo({
                          ...shippingInfo,
                          address: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 border border-gray-300  rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">
                        City
                      </label>
                      <input
                        type="text"
                        required
                        value={shippingInfo.city}
                        onChange={(e) =>
                          setShippingInfo({
                            ...shippingInfo,
                            city: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600  mb-1">
                        ZIP Code
                      </label>
                      <input
                        type="text"
                        required
                        value={shippingInfo.zipCode}
                        onChange={(e) =>
                          setShippingInfo({
                            ...shippingInfo,
                            zipCode: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600  mb-1">
                        Phone
                      </label>
                      <input
                        type="tel"
                        required
                        value={shippingInfo.phone}
                        onChange={(e) =>
                          setShippingInfo({
                            ...shippingInfo,
                            phone: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors mt-6"
                  >
                    Continue to Payment
                  </button>
                </form>
              </div>
            ) : (
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h2 className="text-2xl font-bold mb-6 text-gray-600 ">
                  Payment Method
                </h2>

                {/* Payment Method Selection */}
                <div className="grid md:grid-cols-3 gap-4 mb-6">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("card")}
                    className={`p-4 border-2 rounded-lg flex flex-col items-center gap-2 transition-colors ${
                      paymentMethod === "card"
                        ? "border-blue-300 bg-blue-50 "
                        : "border-gray-300 "
                    }`}
                  >
                    <CreditCard size={32} />
                    <span className="font-medium ">Credit Card</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod("mobile")}
                    className={`p-4 border-2 rounded-lg flex flex-col items-center gap-2 transition-colors ${
                      paymentMethod === "mobile"
                        ? "border-blue-600 bg-blue-50 "
                        : "border-gray-300 "
                    }`}
                  >
                    <Smartphone size={32} />
                    <span className="font-medium ">Mobile Money</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod("bank")}
                    className={`p-4 border-2 rounded-lg flex flex-col items-center gap-2 transition-colors ${
                      paymentMethod === "bank"
                        ? "border-blue-600 bg-blue-50 "
                        : "border-gray-300 "
                    }`}
                  >
                    <Building size={32} />
                    <span className="font-medium ">Bank Transfer</span>
                  </button>
                </div>

                <form onSubmit={handlePaymentSubmit} className="space-y-4">
                  {paymentMethod === "card" && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                          Card Number
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="1234 5678 9012 3456"
                          value={paymentInfo.cardNumber}
                          onChange={(e) =>
                            setPaymentInfo({
                              ...paymentInfo,
                              cardNumber: e.target.value,
                            })
                          }
                          className="w-full px-4 py-3 border border-gray-300  rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-600  mb-1">
                          Cardholder Name
                        </label>
                        <input
                          type="text"
                          required
                          value={paymentInfo.cardName}
                          onChange={(e) =>
                            setPaymentInfo({
                              ...paymentInfo,
                              cardName: e.target.value,
                            })
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-600  mb-1">
                            Expiry Date
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="MM/YY"
                            value={paymentInfo.expiryDate}
                            onChange={(e) =>
                              setPaymentInfo({
                                ...paymentInfo,
                                expiryDate: e.target.value,
                              })
                            }
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-600  mb-1">
                            CVV
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="123"
                            value={paymentInfo.cvv}
                            onChange={(e) =>
                              setPaymentInfo({
                                ...paymentInfo,
                                cvv: e.target.value,
                              })
                            }
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      </div>
                    </>
                  )}

                  {paymentMethod === "mobile" && (
                    <div className="text-center py-8">
                      <Smartphone
                        size={64}
                        className="mx-auto mb-4 text-blue-600"
                      />
                      <p className="text-gray-600 dark:text-gray-400">
                        You will receive payment instructions via SMS
                      </p>
                    </div>
                  )}

                  {paymentMethod === "bank" && (
                    <div className="bg-gray-50  p-6 rounded-lg">
                      <h3 className="font-semibold mb-4 ">Bank Details:</h3>
                      <p className="text-sm text-gray-600  mb-2">
                        Bank: TBE Bank
                      </p>
                      <p className="text-sm text-gray-600  mb-2">
                        Account: 1234567890
                      </p>
                      <p className="text-sm text-gray-600 ">
                        Reference: Your Order ID
                      </p>
                    </div>
                  )}

                  <div className="flex gap-4 mt-6">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="flex-1 bg-gray-600  text-gray-100  py-3 rounded-lg font-semibold hover:bg-gray-400 transition-colors"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                    >
                      Place Order
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white  rounded-2xl p-6 shadow-lg sticky top-4">
              <h3 className="text-xl font-bold mb-4 text-gray-600 ">
                Order Summary
              </h3>
              <div className="space-y-3 mb-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-sm ">{item.title}</p>
                      <p className="text-sm text-gray-600 ">
                        ${item.price} x {item.quantity}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t  pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 ">Subtotal</span>
                  <span className="font-medium ">
                    ${getCartTotal().toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 ">Shipping</span>
                  <span className="font-medium ">$10.00</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 ">Tax</span>
                  <span className="font-medium ">
                    ${(getCartTotal() * 0.1).toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-lg font-bold pt-2 border-t dark:border-gray-700">
                  <span className="text-gray-900">Total</span>
                  <span className="text-blue-600 ">
                    ${(getCartTotal() + 10 + getCartTotal() * 0.1).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
