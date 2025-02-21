import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import axios from "axios";

function CreateCollaboration() {
  const [collabTitle, setCollabTitle] = useState("");
  const [RoleNeed, setRoleNeed] = useState("");
  const [skills, setSkills] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const apiUrl = process.env.REACT_APP_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        apiUrl + "/api/auth/createcollab",
        { collabTitle, RoleNeed, skills, startDate, endDate },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Pass the token for authentication
          },
        }
      );
      alert("collabration create successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="pb-20 bg-zinc-100">
      <Navbar />

      <div className="bg-zinc-100 pt-4 pb-20 flex flex-col items-center">
        <div className="w-full max-w-2xl px-4">
          <h1 className="text-3xl font-bold mb-8 text-center">
            Create Collaboration
          </h1>
          <div className="bg-white shadow-lg rounded-2xl p-8 border border-gray-200">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="projectName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Project Name
                </label>
                <input
                  type="text"
                  id="projectName"
                  onChange={(e) => setCollabTitle(e.target.value)}
                  className="mt-1 block outline-none p-1 w-full border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="rolesNeeded"
                  className="block text-sm font-medium text-gray-700"
                >
                  Roles Needed
                </label>
                <textarea
                  id="rolesNeeded"
                  onChange={(e) => setRoleNeed(e.target.value)}
                  rows="4"
                  className="mt-1 block p-1 outline-none w-full border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="skillsRequired"
                  className="block text-sm font-medium text-gray-700"
                >
                  Skills Required
                </label>
                <textarea
                  id="skillsRequired"
                  onChange={(e) => setSkills(e.target.value)}
                  rows="4"
                  className="mt-1 block w-full outline-none p-1 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                  required
                />
              </div>

              <div className="flex gap-4">
                <div className="flex-1">
                  <label
                    htmlFor="startDate"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Start Date
                  </label>
                  <input
                    type="date"
                    id="startDate"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                    required
                  />
                </div>

                <div className="flex-1">
                  <label
                    htmlFor="endDate"
                    className="block text-sm font-medium text-gray-700"
                  >
                    End Date
                  </label>
                  <input
                    type="date"
                    id="endDate"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                    required
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="bg-purple-600 text-white w-full py-2 rounded-lg font-semibold shadow-lg hover:bg-purple-700 transition duration-200"
                >
                  Create Collaboration
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateCollaboration;
