'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { BASIC_URL } from '@/constant/constant';

export default function RegisterBeneficiary() {
    const [name, setName] = useState('');
    const [cnic, setCnic] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [purpose, setPurpose] = useState('');
    const [department, setDepartment] = useState('');
    const [token, setToken] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [departments, setDepartments] = useState([]); 

    useEffect(() => {
        const fetchDepartments = async () => {
            try {
                const { data } = await axios.get(`${BASIC_URL}/admin/department/all`, {
                    headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}` },
                });
                setDepartments(data.data);
            } catch (err) {
                console.error('Error fetching departments:', err);
            }
        };

        fetchDepartments();
    }, []);

    const handleSubmit = async () => {
        setError('');
        setLoading(true);

        if (!name || !cnic || !email || !phone || !address || !purpose || !department) {
            setError("All fields are required");
            setLoading(false);
            return;
        }

        try {
            const { data } = await axios.post(`${BASIC_URL}/beneficiary/register`, {
                name,
                cnic,
                email,
                phone,
                address,
                purpose,
                department,
            });
            setToken(data.data.token);
            setLoading(false);
            console.log(data);
        } catch (error) {
            setError(error.response ? error.response.data.message : "An error occurred. Please try again.");
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center mt-10 max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h1 className="text-2xl font-bold mb-6 text-center">Register Beneficiary</h1>

            {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

            <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mb-4 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
                type="text"
                name="cnic"
                placeholder="CNIC"
                value={cnic}
                onChange={(e) => setCnic(e.target.value)}
                className="mb-4 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
                type="email"
                name="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mb-4 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="mb-4 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
                type="text"
                name="address"
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="mb-4 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
                type="text"
                name="purpose"
                placeholder="Purpose of Assistance"
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                className="mb-4 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <select
                name="department"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="mb-4 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
                <option value="">Select Department</option>
                {departments.map((dept) => (
                    <option key={dept._id} value={dept.name}>
                        {dept.name}
                    </option>
                ))}
            </select>

            <button
                onClick={handleSubmit}
                className={`w-full p-3 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={loading}
            >
                {loading ? (
                    <span>Loading...</span>
                ) : (
                    <span>Generate Token</span>
                )}
            </button>

            {token && (
                <div className="mt-4 text-center">
                    <p className="text-green-500">Generated Token: <strong>{token}</strong></p>
                </div>
            )}
        </div>
    );
}
