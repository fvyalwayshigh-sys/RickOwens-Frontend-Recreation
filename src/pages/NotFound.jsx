import { Link } from 'react-router-dom';
import NavBar from '../components/NavBar';

const NotFound = () => (
  <div className="min-h-screen bg-black text-white" data-nav-theme="dark">
    <NavBar />
    <main className="min-h-screen flex items-center justify-center px-6 pb-16">
      <p className="text-center text-[14px] tracking-[0.14em]">404 - PAGE NOT FOUND</p>
    </main>
    <Link
      to="/home"
      className="fixed bottom-4 left-1/2 w-[286px] max-w-[calc(100%-2rem)] -translate-x-1/2 bg-[#8c8c8c] px-4 py-3 text-center text-[9px] tracking-[0.14em] text-white transition-colors hover:bg-white hover:text-black">
      GO BACK TO HOME
    </Link>
  </div>
);

export default NotFound;
