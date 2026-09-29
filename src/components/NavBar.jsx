import { useLayoutEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu as MenuIcon, Search as SearchIcon, ShoppingBag, UserRound } from 'lucide-react';
import Menu from './Menu';
import { useCart } from '../context/StoreHooks';

const NavBar = () => {
  const { cartCount } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [initialView, setInitialView] = useState('menu');
  const navRef = useRef(null);
  const logoRef = useRef(null);

  useLayoutEffect(() => {
    const updateBackground = () => {
      const sampleY = Math.min(110, window.innerHeight - 1);
      const sampleX = window.innerWidth / 2;
      const themedSection = Array.from(document.querySelectorAll('[data-nav-theme]'))
        .map(section => ({ section, rect: section.getBoundingClientRect() }))
        .filter(
          ({ rect }) => rect.top <= sampleY && rect.bottom > sampleY && rect.left <= sampleX && rect.right >= sampleX,
        )
        .sort((a, b) => a.rect.width * a.rect.height - b.rect.width * b.rect.height)[0]?.section;
      const useLightForeground = themedSection?.getAttribute('data-nav-theme') === 'dark' && !isOpen;
      if (navRef.current) navRef.current.style.color = useLightForeground ? '#fff' : '#000';
      if (logoRef.current) logoRef.current.style.filter = useLightForeground ? 'brightness(0) invert(1)' : 'none';
    };

    updateBackground();
    window.addEventListener('scroll', updateBackground, { passive: true });
    document.addEventListener('scroll', updateBackground, true);
    window.addEventListener('resize', updateBackground);

    return () => {
      window.removeEventListener('scroll', updateBackground);
      document.removeEventListener('scroll', updateBackground, true);
      window.removeEventListener('resize', updateBackground);
    };
  }, [isOpen]);

  const openMenu = () => {
    setInitialView('menu');
    setIsOpen(true);
  };

  const openSearch = () => {
    setInitialView('search');
    setIsOpen(true);
  };

  return (
    <>
      <div
        ref={navRef}
        className="nav fixed inset-x-0 top-0 z-50 flex h-10 items-center justify-between px-4 py-4 text-black sm:p-7">
        {/* LEFT */}
        <div className="left flex gap-3 sm:gap-10">
          {/* MENU */}
          <button
            type="button"
            aria-label="Open menu"
            onClick={openMenu}
            className="flex items-center gap-2 text-[10px] leading-relaxed tracking-wide cursor-pointer hover:underline sm:text-[12px]">
            <MenuIcon size={14} strokeWidth={1.5} />
            <span className="touch-label">MENU</span>
          </button>

          {/* SEARCH */}
          <button
            type="button"
            aria-label="Open search"
            onClick={openSearch}
            className="flex items-center gap-2 text-[10px] leading-relaxed tracking-wide cursor-pointer hover:underline sm:text-[12px]">
            <SearchIcon size={14} strokeWidth={1.5} />
            <span className="touch-label">SEARCH</span>
          </button>
        </div>

        {/* LOGO */}
        <Link to="/home" className="absolute left-1/2 -translate-x-1/2">
          <img
            ref={logoRef}
            className="logo h-16 w-32 object-contain sm:h-25 sm:w-auto"
            src="https://callvalerio.com/wp-content/uploads/2022/04/Rick-Owens-Logo.png"
            alt="Rick Owens Logo"
          />
        </Link>

        {/* RIGHT */}
        <div className="right flex gap-3 sm:gap-10">
          <Link to="/account">
            <button
              type="button"
              aria-label="Account"
              className="flex items-center gap-2 text-[10px] leading-relaxed tracking-wide cursor-pointer hover:underline sm:text-[12px]">
              <UserRound className="touch-icon" size={15} strokeWidth={1.5} aria-hidden="true" />
              <span className="touch-label">ACCOUNT</span>
            </button>
          </Link>

          <Link to="/bag">
            <button
              type="button"
              aria-label={`Bag with ${cartCount} item${cartCount === 1 ? '' : 's'}`}
              className="flex items-center gap-2 text-[10px] leading-relaxed tracking-wide cursor-pointer hover:underline sm:text-[12px]">
              <ShoppingBag className="touch-icon" size={15} strokeWidth={1.5} aria-hidden="true" />
              <span className="touch-label">BAG [ {cartCount} ]</span>
            </button>
          </Link>
        </div>
      </div>

      {/* MENU / SEARCH DRAWER */}
      <Menu isOpen={isOpen} setIsOpen={setIsOpen} initialView={initialView} />
    </>
  );
};

export default NavBar;
