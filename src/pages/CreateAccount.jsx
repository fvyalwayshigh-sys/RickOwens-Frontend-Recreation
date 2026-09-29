import { useState } from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

const CreateAccount = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <>
      <div className="flex flex-col mt-20 items-center py-16 px-4 bg-white text-gray-900 uppercase text-[11px] tracking-[0.1em]">
        <NavBar />
        <h1 className="text-base font-medium mb-12 tracking-[0.15em]">CREATE ACCOUNT</h1>

        <form onSubmit={event => event.preventDefault()} className="w-full max-w-[550px] flex flex-col gap-6">
          {/* Email */}
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-[11px] text-gray-600">
              EMAIL *
            </label>
            <input
              type="email"
              id="email"
              placeholder="EMAIL"
              className="border border-gray-800 p-3 outline-none focus:border-black transition-colors placeholder:text-gray-400 placeholder:tracking-[0.1em]"
            />
          </div>

          {/* First & Last Name */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <label htmlFor="firstName" className="text-[11px] text-gray-600">
                FIRST NAME *
              </label>
              <input
                type="text"
                id="firstName"
                placeholder="YOUR FIRST NAME"
                className="border border-gray-400 p-3 outline-none focus:border-gray-800 transition-colors placeholder:text-gray-300 placeholder:tracking-[0.1em]"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="lastName" className="text-[11px] text-gray-600">
                LAST NAME *
              </label>
              <input
                type="text"
                id="lastName"
                placeholder="YOUR LAST NAME"
                className="border border-gray-400 p-3 outline-none focus:border-gray-800 transition-colors placeholder:text-gray-300 placeholder:tracking-[0.1em]"
              />
            </div>
          </div>

          {/* Country & Birthdate */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <label htmlFor="country" className="text-[11px] text-gray-600">
                COUNTRY *
              </label>
              <select
                id="country"
                className="border border-gray-400 p-3 outline-none focus:border-gray-800 transition-colors text-gray-400 tracking-[0.1em] appearance-none bg-transparent rounded-none">
                <option value="">SELECT COUNTRY</option>
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="birthdate" className="text-[11px] text-gray-600">
                BIRTHDATE *
              </label>
              <input
                type="text"
                id="birthdate"
                placeholder="DD/MM/YYYY"
                className="border border-gray-400 p-3 outline-none focus:border-gray-800 transition-colors placeholder:text-gray-300 placeholder:tracking-[0.1em]"
              />
            </div>
          </div>

          {/* Password */}
          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="text-[11px] text-gray-600">
              PASSWORD *
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                placeholder="PASSWORD"
                className="w-full border border-gray-400 p-3 pr-10 outline-none focus:border-gray-800 transition-colors placeholder:text-gray-300 placeholder:tracking-[0.1em]"
              />
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

          {/* Password Strength Indicator */}
          <div className="flex justify-between items-center mt-[-10px] mb-2">
            <span className="text-[11px] text-gray-900">PASSWORD STRENGTH:</span>
            <div className="flex gap-1">
              <div className="w-6 h-2 bg-gray-200"></div>
              <div className="w-6 h-2 bg-gray-200"></div>
              <div className="w-6 h-2 bg-gray-200"></div>
              <div className="w-6 h-2 bg-gray-200"></div>
              <div className="w-6 h-2 bg-gray-200"></div>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="flex flex-col gap-2">
            <label htmlFor="confirmPassword" className="text-[11px] text-gray-600">
              CONFIRM PASSWORD *
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                id="confirmPassword"
                placeholder="PASSWORD"
                className="w-full border border-gray-400 p-3 pr-10 outline-none focus:border-gray-800 transition-colors placeholder:text-gray-300 placeholder:tracking-[0.1em]"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(current => !current)}
                aria-label={showConfirmPassword ? 'Hide password confirmation' : 'Show password confirmation'}
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

          {/* Checkboxes */}
          <div className="flex flex-col gap-4 mt-2">
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="policy"
                className="mt-[2px] w-4 h-4 border border-black rounded-none cursor-pointer appearance-none checked:bg-black"
              />
              <label htmlFor="policy" className="text-[11px] cursor-pointer text-gray-800">
                BY CREATING AN ACCOUNT YOU ARE ACCEPTING OUR <span className="underline">POLICY</span> *
              </label>
            </div>
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="promotions"
                className="mt-[2px] w-4 h-4 border border-black rounded-none cursor-pointer appearance-none checked:bg-black"
              />
              <label htmlFor="promotions" className="text-[11px] cursor-pointer text-gray-800">
                YOU ACCEPT TO RECEIVE UPDATES AND PROMOTIONS
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#8c8c8c] hover:bg-black cursor-pointer text-white p-4 mt-4 transition-colors tracking-[0.15em]">
            CREATE ACCOUNT
          </button>
        </form>

        {/* Redirect Prompt */}
        <div className="w-full max-w-[550px] mt-10 text-[11px] flex flex-col gap-6 text-gray-800">
          <p className="leading-relaxed">
            YOU ALREADY HAVE AN ACCOUNT?
            <br />
            CLICK THE BUTTON BELOW AND GO BACK TO THE LOGIN.
          </p>
          <Link to="/account">
            <span className="text-black font-bold hover:text-gray-500 hover:underline transition-colors">LOGIN →</span>
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CreateAccount;
