import { useState } from "react";
import { UseCart } from "../context/UseCart";
import { useAuth } from "../hooks/useAuth";
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

    const order = {
      id: Date.now(),
      date: new Date().toISOString(),
      items: cartItems,
      total: getCartTotal() + 10 + getCartTotal() * 0.1,
      status: "processing",
      shippingInfo: shippingInfo,
      paymentMethod: paymentMethod,
    };

    setTimeout(() => {
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
      <div>
        <div>
          <p>Your cart is empty</p>
          <button onClick={() => navigate("/shop")}>Continue Shopping</button>
        </div>
      </div>
    );
  }

  if (orderComplete) {
    return (
      <div>
        <div>
          <div>
            <div>
              <CheckCircle size={64} />
            </div>
          </div>
          <h2>Order Successful!</h2>
          <p>Thank you for your purchase. Your order has been confirmed.</p>
          <p>Redirecting to home...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div>
        <h1>Checkout</h1>

        {/* Progress Steps */}
        <div>
          <div>
            <div>
              <div>1</div>
              <div />
              <div>2</div>
            </div>
          </div>
          <div>
            <span>Shipping</span>
            <span>Payment</span>
          </div>
        </div>

        <div>
          {/* Main Content */}
          <div>
            {step === 1 ? (
              <div>
                <h2>Shipping Information</h2>
                <form onSubmit={handleShippingSubmit}>
                  <div>
                    <div>
                      <label>Full Name</label>
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
                      />
                    </div>
                    <div>
                      <label>Email</label>
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
                      />
                    </div>
                  </div>

                  <div>
                    <label>Address</label>
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
                    />
                  </div>

                  <div>
                    <div>
                      <label>City</label>
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
                      />
                    </div>
                    <div>
                      <label>ZIP Code</label>
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
                      />
                    </div>
                    <div>
                      <label>Phone</label>
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
                      />
                    </div>
                  </div>

                  <button type="submit">Continue to Payment</button>
                </form>
              </div>
            ) : (
              <div>
                <h2>Payment Method</h2>

                {/* Payment Method Selection */}
                <div>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("card")}
                  >
                    <CreditCard size={32} />
                    <span>Credit Card</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod("mobile")}
                  >
                    <Smartphone size={32} />
                    <span>Mobile Money</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod("bank")}
                  >
                    <Building size={32} />
                    <span>Bank Transfer</span>
                  </button>
                </div>

                <form onSubmit={handlePaymentSubmit}>
                  {paymentMethod === "card" && (
                    <>
                      <div>
                        <label>Card Number</label>
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
                        />
                      </div>

                      <div>
                        <label>Cardholder Name</label>
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
                        />
                      </div>

                      <div>
                        <div>
                          <label>Expiry Date</label>
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
                          />
                        </div>
                        <div>
                          <label>CVV</label>
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
                          />
                        </div>
                      </div>
                    </>
                  )}

                  {paymentMethod === "mobile" && (
                    <div>
                      <Smartphone size={64} />
                      <p>You will receive payment instructions via SMS</p>
                    </div>
                  )}

                  {paymentMethod === "bank" && (
                    <div>
                      <h3>Bank Details:</h3>
                      <p>Bank: TBE Bank</p>
                      <p>Account: 1234567890</p>
                      <p>Reference: Your Order ID</p>
                    </div>
                  )}

                  <div>
                    <button type="button" onClick={() => setStep(1)}>
                      Back
                    </button>
                    <button type="submit">Place Order</button>
                  </div>
                </form>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div>
            <div>
              <h3>Order Summary</h3>
              <div>
                {cartItems.map((item) => (
                  <div key={item.id}>
                    <img src={item.thumbnail} alt={item.title} />
                    <div>
                      <p>{item.title}</p>
                      <p>
                        ${item.price} x {item.quantity}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div>
                <div>
                  <span>Subtotal</span>
                  <span>${getCartTotal().toFixed(2)}</span>
                </div>
                <div>
                  <span>Shipping</span>
                  <span>$10.00</span>
                </div>
                <div>
                  <span>Tax</span>
                  <span>${(getCartTotal() * 0.1).toFixed(2)}</span>
                </div>
                <div>
                  <span>Total</span>
                  <span>
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
