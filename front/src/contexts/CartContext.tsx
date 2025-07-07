import { createContext, useState, ReactNode, useEffect } from "react";
import { Car } from "../models";

type CartItem = Car & { quantity: number };

type CartContextType = {
  cartItems: CartItem[];
  addToCart: (car: Car) => void;
  removeFromCart: (vin: string) => void;
  clearCart: () => void;
};

export const CartContext = createContext<CartContextType | undefined>(
  undefined
);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem("carpark_cart");
    return saved ? JSON.parse(saved) : [];
  });

  function addToCart(car: Car) {
    setCartItems((prevItems) => {
      const existing = prevItems.find((item) => item.vin === car.vin);
      if (existing) {
        return prevItems.map((item) =>
          item.vin === car.vin ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevItems, { ...car, quantity: 1 }];
      }
    });
  }

  function removeFromCart(vin: string) {
    setCartItems((prevItems) => prevItems.filter((item) => item.vin !== vin));
  }

  function clearCart() {
    setCartItems([]);
  }
  useEffect(() => {
    localStorage.setItem("carpark_cart", JSON.stringify(cartItems));
  }, [cartItems]);
  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}
