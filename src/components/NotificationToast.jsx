import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNotification } from '../context/StoreHooks';

const NotificationToast = () => {
  const { notification, dismissNotification } = useNotification();
  const navigate = useNavigate();

  useEffect(() => {
    if (!notification) return undefined;
    const timeoutId = window.setTimeout(dismissNotification, 4500);
    return () => window.clearTimeout(timeoutId);
  }, [notification, dismissNotification]);

  if (!notification) return null;

  const handleView = () => {
    dismissNotification();
    navigate(notification.actionTo);
  };

  return (
    <aside
      role="status"
      aria-live="polite"
      className="fixed right-4 top-20 z-[60] w-[270px] max-w-[calc(100%-2rem)] border border-gray-200 bg-white p-4 text-[11px] tracking-[0.12em] text-black shadow-sm">
      <button
        type="button"
        onClick={dismissNotification}
        aria-label="Dismiss notification"
        className="absolute right-3 top-3 text-sm leading-none hover:underline">
        ×
      </button>
      <p className="pr-5 font-bold">{notification.title}</p>
      {notification.productName && <p className="mt-4 font-medium">{notification.productName}</p>}
      <p className="mt-3 max-w-[220px] leading-relaxed">{notification.message}</p>
      <button type="button" onClick={handleView} className="mt-4 font-bold hover:underline">
        {notification.actionLabel} <span aria-hidden="true">›</span>
      </button>
    </aside>
  );
};

export default NotificationToast;
