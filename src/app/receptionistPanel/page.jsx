'use client';

import Navbar from '@/components/navbar';
import { useRouter } from 'next/navigation';

export default function ReceptionistDashboard() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-semibold text-green-600 mb-6">Receptionist Dashboard</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          <button
            className="bg-green-500 text-white py-4 px-6 rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 transition ease-in-out"
            onClick={() => router.push('/receptionistPanel/register')}
          >
            <span className="font-semibold text-xl">Register Beneficiary</span>
          </button>
        </div>
      </div>
    </div>
  );
}
