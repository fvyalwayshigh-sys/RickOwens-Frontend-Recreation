import { useState } from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

const Account = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <div className="h-screen flex flex-col">
        <NavBar />
        <main className="grow flex flex-col items-center mt-15 pt-24 px-4">
          <h1 className="text-base font-bold mb-12 text-[18px] tracking-[0.15em]">LOGIN</h1>

          <form onSubmit={event => event.preventDefault()} className="w-full max-w-125 flex flex-col gap-6">
            {/* Email Input */}
            <div className="flex flex-col gap-3">
              <label htmlFor="email" className="text-[11px] text-gray-800 tracking-widest">
                EMAIL *
              </label>
              <input
                type="email"
                id="email"
                placeholder="EMAIL"
                className="border border-gray-400 p-2 outline-none focus:border-gray-800 transition-colors placeholder:text-gray-500 text-xs placeholder:tracking-widest"
              />
            </div>

            {/* Password Input */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <label htmlFor="password" className="text-[11px] text-gray-800 tracking-widest">
                  PASSWORD *
                </label>
                <span className="text-[11px] text-gray-500 tracking-widest">FORGOT?</span>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  placeholder="PASSWORD"
                  className="w-full border border-gray-400 p-2 pr-10 outline-none  focus:border-gray-800 transition-colors placeholder:text-gray-500 text-xs placeholder:tracking-widest"
                />
                {/* Eye Icon for Password */}
                <button
                  type="button"
                  onClick={() => setShowPassword(current => !current)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#8c8c8c] hover:bg-black cursor-pointer text-white p-2 mt-2 transition-colors tracking-[0.15em]">
              LOGIN
            </button>
          </form>

          {/* Create Account Prompt */}
          <div className="w-full max-w-[500px] mt-10 text-[11px] flex flex-col gap-4 text-gray-600">
            <p className="leading-relaxed tracking-widest">
              YOU DON'T HAVE AN ACCOUNT?
              <br />
              CLICK THE BUTTON BELOW AND CREATE AN ACCOUNT.
            </p>
            <Link
              to="/newaccount"
              className="text-black tracking-widest  font-medium text-xs hover:underline transition-colors">
              CREATE ACCOUNT →
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Account;
