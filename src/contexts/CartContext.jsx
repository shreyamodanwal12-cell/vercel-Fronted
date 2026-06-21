import { createContext, useContext, useEffect, useState } from 'react';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  // SAFE LOAD
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('ibid_cart');
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
    } catch (err) {
      console.log('Cart load error', err);
      setCart([]);
    }
  }, []);

  // SAFE SAVE
  useEffect(() => {
    try {
      localStorage.setItem('ibid_cart', JSON.stringify(cart));
    } catch (err) {
      console.log('Cart save error', err);
    }
  }, [cart]);

  const getId = (item) => item.id || item._id || item.slug;

  const addToCart = (book, quantity = 1) => {
    setCart((currentCart) => {
      const bookId = getId(book);

      const existingItem = currentCart.find(
        (item) => getId(item) === bookId
      );

      if (existingItem) {
        return currentCart.map((item) =>
          getId(item) === bookId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      return [...currentCart, { ...book, quantity }];
    });
  };

  const removeFromCart = (bookId) => {
    setCart((currentCart) =>
      currentCart.filter((item) => getId(item) !== bookId)
    );
  };

  const updateQuantity = (bookId, quantity) => {
    setCart((currentCart) =>
      currentCart.map((item) =>
        getId(item) === bookId
          ? { ...item, quantity: Math.max(1, quantity) }
          : item
      )
    );
  };

  const clearCart = () => setCart([]);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const subtotal = cart.reduce(
    (sum, item) => sum + (item.price || 0) * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        subtotal,
      }}
    >
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