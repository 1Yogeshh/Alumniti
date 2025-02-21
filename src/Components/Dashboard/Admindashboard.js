import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem("token");
      console.log(token);

      if (!token) {
        setError("No token found. Please log in.");
        setLoading(false);
        window.location.href = "/login"; // Redirect to login
        return;
      }

      try {
        const response = await axios.get(apiUrl + "/api/auth/users", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(response.data);
      } catch (error) {
        if (error.response && error.response.status === 403) {
          setError("You are not authorized to access this page.");
        } else if (error.response && error.response.status === 401) {
          setError("Session expired. Please log in again.");
          localStorage.removeItem("token");
          window.location.href = "/login";
        } else {
          setError("An unexpected error occurred.");
        }
        console.error("Fetch Users Error:", error.response);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleApprove = async (userId) => {
    if (!window.confirm("Are you sure you want to approve this user?")) return;

    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        apiUrl + `/api/auth/approve/${userId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("User approved successfully");
      setUsers(
        users.map((user) =>
          user._id === userId ? { ...user, isApproved: true } : user
        )
      );
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Error approving user";
      alert(errorMessage);
      console.error("Approval Error:", error.response);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">Loading...</div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center p-4">Error: {error}</div>;
  }

  return (
    <div className="flex flex-col w-full min-h-screen p-4 bg-gray-100">
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
      <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-2 px-4 border-b border-gray-300 text-left">
              Sr No.
            </th>
            <th className="py-2 px-4 border-b border-gray-300 text-left">
              Name
            </th>
            <th className="py-2 px-4 border-b border-gray-300 text-left">
              Email Address
            </th>
            <th className="py-2 px-4 border-b border-gray-300 text-left">
              Role
            </th>
            <th className="py-2 px-4 border-b border-gray-300 text-left">
              College
            </th>
            <th className="py-2 px-4 border-b border-gray-300 text-left">
              Approval Status
            </th>
            <th className="py-2 px-4 border-b border-gray-300 text-left">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user._id} className="hover:bg-gray-100">
              <td className="py-2 px-4 border-b border-gray-300">
                {index + 1}
              </td>
              <td className="py-2 px-4 border-b border-gray-300">
                {user.name}
              </td>
              <td className="py-2 px-4 border-b border-gray-300">
                {user.email}
              </td>
              <td className="py-2 px-4 border-b border-gray-300">
                {user.role}
              </td>
              <td className="py-2 px-4 border-b border-gray-300">
                {user.college}
              </td>
              <td className="py-2 px-4 border-b border-gray-300">
                {user.isApproved ? "Approved" : "Pending"}
              </td>
              <td className="py-2 px-4 border-b border-gray-300">
                {!user.isApproved && (
                  <button
                    onClick={() => handleApprove(user._id)}
                    className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600 transition"
                  >
                    Approve
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
