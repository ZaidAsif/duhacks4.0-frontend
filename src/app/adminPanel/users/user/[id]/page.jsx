"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";
import { BASIC_URL } from "@/constant/constant";

export default function UserDetails() {
  const { id } = useParams();
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(""); 
  const [success, setSuccess] = useState(""); 
  const [editData, setEditData] = useState({});
  const [departments, setDepartments] = useState([]); 

  const userToken = JSON.parse(localStorage.getItem("token"));

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get(`${BASIC_URL}/admin/users/${id}`, {
          headers: { Authorization: `Bearer ${userToken}` },
        });
        setUser(data.data);
        setEditData(data.data);
      } catch (err) {
        setError("User not found.");
        console.error("Error fetching user:", err);
      } finally {
        setLoading(false);
      }
    };

    const fetchDepartments = async () => {
      try {
        const { data } = await axios.get(`${BASIC_URL}/admin/department/all`, {
          headers: { Authorization: `Bearer ${userToken}` },
        });
        setDepartments(data.data);
      } catch (err) {
        console.error("Error fetching departments:", err);
      }
    };

    fetchUser();
    fetchDepartments();
  }, [id]);

  const handleUpdate = async () => {
    try {
      await axios.put(`${BASIC_URL}/admin/editUser/${id}`, editData, {
        headers: { Authorization: `Bearer ${userToken}` },
      });

      setSuccess("User updated successfully!");
      setTimeout(() => {
        setSuccess("");
        router.push("/adminPanel/users");
      }, 3000);
    } catch (err) {
      setError("Failed to update user.");
      setTimeout(() => {
        setError("");
        router.push("/adminPanel/users");
      }, 3000);
      console.error("Error updating user:", err);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg mt-8 rounded-lg">
      <h1 className="text-2xl font-bold mb-6 text-center text-green-600">User Details</h1>

      {success && (
        <div className="bg-green-500 text-white text-center p-3 mb-6 rounded-lg shadow-md">
          {success}
        </div>
      )}
      {error && (
        <div className="bg-red-500 text-white text-center p-3 mb-6 rounded-lg shadow-md">
          {error}
        </div>
      )}

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : (
        <>
          <div className="mb-4">
            <label className="block font-medium text-gray-700">Name:</label>
            <input
              type="text"
              value={editData.name}
              onChange={(e) => setEditData({ ...editData, name: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>
          
          <div className="mb-4">
            <label className="block font-medium text-gray-700">Role:</label>
            <select
              value={editData.role}
              onChange={(e) => setEditData({ ...editData, role: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            >
              <option value="Admin">Admin</option>
              <option value="Receptionist">Receptionist</option>
              <option value="Staff">Staff</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block font-medium text-gray-700">Department:</label>
            <select
              value={editData.department || ""}
              onChange={(e) => setEditData({ ...editData, department: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            >
              <option value="none">none</option>
              {departments.map((dept) => (
                <option key={dept._id} value={dept.name}>
                  {dept.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-center mt-6">
            <button
              onClick={handleUpdate}
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 transition-all"
            >
              Save Changes
            </button>
          </div>
        </>
      )}
    </div>
  );
}
