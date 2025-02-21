import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import axios from "axios";

function CreateEventPage() {
  const [title, setTitle] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [topic, setTopic] = useState("");
  const [organizedBy, setOrganizedBy] = useState("");
  const [format, setFormat] = useState("");
  const [joinLink, setJoinLink] = useState("");
  const [description, setDescription] = useState("");
  const apiUrl = process.env.REACT_APP_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        apiUrl + "/api/auth/createevent",
        { title, dateTime, topic, organizedBy, format, joinLink, description },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Pass the token for authentication
          },
        }
      );
      alert("event create successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-zinc-100 min-h-screen">
      <Navbar />
      <div className="container w-[800px] mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 flex justify-center">
          Create New Event
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-lg rounded-2xl p-6 text-gray-800 border border-gray-200"
        >
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Event Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Date & Time
              </label>
              <input
                type="datetime-local"
                value={dateTime}
                onChange={(e) => setDateTime(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Topic
              </label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Organized By
              </label>
              <input
                type="text"
                value={organizedBy}
                onChange={(e) => setOrganizedBy(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Format
              </label>
              <input
                type="text"
                value={format}
                onChange={(e) => setFormat(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Join Link
              </label>
              <input
                type="url"
                value={joinLink}
                onChange={(e) => setJoinLink(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg"
                rows="4"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-[#5b23d7] text-white w-full rounded-lg px-6 py-2 text-sm font-semibold shadow-lg hover:bg-[#3f0071] transition-transform transform hover:scale-105"
            >
              Create Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateEventPage;
