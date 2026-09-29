import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Menu as MenuIcon, Search as SearchIcon, X } from 'lucide-react';
import { allProducts } from '../data/product';
import { useWishlist } from '../context/StoreHooks';

const SearchProductItem = ({ product, onSelect }) => {
  const { addToWishlist, removeFromWishlist, wishlist } = useWishlist();
  const [isHovered, setIsHovered] = useState(false);
  const displayImg = isHovered && product.img2 ? product.img2 : product.img;
  const isWishlisted = wishlist.some(item => item.id === product.id);

  return (
    <div
      className="flex flex-col text-left group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}>
      <Link to={product.page} onClick={onSelect} className="block overflow-hidden bg-neutral-50/50">
        <img
          src={displayImg}
          alt={product.category}
          className="w-full aspect-3/4 object-contain transition-transform duration-300 group-hover:scale-[1.02]"
        />
      </Link>
      <div className="pt-2 text-[10px] tracking-[0.12em] uppercase leading-tight">
        <p className="font-bold text-black">{product.brand}</p>
        <p className="text-neutral-800">{product.category}</p>
        <p className="text-black mt-1">{product.priceFormatted}</p>
        <button
          type="button"
          onClick={e => {
            e.preventDefault();
            e.stopPropagation();
            if (isWishlisted) removeFromWishlist(product.id);
            else addToWishlist(product);
          }}
          className="text-[10px] tracking-[0.12em] uppercase text-black hover:underline mt-1 block cursor-pointer">
          {isWishlisted ? 'WISHLIST -' : 'WISHLIST +'}
        </button>
      </div>
    </div>
  );
};

