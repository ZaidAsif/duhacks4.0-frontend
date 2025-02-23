'use client';

import { useRouter } from 'next/navigation';

export default function AdminPanel() {
    const router = useRouter();

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-md">
                <h1 className="text-3xl font-bold text-center text-green-600 mb-8">
                    Admin Dashboard
                </h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    <button
                        className="bg-green-500 text-white p-6 rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 transition-all"
                        onClick={() => router.push('/adminPanel/users/registerUser')}
                    >
                        <span className="font-semibold text-xl">Register User</span>
                    </button>

                    <button
                        className="bg-blue-500 text-white p-6 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                        onClick={() => router.push('/adminPanel/users')}
                    >
                        <span className="font-semibold text-xl">See Users</span>
                    </button>

                    <button
                        className="bg-green-500 text-white p-6 rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 transition-all"
                        onClick={() => router.push('/adminPanel/departments/addDepartment')}
                    >
                        <span className="font-semibold text-xl">Add Department
                        </span>
                    </button>

                    <button
                        className="bg-blue-500 text-white p-6 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                        onClick={() => router.push('/adminPanel/departments')}
                    >
                        <span className="font-semibold text-xl">See Departments</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
