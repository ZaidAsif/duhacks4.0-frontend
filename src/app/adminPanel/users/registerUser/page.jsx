'use client';

import { BASIC_URL } from '@/constant/constant';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function SignupUsers() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [role, setRole] = useState('Receptionist');
    const [department, setDepartment] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [departments, setDepartments] = useState([]); 

    const router = useRouter();

    useEffect(() => {
        const fetchDepartments = async () => {
            try {
                const { data } = await axios.get(`${BASIC_URL}/admin/department/all`, {
                    headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}` },
                });
                setDepartments(data.data);
            } catch (err) {
                console.error("Error fetching departments:", err);
            }
        };

        fetchDepartments();
    }, []);

    const handleSignup = async () => {
        setError('');
        setLoading(true);

        if (!email || !password || !name || !role) {
            setError("All fields are required");
            setLoading(false);
            return;
        }

        if (role === 'Staff' && !department) {
            setError("Department is required for Staff role");
            setLoading(false);
            return;
        }

        try {
            const { data } = await axios.post(`${BASIC_URL}/admin/registerUser`, { email, password, name, role, department });

            setLoading(false);
            router.push('/adminPanel');
        } catch (error) {
            setError(error.response ? error.response.data.message : "Signup failed. Please try again.");
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full sm:w-96 md:w-1/2 lg:w-1/3">
            
                <h1 className="text-2xl font-semibold text-center text-blue-600 mb-6">Register</h1>

                {error && <p className="text-red-500 text-center mb-4">{error}</p>}

                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />

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

                <select value={role} onChange={(e) => setRole(e.target.value)} className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400">
                    <option value="Receptionist">Receptionist</option>
                    <option value="Staff">Department Staff</option>
                    <option value="Admin">Admin</option>
                </select>

                {role === 'Staff' && (
                    <select value={department} onChange={(e) => setDepartment(e.target.value)} className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400">
                        <option value="">Select Department</option>
                        {departments.map((dept) => (
                            <option key={dept._id} value={dept.name}>
                                {dept.name}
                            </option>
                        ))}
                    </select>
                )}

                <button
                    onClick={handleSignup}
                    className={`w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={loading}
                >
                    {loading ? 'Signing Up...' : 'Signup'}
                </button>
            </div>
        </div>
    );
}
