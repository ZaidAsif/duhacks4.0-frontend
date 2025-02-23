"use client";

import { BASIC_URL } from '@/constant/constant';
import useAuthStore from '@/store/authStore';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const setUser = useAuthStore((state) => state.setUser);
  const setToken = useAuthStore((state) => state.setToken);
  const router = useRouter();

  const handleLogin = async () => {
    if (!email || !password) {
      setError("All fields are required");
      return;
    }

    setLoading(true);
    setError('');

    try {
      const { data } = await axios.post(`${BASIC_URL}/login`, { email, password });
      setUser(data.data.user);
      setToken(data.data.token);
      localStorage.setItem('token', JSON.stringify(data.data.token));

      if (data.data.user.role === "Admin") {
        router.push('/adminPanel');
      } else if (data.data.user.role === "Staff") {
        router.push('/staffPanel');
      } else {
        router.push('/receptionistPanel');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError(error.response?.data?.message || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full sm:w-96">
        <h1 className="text-2xl font-semibold text-center text-blue-600 mb-6">Login</h1>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        
        <button
          onClick={handleLogin}
          disabled={loading}
          className={`w-full p-3 ${loading ? 'bg-gray-500' : 'bg-blue-600'} text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400`}
        >
          {loading ? 'Logging In...' : 'Login'}
        </button>
      </div>
    </div>
  );
}
