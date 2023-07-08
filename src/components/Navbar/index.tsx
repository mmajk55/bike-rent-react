import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const { handleLogout } = useAuth();

  const [show, setshow] = useState(false);

  return (
    <div className="bg-white">
      <nav className="2xl:container 2xl:mx-auto sm:py-6 sm:px-7 py-5 px-4">
        {/* For large and Medium-sized Screen */}
        <div className="flex justify-between ">
          <div className=" flex space-x-3 items-center">
            <Link to="/dashboard">
              <h1 className=" font-normal text-2xl leading-6 text-gray-800 hover:text-indigo-700">
                BikeRent
              </h1>
            </Link>
          </div>
          <div className="hidden sm:flex flex-row items-center space-x-6">
            <div className="flex flex-row space-x-6">
              <Link
                to="#"
                className="text-lg font-normal text-gray-800 hover:text-indigo-700 duration-150"
              >
                My bookings
              </Link>
              <Link
                to="/dashboard"
                className="text-lg font-normal text-gray-800 hover:text-indigo-700 duration-150"
              >
                Bikes to rent
              </Link>
            </div>
          </div>
          <div className="hidden sm:flex flex-row space-x-4">
            <button className="rounded-md flex space-x-2 w-24 h-10 font-normal text-sm leading-3 text-indigo-700 bg-white border border-indigo-700 focus:outline-none focus:bg-gray-200 hover:bg-gray-200 duration-150 justify-center items-center">
              Sign out
            </button>
          </div>
          {/* Burger Icon */}
          <div
            id="bgIcon"
            onClick={() => setshow(!show)}
            className={`focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800  justify-center items-center sm:hidden cursor-pointer`}
          >
            <svg
              className={`${show ? 'hidden' : ''}`}
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                className=" transform duration-150"
                d="M4 6H20"
                stroke="#1F2937"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M4 12H20"
                stroke="#1F2937"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                className=" transform duration-150"
                d="M4 18H20"
                stroke="#1F2937"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <svg
              className={`${show ? 'block' : 'hidden'}`}
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18 6L6 18"
                stroke="#1F2937"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6 6L18 18"
                stroke="#1F2937"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
        {/* Mobile and small-screen devices (toggle Menu) */}
        <div
          id="MobileNavigation"
          className={`${show ? 'block' : 'hidden'} sm:hidden mt-4 mx-auto`}
        >
          <div className="flex flex-col gap-4 mt-4 w-80 mx-auto ">
            <button
              onClick={handleLogout}
              className="rounded-md flex space-x-2 w-full h-10 font-normal text-sm leading-3 text-indigo-700 bg-indigo-600 bg-opacity-0 hover:opacity-100 duration-100 border border-indigo-700 focus:outline-none focus:bg-gray-200 hover:bg-gray-200 duration-150 justify-center items-center"
            >
              Sign out
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
