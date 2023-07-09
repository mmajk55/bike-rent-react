import { useState } from 'react';
import { useAuth } from 'context/AuthContext';
import { Link, NavLink } from 'react-router-dom';

type NavbarProps = {
  userName: string;
  coins: number;
};

const Navbar = ({ userName, coins }: NavbarProps) => {
  const [show, setshow] = useState(false);

  const { handleLogout } = useAuth();

  const linkClasses =
    'text-lg font-normal text-gray-800 hover:text-indigo-700 duration-150';
  const activeLinkClasses = 'text-lg font-normal text-indigo-700 duration-150';

  const getLinkClass = (isActive: boolean) =>
    isActive ? activeLinkClasses : linkClasses;

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
              <NavLink
                to="/dashboard/my-bookings"
                className={({ isActive }) => getLinkClass(isActive)}
                end
              >
                My bookings
              </NavLink>
              <NavLink
                to="/dashboard"
                className={({ isActive }) => getLinkClass(isActive)}
                end
              >
                Bikes to rent
              </NavLink>
            </div>
          </div>
          <div className="hidden sm:flex flex-row space-x-4">
            <div className="flex flex-row items-center space-x-2">
              <span className="text-lg font-normal text-gray-800">
                {userName}
              </span>
              <span className="text-lg font-normal text-gray-800">
                {coins}$
              </span>
            </div>
            <button
              onClick={handleLogout}
              className="rounded-md flex space-x-2 w-24 h-10 font-normal text-sm leading-3 text-indigo-700 bg-white border border-indigo-700 focus:outline-none focus:bg-gray-200 hover:bg-gray-200 duration-150 justify-center items-center"
            >
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
            <div className="flex flex-col items-center space-x-2">
              <NavLink
                to="/dashboard"
                className={({ isActive }) => getLinkClass(isActive)}
                end
              >
                Bikes to rent
              </NavLink>
              <NavLink
                to="/dashboard/my-bookings"
                className={({ isActive }) => getLinkClass(isActive)}
                end
              >
                My bookings
              </NavLink>
            </div>
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
