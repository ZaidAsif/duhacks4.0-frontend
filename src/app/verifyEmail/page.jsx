'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';
import { BASIC_URL } from '@/constant/constant';

export default function VerifyEmail() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams.get('token');
    const [status, setStatus] = useState('verifying');
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (!token) return;

        const verifyEmail = async () => {
            try {
                const { data } = await axios.post(`${BASIC_URL}/verifyEmail`, {}, {
                    headers: { token },
                });
                setStatus('success');
                setMessage(data.msg || 'Email verified successfully!');
            } catch (error) {
                setStatus('error');
                setMessage(
                    error.response?.data?.msg || 'Invalid or expired verification link.'
                );
            }
        };

        verifyEmail();
    }, [token]);

    useEffect(() => {
        if (status === 'success') {
            router.push('/');
        }
    }, [status]);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-6 py-12">
            <div className="bg-white rounded-lg shadow-md p-8 w-full sm:w-96">
                {status === 'verifying' && (
                    <h1 className="text-2xl font-semibold text-gray-700 text-center mb-6">Verifying your email...</h1>
                )}
                {status === 'success' && (
                    <h1 className="text-2xl font-semibold text-green-600 text-center mb-6">{message}</h1>
                )}
                {status === 'error' && (
                    <h1 className="text-2xl font-semibold text-red-600 text-center mb-6">{message}</h1>
                )}
                <div className="flex justify-center mt-6">
                    <button
                        onClick={() => router.push('/login')}
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-700 transition duration-300"
                    >
                        Go to Login
                    </button>
                </div>
            </div>
        </div>
    );
}
