import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../services/api";

/**
 * Axios instance
 */
const api = axios.create({
  baseURL: `${API_URL}/api/user`,
  headers: {
    "Content-Type": "application/json",
  },
});

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  /**
   * Fetch all users
   */
  const fetchUsers = async () => {
    try {
      const res = await api.get("/users");
      setUsers(res.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  /**
   * Delete user by email
   */
  const deleteUser = async (email) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      await api.delete("/profile", {
        data: { email },
      });

      setUsers((prev) => prev.filter((u) => u.email !== email));
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete user");
    }
  };

  if (loading) return <p>Loading users...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
  <div className="p-6 bg-gray-50 min-h-screen">
  <h2 className="text-2xl font-bold text-gray-800 mb-6">User Management</h2>

  <div className="overflow-x-auto bg-white rounded-lg shadow">
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-primary ">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-secondary border-r border-gray-100 uppercase tracking-wider">
            Name
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-secondary border-r border-gray-100 uppercase tracking-wider">
            Email
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-secondary border-r border-gray-100 uppercase tracking-wider">
            WhatsApp
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-secondary border-r border-gray-100 uppercase tracking-wider">
            Alternate No.
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-secondary border-r border-gray-100 uppercase tracking-wider">
            College
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-secondary border-r border-gray-100 uppercase tracking-wider">
            University
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-secondary border-r border-gray-100 uppercase tracking-wider">
            Date of Admission
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-secondary border-r border-gray-100 uppercase tracking-wider">
            Synopsis Date
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-secondary border-r border-gray-100 uppercase tracking-wider">
            Actions
          </th>
        </tr>
      </thead>

      <tbody className="bg-white divide-y divide-gray-200">
        {users.length === 0 ? (
          <tr>
            <td colSpan="9" className="px-6 py-12 text-center">
              <div className="flex flex-col items-center justify-center text-gray-500">
                <svg
                  className="w-12 h-12 mb-3 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13 0a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
                <span className="text-lg font-medium">No users found</span>
              </div>
            </td>
          </tr>
        ) : (
          users.map((user) => (
            <tr
              key={user._id}
              className="hover:bg-gray-50 transition-colors duration-150"
            >
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">
                  {user.firstName} {user.lastName}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{user.email}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{user.whatsappNumber}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{user.alternateNumber || "N/A"}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{user.collegeName}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{user.universityName}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">
                  {user.dateOfAdmission
                    ? new Date(user.dateOfAdmission).toLocaleDateString()
                    : "N/A"}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">
                  {user.synopsisSubmissionDate
                    ? new Date(user.synopsisSubmissionDate).toLocaleDateString()
                    : "N/A"}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button
                  onClick={() => deleteUser(user.email)}
                  className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  </div>
</div>
  );
}

export default UserManagement;
