'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { BASIC_URL } from '@/constant/constant';

export default function ScanToken() {
  const [token, setToken] = useState('');
  const [beneficiaryDetails, setBeneficiaryDetails] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [userToken, setUserToken] = useState(null); 

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem("token");
      if (token) {
        setUserToken(JSON.parse(token)); 
      }
    }
  }, []); 

  const handleScan = async () => {
    if (!token) {
      setError('Token cannot be empty.');
      return;
    }

    if (!userToken) {
      setError('No token found. Please log in again.');
      return;
    }

    try {
      setError('');
      setLoading(true);
      setBeneficiaryDetails(null);

      const { data } = await axios.post(
        `${BASIC_URL}/findToken`,
        { token },
        { headers: { Authorization: `Bearer ${userToken}` } }
      );

      if (data.error && data.msg.includes('Access denied')) {
        setError(data.msg); 
      } else {
        setBeneficiaryDetails(data.data);
      }
    } catch (err) {
      console.error('Error scanning token:', err);
      setError(err.response?.data?.msg || 'Token not found. Please check the token and try again.');
    } finally {
      setLoading(false);
    }
  };

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return 'N/A';
    const date = new Date(timestamp);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50 p-6">
      <div className="bg-white shadow-lg rounded-xl w-full max-w-md sm:max-w-lg md:max-w-xl p-8">
        <h1 className="text-2xl sm:text-3xl font-semibold text-center text-green-600 mb-6">Scan Token</h1>
        
        <input
          type="text"
          placeholder="Enter Token"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition ease-in-out mb-4"
        />

        <button
          onClick={handleScan}
          className={`w-full p-3 rounded-lg text-white font-medium transition ease-in-out duration-300 
            ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-200'}`}
          disabled={loading}
        >
          {loading ? 'Scanning...' : 'Scan Token'}
        </button>

        {error && <p className="text-red-500 text-sm mt-4 text-center">{error}</p>}

        {beneficiaryDetails && (
          <div className="mt-6 p-6 bg-green-50 rounded-lg shadow-md space-y-4">
            <h2 className="font-bold text-lg sm:text-xl md:text-2xl text-green-600">Beneficiary Details</h2>
            <div className="space-y-2 text-gray-700">
              <p><strong>Name:</strong> {beneficiaryDetails.beneficiary.name}</p>
              <p><strong>CNIC:</strong> {beneficiaryDetails.beneficiary.cnic}</p>
              <p><strong>Department:</strong> {beneficiaryDetails.department}</p>
              <p><strong>Status:</strong> {beneficiaryDetails.status}</p>
              <p><strong>Remarks:</strong> {beneficiaryDetails.remarks || 'None'}</p>
              <p><strong>Token Created At:</strong> {formatTimestamp(beneficiaryDetails.createdAt)}</p>
              <p><strong>Last Updated At:</strong> {formatTimestamp(beneficiaryDetails.updatedAt)}</p>
            </div>

            <div className="mt-4">
              <h3 className="font-semibold text-lg sm:text-xl text-gray-800">Assistance History:</h3>
              {beneficiaryDetails.beneficiary.assistanceHistory.length > 0 ? (
                <ul className="list-disc pl-6 space-y-2">
                  {beneficiaryDetails.beneficiary.assistanceHistory.map((history, index) => (
                    <li key={index} className="space-y-1">
                      <p><strong>Date:</strong> {formatTimestamp(history.date)}</p>
                      <p><strong>Department:</strong> {history.department}</p>
                      <p><strong>Status:</strong> {history.status}</p>
                      <p><strong>Remarks:</strong> {history.remarks || 'None'}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No assistance history found.</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
