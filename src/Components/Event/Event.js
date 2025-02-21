import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import { Workflow } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "../Sidebar/Sidebar";

function Event() {
  const navigate = useNavigate();
  const [event, setEvent] = useState([]);
  const apiUrl = process.env.REACT_APP_API_URL;

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await axios.get(apiUrl + "/api/auth/getevents", {
          headers: {
            Authorization: `Bearer ${token}`, // Include token for authorization
          },
        });
        setEvent(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchEvent();
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric", // Optional, include this if you want seconds
      hour12: true,
    });
  };

  return (
    <div className="bg-zinc-100 min-h-screen pb-16">
      <div>
        <Navbar />
      </div>

      <div className="flex w-full">
        <div className="w-1/5">
          <Sidebar />
        </div>
        <div className="w-4/5">
          <div className="flex justify-between h-[40px] w-full mt-6 mb-6">
            <div className="font-medium text-xl ml-[30px]">
              Recommended Events
            </div>
            <div className="flex mr-[30px] gap-4">
              <button
                onClick={() => navigate("/createevent")}
                className="bg-black text-white rounded px-6 py-2 text-sm font-semibold shadow-lg hover:bg-[#3f0071] transition-transform transform hover:scale-105"
              >
                Create Events
              </button>
              <div className="border-[1px] border-gray-400 hover:cursor-pointer rounded text-sm justify-center font-medium items-center flex gap-2 p-1 pb-1 pl-2 pr-2">
                Most recent <Workflow />
              </div>
            </div>
          </div>

          <div className="w-full">
            <div className="flex flex-col gap-2">
              {event.map((event, index) => (
                <div className=" bg-white shadow-lg w-5/6 mx-auto rounded-2xl p-6 text-gray-800 border border-gray-200">
                  <p className="mb-2 flex gap-1">
                    {event.postedBy.name}
                    <span>({event.postedBy.role})</span>
                  </p>
                  <div className="flex justify-between items-start mb-2">
                    <h2 className="text-2xl font-bold text-blue-700">
                      {event.title}
                    </h2>
                    <span className="text-sm text-gray-600">
                      {formatDate(event.dateTime)}
                    </span>
                  </div>

                  <div className="mb-1">
                    <h3 className="text-lg font-semibold text-gray-700">
                      Topic:
                    </h3>
                    <p className="text-gray-600">{event.topic}</p>
                  </div>

                  <div className="mb-1">
                    <h3 className="text-lg font-semibold text-gray-700">
                      Organized by:
                    </h3>
                    <p className="text-gray-600">{event.organizedBy}</p>
                  </div>

                  <div className="mb-1">
                    <h3 className="text-lg font-semibold text-gray-700">
                      Format:
                    </h3>
                    <p className="text-gray-600">{event.format}</p>
                  </div>

                  <div className="mb-1">
                    <h3 className="text-lg font-semibold text-gray-700">
                      Join Link:
                    </h3>
                    <a
                      href={event.joinLink}
                      className="text-blue-500 hover:underline"
                    >
                      Click here to join
                    </a>
                  </div>
                  <div className="mb-1">
                    <h3 className="text-lg font-semibold text-gray-700">
                      About:
                    </h3>
                    <p className="text-gray-600">{event.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Event;
