# TBE Store

A modern, full-featured e-commerce web application built with React and Tailwind CSS, showcasing frontend development essentials.

## About

This project demonstrates comprehensive frontend development capabilities through a fully functional shopping cart and e-commerce platform. Built as part of Chingu's Tier 1 Solo Project requirements, it showcases modern React patterns, state management, and responsive design principles.

## Features

### 🛒 Shopping Experience

- **Product Browsing**: Browse 200+ products with detailed information
- **Advanced Search**: Real-time search across product names, descriptions, and brands
- **Smart Filtering**: Filter by category, price range, and ratings
- **Product Details**: Comprehensive product pages with image galleries, specifications, and reviews
- **Shopping Cart**: Full cart management with quantity adjustments and real-time totals
- **Deals Section**: Dynamic flash deals with countdown timers and discount badges

### User Features

- **Authentication System**: Complete user registration and login
- **User Profiles**: Customizable profiles with avatar selection
- **Payment Management**: Add and manage multiple payment methods
- **Shipping Addresses**: Save and edit shipping information
- **Order Tracking**: View order history with status tracking

### UI/UX

- **Responsive Design**: Fully responsive across desktop, tablet, and mobile devices
- **Sticky Navigation**: Persistent header with search and quick access
- **View Modes**: Toggle between grid and list product views
- **Real-time Notifications**: Cart updates and order status notifications
- **Loading States**: Smooth loading animations and error handling

### Technical Features

- **Context API**: Global state management for cart and authentication
- **React Router**: Client-side routing with dynamic parameters
- **Custom Hooks**: Reusable hooks for API calls and cart management
- **API Integration**: Integration with DummyJSON API for product data
- **Optimized Performance**: Lazy loading and efficient re-renders
- **Component Architecture**: Modular, reusable component structure

## 🚀 Tech Stack

- **Framework**: React 19
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **API**: DummyJSON (Product Data)
- **State Management**: React Context API
- **Build Tool**: Vite

## Project Structure

```
tbe-store/
├── src/
│   ├── api/                    # API integration layer
│   │   └── products.jsx        # Product fetching hook
│   ├── components/             # Reusable components
│   │   ├── ProductCard.jsx     # Product display card
│   │   ├── NotificationPanel.jsx
│   │   ├── LoginModal.jsx
│   │   ├── SignUpModal.jsx
│   │   └── Products.jsx
│   ├── context/                # Context providers
│   │   ├── CartProvider.jsx    # Shopping cart state
│   │   ├── AuthProvider.jsx    # User authentication
│   │   ├── index.jsx
│   │   └── UseCart.jsx         # Cart hook
│   ├── hooks/                  # Custom React hooks
│   │   ├── useAuth.js          # Authentication hook
│   │   └── useCategoryProducts.jsx
│   ├── layout/                 # Layout components
│   │   └── AppLayout.jsx       # Main app layout
│   ├── pages/                  # Route pages
│   │   ├── Home.jsx            # Landing page
│   │   ├── Shop.jsx            # Product listing
│   │   ├── ProductDetails.jsx  # Product detail view
│   │   ├── Cart.jsx            # Shopping cart
│   │   ├── Checkout.jsx        # Checkout process
│   │   ├── Deals.jsx           # Deals page
│   │   ├── Profile.jsx         # User profile
│   │   ├── About.jsx           # About page
│   │   ├── ErrorPage.jsx       # Error handling page
│   │   └── Contact.jsx         # Contact page
│   ├── main.jsx                # React render
│   └── App.jsx                 # Root component with routing
```

## Installation & Setup

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Steps

1. **Clone the repository**

   ```bash
   git clone https://github.com/Pietrols/TBE---Store.git
   cd tbe-store
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   ```
   Navigate to http://localhost:5173
   ```

## Key Learning Outcomes

This project demonstrates proficiency in:

- **React Fundamentals**: Components, props, state, hooks, and lifecycle
- **State Management**: Context API for global state
- **Routing**: Dynamic routing with React Router
- **API Integration**: Fetching and managing external data
- **Form Handling**: User input validation and management
- **Responsive Design**: Mobile-first approach with Tailwind
- **Component Architecture**: Reusable and maintainable code structure
- **Error Handling**: Graceful error states and user feedback
- **Performance Optimization**: Efficient rendering and data management

### Home Page

Modern landing page with featured products and categories

### Shop Page

Advanced filtering and sorting with grid/list view options

### Product Details

Comprehensive product information with image gallery and add to cart

### Shopping Cart

Full cart management with quantity controls and checkout flow

## Future Enhancements

- [ ] Add product reviews and ratings system
- [ ] Implement wishlist functionality
- [ ] Add order confirmation emails
- [ ] Integrate payment gateway (Stripe/PayPal)
- [ ] Add product comparison feature
- [ ] Implement admin dashboard
- [ ] Add real-time inventory management
- [ ] Create recommendation engine
- [ ] Add social sharing features
- [ ] Implement PWA features for offline access

## Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/Pietrols/TBE---Store/issues).

## 👨‍💻 Author

**Peter Kabamba**

- GitHub: [@pietrols](https://github.com/Pietrols)

## 🙏 Acknowledgments

- [Chingu](https://chingu.io) for the project inspiration
- [DummyJSON](https://dummyjson.com) for the product API
- [Tailwind CSS](https://tailwindcss.com) for the styling framework
- [Lucide](https://lucide.dev) for the icon set

---

**Built with ❤️ and React**
