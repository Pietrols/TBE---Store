/* eslint-disable no-undef */

import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { beforeEach, vi, describe, it, expect, afterEach } from "vitest";
import Products from "../components/Products.jsx";
import { CartProvider } from "../context/CartProvider.jsx";

// Wrapper component that provides all necessary context
const AllTheProviders = ({ children }) => {
  return (
    <BrowserRouter>
      <CartProvider>{children}</CartProvider>
    </BrowserRouter>
  );
};

describe("Products Component", () => {
  beforeEach(() => {
    // Mock fetch to return sample products
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            products: [
              {
                id: 1,
                title: "Product 1",
                price: 10.99,
                category: "electronics",
                thumbnail: "test-image-1.jpg",
              },
              {
                id: 2,
                title: "Product 2",
                price: 20.99,
                category: "clothing",
                thumbnail: "test-image-2.jpg",
              },
            ],
          }),
      })
    );
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders loading state initially", () => {
    render(<Products />, { wrapper: AllTheProviders });
    expect(screen.getByText(/loading products/i)).toBeInTheDocument();
  });

  it("renders products after fetching", async () => {
    render(<Products />, { wrapper: AllTheProviders });

    await waitFor(() => {
      expect(screen.getByText("Product 1")).toBeInTheDocument();
      expect(screen.getByText("Product 2")).toBeInTheDocument();
    });
  });
});
