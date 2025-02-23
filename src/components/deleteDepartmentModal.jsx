"use client";

import axios from "axios";
import { useState } from "react";
import { BASIC_URL } from "@/constant/constant";

export default function DeleteDepartmentModal({ departmentId, onClose, onDeleteSuccess }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleDelete = async () => {
    setLoading(true);
    setError("");

    try {
      await axios.delete(`${BASIC_URL}/admin/department/delete/${departmentId}`, {
        headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}` },
      });

      onDeleteSuccess(departmentId);
      alert("Department deleted successfully!");
      onClose();
    } catch (error) {
      console.error("Error deleting department:", error);
      setError("Cannot delete department with assigned staff.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md sm:w-11/12 md:w-96">
        <h2 className="text-xl font-bold mb-4 text-center">Confirm Deletion</h2>
        <p className="text-gray-700 text-center mb-6">
          Are you sure you want to delete this department? This action is irreversible.
        </p>

        {error && <p className="text-red-600 text-center mb-4">{error}</p>}

        <div className="flex justify-center space-x-4">
          <button
            onClick={handleDelete}
            disabled={loading}
            className={`${loading ? "bg-gray-400" : "bg-red-600"} text-white px-4 py-2 rounded hover:bg-red-700`}
          >
            {loading ? "Deleting..." : "Yes, Delete"}
          </button>
          <button onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
