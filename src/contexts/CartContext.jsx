import { createContext, useContext, useEffect, useState } from 'react';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('ibid_cart');
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
    } catch (error) {
      console.warn('Unable to load cart from localStorage', error);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('ibid_cart', JSON.stringify(cart));
    } catch (error) {
      console.warn('Unable to save cart to localStorage', error);
    }
  }, [cart]);

  const addToCart = (book, quantity = 1) => {
    setCart((currentCart) => {
      const existingItem = currentCart.find((item) => item.id === book.id);
      if (existingItem) {
        return currentCart.map((item) =>
          item.id === book.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }

      return [...currentCart, { ...book, quantity }];
    });
  };

  const removeFromCart = (bookId) => {
    setCart((currentCart) => currentCart.filter((item) => item.id !== bookId));
  };

  const updateQuantity = (bookId, quantity) => {
    setCart((currentCart) =>
      currentCart.map((item) =>
        item.id === bookId ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    );
  };

  const clearCart = () => setCart([]);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, cartCount, subtotal }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
