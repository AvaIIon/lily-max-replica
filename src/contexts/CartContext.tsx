import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '@/data/productData';

export interface CartItem {
  product: Product;
  quantity: number;
  selectedOptions?: Record<string, string>;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, quantity?: number, options?: Record<string, string>) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('bedsmart-cart');
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever items change
  useEffect(() => {
    localStorage.setItem('bedsmart-cart', JSON.stringify(items));
  }, [items]);

  const addToCart = (product: Product, quantity = 1, options?: Record<string, string>) => {
    setItems(prevItems => {
      const existingItem = prevItems.find(item => 
        item.product.handle === product.handle && 
        JSON.stringify(item.selectedOptions) === JSON.stringify(options)
      );

      if (existingItem) {
        return prevItems.map(item =>
          item.product.handle === product.handle && 
          JSON.stringify(item.selectedOptions) === JSON.stringify(options)
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prevItems, { product, quantity, selectedOptions: options }];
      }
    });
  };

  const removeFromCart = (productId: string) => {
    setItems(prevItems => prevItems.filter(item => item.product.handle !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setItems(prevItems =>
      prevItems.map(item =>
        item.product.handle === productId
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  const parsePrice = (priceString: string): number => {
    if (!priceString) return 0;
    // Remove currency symbols and non-numeric characters except decimal point
    const cleaned = priceString.replace(/[^\d.-]/g, '');
    return parseFloat(cleaned) || 0;
  };

  const getTotalPrice = () => {
    return items.reduce((total, item) => {
      const price = parsePrice(item.product.salePrice || item.product.price || '0');
      return total + (price * item.quantity);
    }, 0);
  };

  const value: CartContextType = {
    items,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};