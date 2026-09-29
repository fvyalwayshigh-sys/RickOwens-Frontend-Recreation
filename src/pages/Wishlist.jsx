import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import NavBar from '../components/NavBar';
import { useCart, useWishlist } from '../context/StoreHooks';

const Wishlist = () => {
  const navigate = useNavigate();
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const [selectedSizes, setSelectedSizes] = useState({});

  const handleAddToBag = product => {
    addToCart({ ...product, selectedSize: selectedSizes[product.id] || product.size?.[0] || 'UNI' });
    navigate('/bag');
  };

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden" data-nav-theme="light">
      <NavBar />
      <main className="grow px-4 pt-20 pb-20 sm:px-6">
        <div className="mx-auto w-full max-w-[390px]">
          <h1 className="text-center text-[15px] font-bold tracking-[0.12em]">YOUR WISHLIST</h1>
          <p className="mt-9 text-center text-[9px] tracking-[0.14em]">SEE THE PRODUCTS YOU LIKED AND PURCHASE THEM</p>

          {wishlist.length === 0 ? (
            <p className="mt-14 text-center text-[11px] tracking-[0.12em]">YOUR WISHLIST IS CURRENTLY EMPTY.</p>
          ) : (
            <section className="mt-8">
              <div className="flex items-center justify-between border-b border-black pb-2 text-[9px] font-bold tracking-[0.14em]">
                <span>PRODUCTS</span>
                <span>[ {wishlist.length} ]</span>
              </div>
              {wishlist.map(product => (
                <article
                  key={product.id}
                  className="grid grid-cols-[92px_minmax(0,1fr)] gap-6 border-b border-gray-500 py-5 text-[9px] tracking-[0.12em]">
                  <img src={product.img} alt={product.category} className="h-[140px] w-[92px] object-contain" />
                  <div className="flex min-w-0 flex-col">
                    <p className="font-bold leading-relaxed">
                      {product.brand} <span className="font-normal">| {product.category}</span>
                    </p>
                    <p className="mt-4">PRODUCT: {product.category}</p>
                    <p className="mt-2">PRICE: {product.priceFormatted}</p>

                    <label htmlFor={`wishlist-size-${product.id}`} className="sr-only">
                      Size for {product.category}
                    </label>
                    <select
                      id={`wishlist-size-${product.id}`}
                      value={selectedSizes[product.id] || product.size?.[0] || 'UNI'}
                      onChange={event =>
                        setSelectedSizes(current => ({ ...current, [product.id]: event.target.value }))
                      }
                      className="mt-7 h-7 w-full border border-gray-500 bg-white px-2 text-[9px] tracking-[0.1em] outline-none">
                      {(product.size?.length ? product.size : ['UNI']).map(size => (
                        <option key={size} value={size}>
                          SIZE: {size}
                        </option>
                      ))}
                    </select>

                    <div className="mt-3 flex items-center justify-between gap-3 font-bold">
                      <button type="button" onClick={() => removeFromWishlist(product.id)} className="hover:underline">
                        × REMOVE
                      </button>
                      <button type="button" onClick={() => handleAddToBag(product)} className="hover:underline">
                        ADD TO BAG +
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </section>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Wishlist;
