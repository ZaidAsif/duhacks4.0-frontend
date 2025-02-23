"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter, useParams } from "next/navigation";
import { BASIC_URL } from "@/constant/constant";

export default function EditDepartment() {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();
  const userToken = JSON.parse(localStorage.getItem("token"));

  useEffect(() => {
    const fetchDepartment = async () => {
      try {
        const { data } = await axios.get(`${BASIC_URL}/admin/department/${id}`, {
          headers: { Authorization: `Bearer ${userToken}` },
        });
        setName(data.data.name);
      } catch (err) {
        setError("Failed to fetch department.");
      }
    };
    fetchDepartment();
  }, [id]);

  const handleUpdate = async () => {
    if (!name) {
      setError("Department name is required.");
      return;
    }

    try {
      await axios.put(
        `${BASIC_URL}/admin/department/edit/${id}`,
        { name },
        { headers: { Authorization: `Bearer ${userToken}` } }
      );
      setSuccess("Department updated successfully!");
      setTimeout(() => router.push("/adminPanel/departments"), 2000);
    } catch (err) {
      setError("Error updating department.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 bg-white p-6 shadow-md rounded-lg">

      <h1 className="text-2xl font-bold mb-4 text-center text-blue-600">Edit Department</h1>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      {success && <p className="text-green-500 text-center mb-4">{success}</p>}

      <div className="mb-4">
        <input
          type="text"
          placeholder="Department Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button
        onClick={handleUpdate}
        className="w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
      >
        Save Changes
      </button>
    </div>
  );
}
