import { useState } from "react";
import { useAuth } from "../hooks/useAuth.jsx";
import { useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  CreditCard,
  Camera,
  Save,
  LogOut,
  Trash2,
} from "lucide-react";

export default function Profile() {
  const { currentUser, updateProfile, logout } = useAuth();
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    name: currentUser?.name || "",
    email: currentUser?.email || "",
  });

  const [paymentMethods, setPaymentMethods] = useState(
    currentUser?.paymentMethods || []
  );

  const [newPayment, setNewPayment] = useState({
    type: "card",
    cardNumber: "",
    cardName: "",
    expiryDate: "",
  });

  const [shippingAddress, setShippingAddress] = useState({
    address: currentUser?.shippingAddress?.address || "",
    city: currentUser?.shippingAddress?.city || "",
    zipCode: currentUser?.shippingAddress?.zipCode || "",
    phone: currentUser?.shippingAddress?.phone || "",
  });

  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [showAddPayment, setShowAddPayment] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState(
    currentUser?.avatar || ""
  );

  // Avatar options using DiceBear API
  const avatarSeeds = [
    "felix",
    "aneka",
    "sophie",
    "patches",
    "princess",
    "missy",
    "dusty",
    "bubba",
    "trouble",
    "precious",
    "chloe",
    "sasha",
  ];

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-4">
            Please log in to view your profile
          </p>
          <button
            onClick={() => navigate("/")}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  const handleSaveProfile = (e) => {
    e.preventDefault();
    updateProfile({
      name: formData.name,
      email: formData.email,
      avatar: selectedAvatar,
      paymentMethods: paymentMethods,
      shippingAddress: shippingAddress,
    });
    setIsEditing(false);
    alert("Profile updated successfully!");
  };

  const handleSaveAddress = (e) => {
    e.preventDefault();
    updateProfile({
      shippingAddress: shippingAddress,
    });
    setIsEditingAddress(false);
    alert("Shipping address updated!");
  };

  const handleAddPayment = (e) => {
    e.preventDefault();
    const payment = {
      id: Date.now(),
      ...newPayment,
      lastFour: newPayment.cardNumber.slice(-4),
    };
    const updatedPayments = [...paymentMethods, payment];
    setPaymentMethods(updatedPayments);

    // Immediately persist to currentUser
    updateProfile({
      paymentMethods: updatedPayments,
    });

    setNewPayment({
      type: "card",
      cardNumber: "",
      cardName: "",
      expiryDate: "",
    });
    setShowAddPayment(false);
    alert("Payment method added successfully!");
  };

  const handleRemovePayment = (id) => {
    const updatedPayments = paymentMethods.filter((p) => p.id !== id);
    setPaymentMethods(updatedPayments);

    // Immediately persist to currentUser
    updateProfile({
      paymentMethods: updatedPayments,
    });
    alert("Payment method removed!");
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-200 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-linear-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <img
                src={selectedAvatar}
                alt="Avatar"
                className="w-24 h-24 rounded-full border-4 border-white shadow-lg"
              />
              <div>
                <h1 className="text-3xl font-bold">{currentUser.name}</h1>
                <p className="opacity-90">{currentUser.email}</p>
                <p className="text-sm opacity-75 mt-1">
                  Member since{" "}
                  {new Date(currentUser.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors"
            >
              <LogOut size={20} />
              Logout
            </button>
          </div>
        </div>

        {/* Profile Information */}
        <div className="bg-white border-gray-700 rounded-2xl p-8 shadow-lg mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-600 flex items-center gap-2">
              <User size={24} />
              Profile Information
            </h2>
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Edit Profile
              </button>
            )}
          </div>

          {isEditing ? (
            <form onSubmit={handleSaveProfile} className="space-y-6">
              {/* Avatar Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-3">
                  Choose Avatar
                </label>
                <div className="grid grid-cols-6 gap-4">
                  {avatarSeeds.map((seed) => {
                    const avatarUrl = `https://api.dicebear.com/7.x/bottts/svg?seed=${seed}`;
                    return (
                      <button
                        key={seed}
                        type="button"
                        onClick={() => setSelectedAvatar(avatarUrl)}
                        className={`relative rounded-full overflow-hidden border-4 transition-all ${
                          selectedAvatar === avatarUrl
                            ? "border-blue-600 scale-110"
                            : "border-gray-400 hover:border-blue-400"
                        }`}
                      >
                        <img
                          src={avatarUrl}
                          alt={seed}
                          className="w-full h-full"
                        />
                        {selectedAvatar === avatarUrl && (
                          <div className="absolute inset-0 bg-blue-600/20 flex items-center justify-center">
                            <Camera className="text-white" size={20} />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Buttons */}
              <div className="flex gap-4">
                <button
                  type="submit"
                  className="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                >
                  <Save size={20} />
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsEditing(false);
                    setFormData({
                      name: currentUser.name,
                      email: currentUser.email,
                    });
                    setSelectedAvatar(currentUser.avatar);
                  }}
                  className="flex-1 bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-white py-3 rounded-lg font-semibold hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-4 rounded-lg">
                <User className="text-blue-600" size={24} />
                <div>
                  <p className="text-sm text-gray-600">Name</p>
                  <p className="font-semibold text-gray-600">
                    {currentUser.name}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-lg">
                <Mail className="text-blue-600" size={24} />
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="font-semibold text-gray-600">
                    {currentUser.email}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Payment Methods */}
        <div className="bg-white border-gray-700 rounded-2xl p-8 shadow-lg mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-600 flex items-center gap-2">
              <CreditCard size={24} />
              Payment Methods
            </h2>
            <button
              onClick={() => setShowAddPayment(!showAddPayment)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              {showAddPayment ? "Cancel" : "Add Payment Method"}
            </button>
          </div>

          {/* Add Payment Form */}
          {showAddPayment && (
            <form
              onSubmit={handleAddPayment}
              className="mb-6 p-6 rounded-lg space-y-4"
            >
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Payment Type
                </label>
                <select
                  value={newPayment.type}
                  onChange={(e) =>
                    setNewPayment({ ...newPayment, type: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 text-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="card">Credit/Debit Card</option>
                  <option value="mobile">Mobile Money</option>
                  <option value="bank">Bank Account</option>
                </select>
              </div>

              {newPayment.type === "card" && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      Card Number
                    </label>
                    <input
                      type="text"
                      value={newPayment.cardNumber}
                      onChange={(e) =>
                        setNewPayment({
                          ...newPayment,
                          cardNumber: e.target.value,
                        })
                      }
                      placeholder="1234 5678 9012 3456"
                      maxLength="16"
                      className="w-full px-4 py-3 border border-gray-300 text-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      Cardholder Name
                    </label>
                    <input
                      type="text"
                      value={newPayment.cardName}
                      onChange={(e) =>
                        setNewPayment({
                          ...newPayment,
                          cardName: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 border border-gray-300 text-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      value={newPayment.expiryDate}
                      onChange={(e) =>
                        setNewPayment({
                          ...newPayment,
                          expiryDate: e.target.value,
                        })
                      }
                      placeholder="MM/YY"
                      maxLength="5"
                      className="w-full px-4 py-3 border border-gray-300 text-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </>
              )}

              <button
                type="submit"
                className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
              >
                Add Payment Method
              </button>
            </form>
          )}

          {/* Payment Methods List */}
          <div className="space-y-3">
            {paymentMethods.length === 0 ? (
              <p className="text-center text-gray-600 dark:text-gray-400 py-8">
                No payment methods added yet
              </p>
            ) : (
              paymentMethods.map((payment) => (
                <div
                  key={payment.id}
                  className="flex items-center justify-between p-4 bg-gray-50 text-gray-600 rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    <div className="bg-blue-100 p-3 rounded-lg">
                      <CreditCard className="text-blue-600" size={24} />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-600">
                        {payment.type === "card"
                          ? "Credit Card"
                          : payment.type === "mobile"
                          ? "Mobile Money"
                          : "Bank Account"}
                      </p>
                      {payment.type === "card" && (
                        <>
                          <p className="text-sm text-gray-600">
                            •••• {payment.lastFour}
                          </p>
                          <p className="text-sm text-gray-600">
                            {payment.cardName} • Expires {payment.expiryDate}
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => handleRemovePayment(payment.id)}
                    className="text-red-600 hover:text-red-700 p-2"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Shipping Address */}
        <div className="bg-white rounded-2xl p-8 shadow-lg mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-600 flex items-center gap-2">
              <Mail size={24} />
              Shipping Address
            </h2>
            {!isEditingAddress && (
              <button
                onClick={() => setIsEditingAddress(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Edit Address
              </button>
            )}
          </div>

          {isEditingAddress ? (
            <form onSubmit={handleSaveAddress} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Street Address
                </label>
                <input
                  type="text"
                  value={shippingAddress.address}
                  onChange={(e) =>
                    setShippingAddress({
                      ...shippingAddress,
                      address: e.target.value,
                    })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    value={shippingAddress.city}
                    onChange={(e) =>
                      setShippingAddress({
                        ...shippingAddress,
                        city: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    ZIP Code
                  </label>
                  <input
                    type="text"
                    value={shippingAddress.zipCode}
                    onChange={(e) =>
                      setShippingAddress({
                        ...shippingAddress,
                        zipCode: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={shippingAddress.phone}
                    onChange={(e) =>
                      setShippingAddress({
                        ...shippingAddress,
                        phone: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  className="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                >
                  Save Address
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsEditingAddress(false);
                    setShippingAddress(currentUser.shippingAddress || {});
                  }}
                  className="flex-1 bg-gray-300 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-2">
              {shippingAddress.address ? (
                <>
                  <p className="text-gray-700">{shippingAddress.address}</p>
                  <p className="text-gray-700">
                    {shippingAddress.city}, {shippingAddress.zipCode}
                  </p>
                  <p className="text-gray-700">{shippingAddress.phone}</p>
                </>
              ) : (
                <p className="text-gray-500">No shipping address added yet</p>
              )}
            </div>
          )}
        </div>

        {/* Danger Zone */}
        <div className="bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 rounded-2xl p-8 mt-8">
          <h3 className="text-xl font-bold text-red-600 mb-4">Danger Zone</h3>
          <p className="text-gray-600 mb-4">
            Once you delete your account, there is no going back. Please be
            certain.
          </p>
          <button
            onClick={() => {
              if (
                window.confirm(
                  "Are you sure you want to delete your account? This cannot be undone."
                )
              ) {
                logout();
                localStorage.removeItem("users");
                navigate("/");
                alert("Account deleted successfully");
              }
            }}
            className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors font-semibold"
          >
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}