const Menu = ({ isOpen, setIsOpen, initialView = 'menu' }) => {
  const { wishlistCount } = useWishlist();
  const [prevProps, setPrevProps] = useState({ isOpen, initialView });
  const [view, setView] = useState(initialView);
  const [query, setQuery] = useState('');

  if (isOpen !== prevProps.isOpen || initialView !== prevProps.initialView) {
    setPrevProps({ isOpen, initialView });
    if (isOpen) {
      setView(initialView);
    }
  }

  const mainLinks = ['WOMEN', 'MEN', 'KIDS', 'BAGS', 'ACCESSORIES', 'HOME'];
  const mainLinkRoutes = {
    WOMEN: '/homepage',
    MEN: '/homepage',
    KIDS: '/homepage',
    BAGS: '/bags',
    ACCESSORIES: '/homepage',
    HOME: '/home',
  };
  const infoLinks = ['RUNWAY SHOWS', 'PRODUCT GUIDE', 'INTERVIEWS', 'LAMYLAND', 'FURNITURE', 'EXHIBITIONS', 'STORES'];

  // Filter products by search query
  const filteredProducts = useMemo(() => {
    const clean = query.trim().toLowerCase();
    if (!clean) return [];
    return allProducts.filter(p => {
      const brand = (p.brand || '').toLowerCase();
      const category = (p.category || '').toLowerCase();
      const season = (p.season || '').toLowerCase();
      const sex = (p.sex || '').toLowerCase();
      const tags = (p.tags || []).join(' ').toLowerCase();
      return (
        brand.includes(clean) ||
        category.includes(clean) ||
        season.includes(clean) ||
        sex.includes(clean) ||
        tags.includes(clean)
      );
    });
  }, [query]);

  // Suggestions based on search query
  const suggestions = useMemo(() => {
    const clean = query.trim().toUpperCase();
    if (!clean) return [];
    if (clean.includes('FW26') || clean.includes('TOWER')) {
      return ['FW26 TOWER', 'WOMEN | FW26 TOWER', 'UNISEX | FW26 TOWER', 'MEN | FW26 TOWER', 'KIDS | FW26 TOWER'];
    }
    return [`${clean}`, `WOMEN | ${clean}`, `UNISEX | ${clean}`, `MEN | ${clean}`, `KIDS | ${clean}`];
  }, [query]);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Overlay */}
      <div
        onClick={handleClose}
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-[1px] transition-opacity duration-300 ${
          isOpen ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
      />

      {/* Side Drawer */}
      <aside
        className={`fixed left-0 top-0 z-50 h-screen w-full max-w-[440px] bg-white px-7 sm:px-9 py-6 flex flex-col transition-transform duration-500 ease-in-out ${
          isOpen ? 'translate-x-0 shadow-[4px_0_35px_rgba(0,0,0,0.12)]' : '-translate-x-full'
        }`}>
        {/* Top Header */}
        <div className="flex items-center gap-8 text-[11px] tracking-[0.14em] flex-shrink-0">
          {view === 'menu' ? (
            <>
              <button
                type="button"
                aria-label="Close menu"
                onClick={handleClose}
                className="flex items-center gap-2 cursor-pointer hover:underline text-black">
                <X size={14} strokeWidth={1.5} />
                <span className="touch-label">CLOSE</span>
              </button>

              <button
                type="button"
                aria-label="Open search"
                onClick={() => setView('search')}
                className="flex items-center gap-2 cursor-pointer hover:underline text-black">
                <SearchIcon size={14} strokeWidth={1.5} />
                <span className="touch-label">SEARCH</span>
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                aria-label="Show menu"
                onClick={() => setView('menu')}
                className="flex items-center gap-2 cursor-pointer hover:underline text-black">
                <MenuIcon size={14} strokeWidth={1.5} />
                <span className="touch-label">MENU</span>
              </button>

              <button
                type="button"
                aria-label="Close search"
                onClick={handleClose}
                className="flex items-center gap-2 cursor-pointer hover:underline text-black">
                <X size={14} strokeWidth={1.5} />
                <span className="touch-label">SEARCH</span>
              </button>
            </>
          )}
        </div>

        {/* VIEW: MENU */}
        {view === 'menu' && (
          <div className="flex-1 overflow-y-auto mt-12 pr-2">
            {/* Main navigation */}
            <nav>
              <ul className="space-y-2">
                {mainLinks.map(link => (
                  <li key={link}>
                    <Link
                      to={mainLinkRoutes[link]}
                      onClick={handleClose}
                      className="text-[11px] tracking-[0.12em] cursor-pointer hover:underline text-black block">
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Information navigation */}
            <nav className="mt-10">
              <ul className="space-y-2">
                {infoLinks.map(link => (
                  <li key={link}>
                    <span className="text-[11px] tracking-[0.12em] text-black block">{link}</span>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Bottom section */}
            <div className="mt-10 text-[11px] tracking-[0.12em] cursor-pointer text-black">
              <Link to="/wishlist" onClick={handleClose} className="hover:underline block">
                WISHLIST [ {wishlistCount} ]
              </Link>
              <div className="hover:underline cursor-pointer mt-3">
                <p>BRITISH INDIAN OCEAN</p>
                <p>TERRITORY / EUR</p>
              </div>
            </div>
          </div>
        )}

        {/* VIEW: SEARCH (matching Image 1 & Image 2) */}
        {view === 'search' && (
          <div className="flex-1 overflow-y-auto flex flex-col mt-8 pr-1">
            {/* Search Input Bar */}
            <div className="border-b border-black pb-2 flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-2.5 flex-1">
                <SearchIcon size={14} strokeWidth={1.5} className="text-black flex-shrink-0" />
                <input
                  type="text"
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  placeholder="TYPE HERE"
                  autoFocus
                  className="w-full bg-transparent outline-none uppercase text-[11px] tracking-[0.14em] text-black placeholder:text-black placeholder:tracking-[0.14em] font-normal"
                />
              </div>
              {query.trim().length > 0 && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  className="text-[11px] font-bold tracking-[0.14em] uppercase text-black hover:underline cursor-pointer ml-3 flex-shrink-0">
                  CLEAR
                </button>
              )}
            </div>

            {/* Search Content */}
            {query.trim().length > 0 && (
              <div className="pt-6">
                {/* Search Results Count */}
                <p className="text-[11px] font-normal tracking-[0.14em] uppercase text-[#888888] mb-6">
                  SEARCH RESULTS: {filteredProducts.length} PRODUCTS
                </p>

                {/* Suggested Search */}
                {suggestions.length > 0 && (
                  <div className="mb-8">
                    <h4 className="text-[11px] font-bold tracking-[0.14em] uppercase text-black mb-2.5">
                      SUGGESTED SEARCH
                    </h4>
                    <div className="space-y-1.5 text-[11px] tracking-[0.08em] uppercase">
                      {suggestions.map(item => (
                        <button
                          key={item}
                          type="button"
                          onClick={() => setQuery(item.includes('|') ? item.split('|')[1].trim() : item)}
                          className="block text-left text-black hover:underline cursor-pointer">
                          {item}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* 2-Column Product Grid (Image 2) */}
                {filteredProducts.length > 0 ? (
                  <div className="grid grid-cols-2 gap-x-5 gap-y-8 pt-2">
                    {filteredProducts.map(product => (
                      <SearchProductItem key={product.id} product={product} onSelect={handleClose} />
                    ))}
                  </div>
                ) : (
                  <p className="text-[11px] tracking-[0.12em] uppercase text-neutral-500 py-6">NO PRODUCTS FOUND</p>
                )}

                {/* View All Results */}
                {filteredProducts.length > 0 && (
                  <div className="pt-10 pb-6 text-center">
                    <Link
                      to="/shoes"
                      onClick={handleClose}
                      className="text-[11px] font-bold tracking-[0.14em] uppercase text-black hover:underline">
                      VIEW ALL RESULTS
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </aside>
    </>
  );
};

export default Menu;
