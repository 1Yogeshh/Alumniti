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

      <div className="flex items-center justify-center h-full w-full mt-[350px] text-purple-700">
        <Loader className="animate-spin duration-[5000ms] mr-2 text-purple-700"  /> Please Wait Your Dashboard is Rendering
      </div>

    );
  }

  if (error) {
    return <div className="text-red-500 text-center p-4">Error: {error}</div>;
  }

  return (


    <div className="flex flex-col w-full min-h-screen bg-white pl-20 pr-20 pb-20">
      <table className="min-w-full min-h-screen bg-white">
        <h2 className="text-2xl font-bold mb-4 mt-4">
          Admin Dashboard For BFGI
        </h2>
        
        <tbody>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {users
              .slice()
              .reverse()
              .map((user, index) => (
                <div
                  key={user._id}
                  className="bg-white shadow-md rounded-lg border border-gray-300 h-[320px]"
                >
                  <div className="h-40 rounded-md bg-gradient-to-r from-[#0f0e0e] to-[#363636] flex justify-start items-end relative p-4">
                    <div className="text-[#484848] text-4xl mb-24 ml-[240px] font-bold">
                      #{index + 1}
                    </div>
                    <div className="absolute -bottom-6 left-4 rounded-full flex justify-center items-center bg-gradient-to-r from-[#7d53f0] to-[#4c62ed] h-20 w-20">
                      <CircleUserRound
                        size={100}
                        color="white"
                        className="rounded-full absolute"
                      />
                    </div>
                  </div>

                  <div className="mt-8 mb-2 ml-4 pr-2">
                    <h2 className="text-lg font-semibold text-gray-800 flex">
                      {user.name}
                      <p className="text-sm mt-1 ml-2">
                        {user.isApproved ? "☑️" : "⏳"}
                      </p>
                    </h2>
                    <p className="text-gray-600">
                      {user.role} | {user.email} | {user.college}
                    </p>
                    {!user.isApproved && (
                      <button
                        onClick={() => handleApprove(user._id)}
                        className="mt-3 ml-52 bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600 transition"
                      >
                        Approve
                      </button>
                    )}
                  </div>
                </div>
              ))}
          </div>

        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
