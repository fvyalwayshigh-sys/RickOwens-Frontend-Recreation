import { useContext } from 'react';
import { CartContext, NotificationContext, WishlistContext } from './StoreState';

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used inside StoreProvider');
  return context;
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) throw new Error('useWishlist must be used inside StoreProvider');
  return context;
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) throw new Error('useNotification must be used inside StoreProvider');
  return context;
};
