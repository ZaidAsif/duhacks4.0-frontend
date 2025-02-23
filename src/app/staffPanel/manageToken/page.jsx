'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { BASIC_URL } from '@/constant/constant';

export default function ManageToken() {
  const [tokens, setTokens] = useState([]);
  const [error, setError] = useState('');
  const [updateMessage, setUpdateMessage] = useState('');
  const [updates, setUpdates] = useState({});
  const [userToken, setUserToken] = useState(null); 

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem("token");
      if (token) {
        setUserToken(JSON.parse(token)); 
      }
    }
  }, []); 

  useEffect(() => {
    if (userToken) {
      const fetchTokens = async () => {
        try {
          const { data } = await axios.get(`${BASIC_URL}/tokens`, {
            headers: { Authorization: `Bearer ${userToken}` },
          });

          setTokens(data.data);
        } catch (err) {
          console.error('Error fetching tokens:', err);
          setError('Failed to fetch tokens.');
        }
      };
      fetchTokens();
    }
  }, [userToken]); 

  const handleChange = (tokenId, field, value) => {
    setUpdates((prev) => ({
      ...prev,
      [tokenId]: {
        ...prev[tokenId],
        [field]: value,
      },
    }));
  };

  const handleUpdate = async (tokenId) => {
    try {
      const status = updates[tokenId]?.status;
      const remarks = updates[tokenId]?.remarks;

      if (!userToken) {
        console.error('No token found in localStorage');
        setUpdateMessage('No token found. Please log in again.');
        return;
      }

      const { data } = await axios.put(`${BASIC_URL}/editTokens`, { status, remarks, _id: tokenId }, {
        headers: { Authorization: `Bearer ${userToken}` },
      });

      setUpdateMessage('Token updated successfully!');

      setTokens((prevTokens) =>
        prevTokens.map((token) =>
          token._id === tokenId
            ? { ...token, status: status || token.status, remarks: remarks || token.remarks }
            : token
        )
      );

      setUpdates((prev) => {
        const updated = { ...prev };
        delete updated[tokenId];
        return updated;
      });
    } catch (err) {
      console.error('Error updating token:', err);
      setUpdateMessage('Failed to update token.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="bg-white shadow-md rounded-lg w-full max-w-7xl p-6">
        <h1 className="text-2xl sm:text-3xl font-semibold text-green-600 mb-6">Manage Tokens</h1>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        {updateMessage && <p className="text-green-600 text-sm mb-4">{updateMessage}</p>}

        <div className="overflow-x-auto">
          <table className="w-full table-auto border-separate border-spacing-0 border border-gray-300">
            <thead>
              <tr>
                <th className="px-4 py-3 text-sm text-gray-700 font-medium border-b">Token</th>
                <th className="px-4 py-3 text-sm text-gray-700 font-medium border-b">Beneficiary</th>
                <th className="px-4 py-3 text-sm text-gray-700 font-medium border-b">Status</th>
                <th className="px-4 py-3 text-sm text-gray-700 font-medium border-b">Remarks</th>
                <th className="px-4 py-3 text-sm text-gray-700 font-medium border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tokens.length > 0 ? (
                tokens.map((token, index) => (
                  <tr key={token._id} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="px-4 py-3 text-sm text-gray-700 border-b">{token.token}</td>
                    <td className="px-4 py-3 text-sm text-gray-700 border-b">{token.beneficiary?.name || 'N/A'}</td>
                    <td className="px-4 py-3 text-sm border-b">
                      <select
                        value={updates[token._id]?.status || token.status}
                        onChange={(e) => handleChange(token._id, 'status', e.target.value)}
                        className="w-full p-2 border rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </td>
                    <td className="px-4 py-3 text-sm border-b">
                      <input
                        type="text"
                        value={updates[token._id]?.remarks || token.remarks || ''}
                        onChange={(e) => handleChange(token._id, 'remarks', e.target.value)}
                        placeholder="Add Remarks"
                        className="w-full p-2 border rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </td>
                    <td className="px-4 py-3 text-sm border-b text-center">
                      <button
                        onClick={() => handleUpdate(token._id)}
                        className="bg-green-600 text-white px-4 py-2 rounded-sm hover:bg-green-700 focus:ring-2 focus:ring-green-200 transition"
                      >
                        Save
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="px-4 py-3 text-center text-sm text-gray-500" colSpan="5">
                    No tokens found for your department.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
