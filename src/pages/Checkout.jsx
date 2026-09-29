import { Link } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { useCart } from '../context/StoreHooks';

const Checkout = () => {
  const { cart, cartCount, cartTotal, updateQuantity, removeFromCart } = useCart();
  const formatPrice = price => `€ ${price.toLocaleString('de-DE', { minimumFractionDigits: 2 })}`;

  return (
    <>
      <div className="h-screen flex flex-col">
        <NavBar />
        <main className="mt-20 grow grid grid-cols-1 gap-12 px-4 pb-25 pt-15 sm:px-8 lg:grid-cols-12 lg:px-13">
          {/* Left Column: Bag Contents & Navigation */}
          <div className="lg:col-span-8 flex flex-col">
            {/* Checkout Progress */}
            <div className="mb-20 flex flex-wrap gap-x-2 gap-y-1 text-[10px] font-medium tracking-widest text-gray-400 sm:flex-nowrap sm:gap-4 sm:text-xs">
              <span className="text-black">BAG</span>
              <span className="font-light">|</span>
              <span>INFORMATION</span>
              <span className="font-light">|</span>
              <span>SHIPPING</span>
              <span className="font-light">|</span>
              <span>PAYMENT</span>
            </div>

            {cart.length === 0 ? (
              <div className="text-[12px] tracking-widest p-5 text-gray-800">
                YOUR BAG IS CURRENTLY EMPTY.{' '}
                <Link to="/homepage" className="underline">
                  CONTINUE SHOPPING
                </Link>
              </div>
            ) : (
              <div className="flex flex-col divide-y divide-gray-300">
                {cart.map(item => (
                  <article
                    key={item.id}
                    className="grid grid-cols-[72px_minmax(0,1fr)] gap-3 py-6 text-[11px] tracking-widest sm:grid-cols-[96px_minmax(0,1fr)_auto] sm:gap-5">
                    <img src={item.img} alt={item.category} className="h-24 w-18 object-cover sm:h-28 sm:w-24" />
                    <div>
                      <p className="font-bold">{item.brand}</p>
                      <p className="mt-2">{item.category}</p>
                      <p className="mt-2">{formatPrice(item.price)}</p>
                      <button type="button" onClick={() => removeFromCart(item.id)} className="mt-5 hover:underline">
                        REMOVE
                      </button>
                    </div>
                    <div className="col-start-2 flex items-center justify-between gap-4 sm:col-start-auto sm:flex-col sm:items-end sm:justify-start">
                      <label htmlFor={`quantity-${item.id}`} className="sr-only">
                        Quantity
                      </label>
                      <input
                        id={`quantity-${item.id}`}
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={event => updateQuantity(item.id, event.target.value)}
                        className="w-16 border border-gray-400 p-1 text-center"
                      />
                      <span>{formatPrice(item.price * item.quantity)}</span>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-4 flex flex-col w-full max-w-[400px] ml-auto">
            {/* Summary Header */}
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-[16px] font-bold tracking-widest text-xs">ORDER SUMMARY</h2>
              <span className="text-[16px] tracking-widest text-xs font-bold">{cartCount}</span>
            </div>

            {/* Cost Breakdown */}
            <div className="flex flex-col mb-8">
              <div className="flex tracking-widest text-xs justify-between py-4 border-b border-gray-300">
                <span>SUBTOTAL</span>
                <span>{formatPrice(cartTotal)}</span>
              </div>
              <div className="flex tracking-widest text-xs justify-between py-4 border-b border-gray-300">
                <span>SHIPPING</span>
                <span className="text-gray-500">CALCULATED AT CHECKOUT</span>
              </div>
              <div className="flex tracking-widest text-xs justify-between py-4 border-b border-black font-bold">
                <span>TOTAL</span>
                <span>{formatPrice(cartTotal)}</span>
              </div>
            </div>

            {/* Terms Checkbox */}
            <div className="flex items-start gap-3 mb-6">
              <input type="checkbox" id="terms" className="mt-[5px]  rounded-none cursor-pointer" />
              <label htmlFor="terms" className="text-[14px] leading-relaxed cursor-pointer text-gray-900">
                I'VE READ AND ACCEPT THE <span className="underline">PRIVACY POLICY</span> AND THE{' '}
                <span className="underline">TERMS AND CONDITIONS</span>
              </label>
            </div>

            {/* Checkout Button */}
            <button
              type="button"
              disabled={cart.length === 0}
              className="w-full bg-[#8c8c8c] hover:bg-black disabled:opacity-50 disabled:cursor-not-allowed leading-relaxed tracking-widest cursor-pointer text-white p-2 flex justify-between items-center transition-colors">
              <span>CHECKOUT</span>
              <span>{formatPrice(cartTotal)}</span>
            </button>

            {/* Payment Methods & Security Text */}
            <div className="mt-8 flex flex-col gap-4">
              {/* Mocking the payment icons layout */}
              <div className="flex gap-2 flex-wrap opacity-60">
                <div className="w-8 h-5 bg-gray-200 border border-gray-300 rounded-sm"></div>
                <div className="w-8 h-5 bg-gray-200 border border-gray-300 rounded-sm"></div>
                <div className="w-8 h-5 bg-gray-200 border border-gray-300 rounded-sm"></div>
                <div className="w-8 h-5 bg-gray-200 border border-gray-300 rounded-sm"></div>
                <div className="w-8 h-5 bg-gray-200 border border-gray-300 rounded-sm"></div>
              </div>
              <p className="text-[8px] tracking-wider text-gray-400 leading-relaxed">
                ALL THE TRANSACTIONS AND INFORMATIONS ABOUT THE CREDIT CARD ARE PROCESSED USING SSL/TLS COMMUNICATION
                PRODUCTS, GUARANTEE OF AN ALWAYS CODED COMMUNICATION.
              </p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Checkout;
