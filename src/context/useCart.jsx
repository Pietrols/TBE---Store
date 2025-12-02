import { useContext } from "react";
import { CartContext } from "./index.jsx";

export function UseCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
