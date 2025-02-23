"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { BASIC_URL } from "@/constant/constant";
import DeleteUserModal from "@/components/deleteUserModal";  

export default function DisplayUsers() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null); 
  const [userToken, setUserToken] = useState(null); 
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) {
        setUserToken(JSON.parse(token));
      }
    }
  }, []);

  useEffect(() => {
    if (userToken) {
      const fetchUsers = async () => {
        try {
          const { data } = await axios.get(`${BASIC_URL}/admin/users`, {
            headers: { Authorization: `Bearer ${userToken}` },
          });
          setUsers(data.data);
        } catch (err) {
          setError("Failed to fetch users.");
          console.error("Error fetching users:", err);
        } finally {
          setLoading(false);
        }
      };
      fetchUsers();
    }
  }, [userToken]);

  const handleDeleteSuccess = (userId) => {
    setUsers(users.filter(user => user._id !== userId)); 
  };

  return (
    <div className="p-6">
      <div className="flex justify-start mb-4">
        <button 
          onClick={() => router.push('/adminPanel')} 
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-all"
        >
          Back
        </button>
      </div>
      <h1 className="text-2xl font-bold text-center">User Management</h1>

      {error && <p className="text-red-500 text-center">{error}</p>}
      {loading ? (
        <p className="text-center text-gray-500">Loading users...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead className="bg-green-600 text-white">
              <tr>
                <th className="border p-2">Name</th>
                <th className="border p-2">Email</th>
                <th className="border p-2">Role</th>
                <th className="border p-2">Department</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((user) => (
                  <tr key={user._id} className="hover:bg-gray-100">
                    <td className="border p-2">{user.name}</td>
                    <td className="border p-2">{user.email}</td>
                    <td className="border p-2">{user.role}</td>
                    <td className="border p-2">{user.department || "N/A"}</td>
                    <td className="border p-2 space-x-2 flex justify-between">
                      <button
                        onClick={() => router.push(`/adminPanel/users/user/${user._id}`)}
                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                      >
                        View
                      </button>

                      <button
                        onClick={() => setSelectedUser(user)}
                        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center border p-4">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {selectedUser && (
        <DeleteUserModal
          userId={selectedUser._id}
          onClose={() => setSelectedUser(null)} 
          onDeleteSuccess={handleDeleteSuccess} 
        />
      )}
    </div>
  );
}
