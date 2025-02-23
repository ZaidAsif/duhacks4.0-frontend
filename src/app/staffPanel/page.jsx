'use client';

import useAuthStore from '@/store/authStore';
import { useRouter } from 'next/navigation';

export default function StaffDashboard() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-semibold text-green-600 text-center mb-6">
          Department Staff Dashboard
        </h1>
        <div className="text-lg text-gray-800 mb-8">
          <h3 className="font-semibold">Department: <span className="font-normal text-green-500">{user?.department}</span></h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <button
            className="bg-green-600 text-white p-4 rounded-lg shadow hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition ease-in-out"
            onClick={() => router.push('/staffPanel/scanToken')}
          >
            <span className="font-semibold text-xl">Scan Token</span>
          </button>

          <button
            className="bg-blue-600 text-white p-4 rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition ease-in-out"
            onClick={() => router.push('/staffPanel/manageToken')}
          >
            <span className="font-semibold text-xl">Manage Tokens</span>
          </button>
        </div>
      </div>
    </div>
  );
}
