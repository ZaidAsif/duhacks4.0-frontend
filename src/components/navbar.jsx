'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import useAuthStore from '@/store/authStore';

export default function Navbar() {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const handleLogin = () => {
    router.push('/login');
  };

  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-green-700 text-white p-4 flex justify-between items-center shadow-lg w-full">
      <div className="flex items-center space-x-4">
        <a href="/">
          <img
            src={'logo.png'}
            alt="Saylani Welfare"
            width={150}
            height={150}
          />
        </a>
      </div>

      <h1 className="text-xl font-bold hidden sm:block">
        Beneficiary Management System
      </h1>

      <button
        onClick={toggleMobileMenu}
        className="md:hidden text-white focus:outline-none"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      <div
        className={`${
          isMobileMenuOpen ? 'block' : 'hidden'
        } md:hidden absolute top-16 left-0 w-full bg-green-700 text-white flex flex-col items-center space-y-4 py-4`}
      >
        {user ? (
          <button
            onClick={handleLogout}
            className="bg-white text-green-700 px-4 py-2 rounded-lg hover:bg-gray-200 shadow-md"
          >
            Logout
          </button>
        ) : (
          <button
            onClick={handleLogin}
            className="bg-white text-green-700 px-4 py-2 rounded-lg hover:bg-gray-200 shadow-md"
          >
            Login
          </button>
        )}
      </div>

      <div className="hidden md:flex items-center space-x-4">
        {user ? (
          <button
            onClick={handleLogout}
            className="bg-white text-green-700 px-4 py-2 rounded-lg hover:bg-gray-200 shadow-md"
          >
            Logout
          </button>
        ) : (
          <button
            onClick={handleLogin}
            className="bg-white text-green-700 px-4 py-2 rounded-lg hover:bg-gray-200 shadow-md"
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
}
