"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { BASIC_URL } from "@/constant/constant";
import DeleteDepartmentModal from "@/components/deleteDepartmentModal";

export default function DisplayDepartments() {
  const [departments, setDepartments] = useState([]);
  const [error, setError] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState(null);
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
      const fetchDepartments = async () => {
        try {
          const { data } = await axios.get(`${BASIC_URL}/admin/department/all`, {
            headers: { Authorization: `Bearer ${userToken}` },
          });
          setDepartments(data.data);
        } catch (err) {
          setError("Failed to fetch departments.");
          console.error("Error fetching departments:", err);
        }
      };
      fetchDepartments();
    }
  }, [userToken]); 

  const handleDeleteSuccess = (departmentId) => {
    setDepartments(departments.filter((dept) => dept._id !== departmentId));
  };

  return (
    <div className="p-6">
      <div className="flex justify-start mb-4">
        <button
          onClick={() => router.push("/adminPanel")}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-all"
        >
          Back
        </button>
      </div>

      <h1 className="text-2xl font-bold mb-6 text-center">Department Management</h1>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      <div className="text-center mb-6">
        <button
          onClick={() => router.push("/adminPanel/departments/addDepartment")}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-all"
        >
          Add New Department
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse border border-gray-300">
          <thead className="bg-green-600 text-white">
            <tr>
              <th className="border p-2 text-left">Department Name</th>
              <th className="border p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {departments.length > 0 ? (
              departments.map((dept) => (
                <tr key={dept._id} className="hover:bg-gray-100">
                  <td className="border p-2">{dept.name}</td>
                  <td className="border p-2 space-x-4">
                    <button
                      onClick={() => router.push(`/adminPanel/departments/department/${dept._id}`)}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => setSelectedDepartment(dept)} 
                      className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-all"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2" className="text-center border p-4">No departments found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {selectedDepartment && (
        <DeleteDepartmentModal
          departmentId={selectedDepartment._id}
          onClose={() => setSelectedDepartment(null)}
          onDeleteSuccess={handleDeleteSuccess}
        />
      )}
    </div>
  );
}
