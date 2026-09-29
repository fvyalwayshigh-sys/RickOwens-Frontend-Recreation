import { useEffect, useMemo, useState } from 'react';
import { CartContext, NotificationContext, WishlistContext } from './StoreState';

const readStoredItems = key => {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

export const StoreProvider = ({ children }) => {
  const [cart, setCart] = useState(() => readStoredItems('rick-owens-cart'));
  const [wishlist, setWishlist] = useState(() => readStoredItems('rick-owens-wishlist'));
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    localStorage.setItem('rick-owens-cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('rick-owens-wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const addToCart = product => {
    setCart(current => {
      const existing = current.find(item => item.id === product.id);
      if (existing) {
        return current.map(item => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item));
      }
      return [...current, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (productId, quantity) => {
    const nextQuantity = Math.max(1, Number(quantity) || 1);
    setCart(current => current.map(item => (item.id === productId ? { ...item, quantity: nextQuantity } : item)));
  };

  const removeFromCart = productId => {
    setCart(current => current.filter(item => item.id !== productId));
  };

  const addToWishlist = product => {
    if (wishlist.some(item => item.id === product.id)) return false;
    setWishlist(current => [...current, product]);
    setNotification({
      title: 'ADDED TO WISHLIST',
      productName: product.category,
      message: 'PLEASE CONSIDER TO LOGIN TO SAVE YOUR WISHLIST FOR THE NEXT SESSION',
      actionLabel: 'VIEW',
      actionTo: '/wishlist',
    });
    return true;
  };

  const removeFromWishlist = productId => {
    setWishlist(current => current.filter(item => item.id !== productId));
  };

  const dismissNotification = () => setNotification(null);

  const cartCount = useMemo(() => cart.reduce((total, item) => total + Number(item.quantity || 0), 0), [cart]);
  const cartTotal = useMemo(
    () => cart.reduce((total, item) => total + item.price * Number(item.quantity || 0), 0),
    [cart],
  );

  return (
    <CartContext.Provider value={{ cart, cartCount, cartTotal, addToCart, updateQuantity, removeFromCart }}>
      <WishlistContext.Provider value={{ wishlist, wishlistCount: wishlist.length, addToWishlist, removeFromWishlist }}>
        <NotificationContext.Provider value={{ notification, dismissNotification }}>
          {children}
        </NotificationContext.Provider>
      </WishlistContext.Provider>
    </CartContext.Provider>
  );
};
