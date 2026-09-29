import Hero from './components/Hero';
import Bag from './pages/Bag';
import { Navigate, Route, Routes } from 'react-router-dom';
import Shoes from './pages/Shoes';
import Fw26 from './pages/Fw26';
import DrMartin from './pages/DrMartin';
import Account from './pages/Account';
import Checkout from './pages/Checkout';
import CreateAccount from './pages/CreateAccount';
import Homepage from './pages/Homepage';
import Wishlist from './pages/Wishlist';
import NotFound from './pages/NotFound';
import NotificationToast from './components/NotificationToast';
import ScrollToTop from './components/ScrollToTop';

const App = () => {
  return (
    <>
      <div>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/menu" element={<Navigate to="/home" replace />} />
          <Route path="/account" element={<Account />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/bag" element={<Checkout />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/newaccount" element={<CreateAccount />} />
          <Route path="/home" element={<Hero />} />
          <Route path="/homepage" element={<Homepage />} />
          <Route path="/bags" element={<Bag />} />
          <Route path="/shoes" element={<Shoes />} />
          <Route path="/fw26" element={<Fw26 />} />
          <Route path="/dr-martin" element={<DrMartin />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <NotificationToast />
      </div>
    </>
  );
};

export default App;
