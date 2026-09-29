import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart, useWishlist } from '../context/StoreHooks';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, wishlist } = useWishlist();
  const [isImageHovered, setIsImageHovered] = useState(false);
  const [hoverImageFailed, setHoverImageFailed] = useState(false);
  const isWishlisted = wishlist.some(item => item.id === product.id);

  const handleQuickBuy = () => {
    addToCart(product);
    navigate('/bag');
  };

  return (
    <article className="group/card relative mt-10" tabIndex={0}>
      <div
        className="relative aspect-3/4 w-full cursor-pointer overflow-hidden bg-neutral-100"
        onMouseEnter={() => setIsImageHovered(true)}
        onMouseLeave={() => setIsImageHovered(false)}>
        <img
          src={product.img}
          alt={product.category}
          loading="lazy"
          decoding="async"
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ease-in-out motion-reduce:transition-none ${
            product.img2 && isImageHovered && !hoverImageFailed ? 'opacity-0' : 'opacity-100'
          }`}
        />
        {product.img2 && !hoverImageFailed && (
          <img
            src={product.img2}
            alt=""
            aria-hidden="true"
            loading="lazy"
            decoding="async"
            onError={event => {
              setHoverImageFailed(true);
              event.currentTarget.style.display = 'none';
            }}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ease-in-out motion-reduce:transition-none ${
              isImageHovered ? 'opacity-100' : 'opacity-0'
            }`}
          />
        )}
      </div>
      <div className="invisible absolute left-0 right-0 top-full z-20 px-2 pb-3 opacity-0 transition-[opacity,visibility] duration-200 ease-out group-hover/card:visible group-hover/card:opacity-100 group-focus-within/card:visible group-focus-within/card:opacity-100 max-sm:visible max-sm:opacity-100">
        <div className="flex items-center justify-between pt-3">
          <h3 className="text-[13px] font-bold text-black ">{product.brand}</h3>
          <h3 className="text-[14px] tracking-widest font-bold text-black">
            {product.priceFormatted || `€ ${product.price}`}
          </h3>
        </div>
        <div className="flex flex-col gap-3 justify-evenly py-3">
          <h4 className="text-[11px] leading-relaxed tracking-widest text-gray-900">{product.category}</h4>
          {product.sex && <h4 className="text-[13px] leading-relaxed tracking-wide text-gray-800">{product.sex}</h4>}
        </div>
        {product.size?.length > 0 && (
          <div className="flex flex-wrap items-center justify-start gap-15 py-4">
            {product.size.map(size => (
              <h4 key={size} className="text-[12px] leading-relaxed text-gray-800">
                {size}
              </h4>
            ))}
          </div>
        )}
        <div className="flex items-center justify-between py-3">
          <button
            type="button"
            onClick={handleQuickBuy}
            className="text-[12px] text-black font-bold cursor-pointer leading-relaxed tracking-widest hover:underline">
            QUICK BUY +
          </button>
          <button
            type="button"
            onClick={() => (isWishlisted ? removeFromWishlist(product.id) : addToWishlist(product))}
            className="font-bold text-black text-[12px] cursor-pointer leading-relaxed tracking-widest hover:underline">
            {isWishlisted ? 'WISHLIST -' : 'WISHLIST +'}
          </button>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
