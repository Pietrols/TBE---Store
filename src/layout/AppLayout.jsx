import { Outlet, Link } from "react-router-dom";

export default function AppLayout() {
  return (
    <>
      <header className="p-4 shadow">
        <nav className="flex gap-4">
          <Link to="/">Home</Link>
          <Link to="/shop">Shop</Link>
          <Link to="/deals">Deals</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/cart">Cart</Link>
          <Link to="/checkout">Checkout</Link>
        </nav>
      </header>

      <main className="p-4">
        <Outlet />
      </main>

      <footer className="p-4 shadow mt-4 text-center">
        <p>&copy; 2025 TBE Store. All rights reserved.</p>
      </footer>
    </>
  );
}
