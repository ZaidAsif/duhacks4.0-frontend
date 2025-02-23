"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { BASIC_URL } from "@/constant/constant";

export default function AddDepartment() {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
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

  const handleSubmit = async () => {
    setError("");
    setSuccess("");

    if (!name) {
      setError("Department name is required.");
      return;
    }

    if (!userToken) {
      setError("User is not authenticated.");
      return;
    }

    try {
      await axios.post(
        `${BASIC_URL}/admin/department/add`,
        { name },
        { headers: { Authorization: `Bearer ${userToken}` } }
      );
      setSuccess("Department added successfully!");
      setTimeout(() => router.push("/adminPanel/departments"), 2000);
    } catch (err) {
      setError("Error adding department.");
      console.error("Error:", err);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 bg-white p-6 shadow-md rounded-lg">
      <h1 className="text-xl font-bold mb-4 text-green-700">Add Department</h1>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}
      <input
        type="text"
        placeholder="Department Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full p-2 border rounded mb-4"
      />
      <button
        onClick={handleSubmit}
        className="bg-green-500 text-white px-4 py-2 rounded w-full"
      >
        Add Department
      </button>
    </div>
  );
}
