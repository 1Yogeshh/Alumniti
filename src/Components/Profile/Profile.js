import React from "react";
import Navbar from "../Navbar/Navbar";
import pic from "../Assets/yogesh dp.jpg";
import "./Profile.css";
import {
  EllipsisVertical,
  Github,
  GraduationCap,
  Linkedin,
  MapPin,
  Pencil,
  School,
  SquarePen,
} from "lucide-react";
import { InstagramLogoIcon } from "@radix-ui/react-icons";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../Sidebar/Sidebar";

function Profile() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const user = token ? JSON.parse(atob(token.split(".")[1])) : null; // Decode JWT to get user info
  const isAdmin = user?.role === "admin";
  const isStudent = user?.role === "student";
  const isAlumni = user?.role === "alumni";
  const [profileData, setProfileData] = useState(null);
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    const token = localStorage.getItem("token");

    try {
      const endpoint = isAdmin
        ? "/api/auth/profile"
        : "/api/auth/profile-alumni"; // Use profile-alumni if applicable
      const res = await axios.get(apiUrl + `${endpoint}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Include token for authorization
        },
      });

      setProfileData(res.data[0]);
      console.log(res.data[0]);
      // Set the profile data based on the response
    } catch (err) {
      console.error(
        "Failed to fetch profile data:",
        err.response ? err.response.data : err.message
      );
    }
  };

  return (
    <div>
      <div>
        <Navbar />
      </div>

      <div className="flex w-full">
        <div className="w-1/5">
          <Sidebar />
        </div>
        <div className="bg-zinc-100 h-full flex flex-col items-center w-4/5">
          <div className="bg-white w-4/5 mt-[40px] rounded-lg mb-4 pb-8">
            <div className=" pt-[10px] h-[200px] pl-[50px] flex justify-between items-center rounded-t-lg relative">
              <div>
                <img
                  className="h-[150px] w-[150px] rounded-full border-4 border-white shadow-lg transform hover:scale-105 transition-transform duration-300 ease-in-out"
                  src={profileData?.img}
                  alt="user img"
                ></img>
              </div>
              <EllipsisVertical
                size={22}
                className="mt-[0px] hover:cursor-pointer mr-[50px] text-black hover:scale-125 transition-transform duration-200 ease-in-out"
              />
            </div>

            <div className="mt-[10px] w-4/5 font-bold text-2xl ml-[50px] text-gray-800">
              {profileData ? profileData.name : "Loading..."}
              <p className="text-sm tracking-wide font-medium text-gray-500">
                {" "}
                {profileData ? profileData.role : "Loading..."}
              </p>
            </div>

            <div className="ml-[50px] flex gap-2 text-sm mt-2 text-gray-600 items-center">
              <MapPin size={18} className="text-black" />
              <span className="font-medium">
                {profileData ? profileData.location : "loading"}
              </span>
            </div>

            <div className="ml-[50px] text-sm mt-2 text-gray-700">
              {profileData?.currentjob}.{" "}
              <span className="text-gray-500">Full-time</span>
            </div>

            <div className="ml-[50px] mt-4 flex gap-4 font-medium">
              <button
                onClick={() => navigate("/update")}
                className="bg-gradient-to-r from-black to-black flex justify-center items-center gap-2 text-white py-2 px-4 rounded-lg  hover:shadow-lg transform hover:scale-105 transition-transform duration-300"
              >
                <Pencil size={18} />
                Edit
              </button>

              <a
                href={profileData?.portfolio}
                className=" py-2 px-4 rounded-lg shadow-lg bg-zinc-100  hover:shadow-lg transform hover:scale-105 transition-transform duration-300"
              >
                Portfolio
              </a>
            </div>
          </div>

          <div className="bg-white w-4/5 mt-[20px] pb-4 rounded-lg mb-4">
            <div className="font-medium ml-[50px] mt-[10px]">About</div>
            <div className="w-[800px] ml-[50px] mt-2 text-sm">
              {profileData?.about}
            </div>
          </div>

          <div className="bg-white w-4/5 mt-[20px] pb-4 rounded-lg mb-4">
            <div className="font-medium ml-[50px] mt-[10px]">Education</div>

            <div className="flex gap-2 ml-[50px] mt-4 flex-col">
              {profileData &&
                profileData.education &&
                profileData.education.map((education, index) => (
                  <div className="flex">
                    <div className="bg-red-500 p-2 rounded-lg h-[45px] flex justify-center items-center w-[45px] mt-1">
                      <GraduationCap color="white" />
                    </div>
                    <div className="ml-2 mt-1" key={index}>
                      <p className="font-medium text-[16px] gap-2 flex">
                        {education.name}
                        <span className="text-gray-400">
                          ({education.year})
                        </span>
                      </p>
                      <p className="text-sm">{education.degree}</p>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          <div className="bg-white w-4/5 mt-[20px] pb-4 rounded-lg mb-4">
            <div className="font-medium ml-[50px] mt-[10px]">Skills</div>
            <div className="flex flex-wrap ml-[50px] gap-4 mt-4 text-sm">
              {profileData &&
                profileData.skills &&
                profileData.skills.map((skill, index) => (
                  <p
                    key={index}
                    className="border-[2px] rounded-lg p-1 w-[120px] justify-center flex border-gray-300"
                  >
                    {skill}
                  </p>
                ))}
            </div>
          </div>

          <div className="bg-white w-4/5 mt-[20px] pb-4 rounded-lg mb-4">
            <div className="font-medium ml-[50px] mt-[10px]">
              Employment history
            </div>
            {profileData &&
              profileData.jobs &&
              profileData.jobs.map((job, index) => (
                <div>
                  <div className="flex mt-4 gap-2">
                    <div className="bg-[#5b23d7] p-2 rounded-lg h-[40px] w-[40px] ml-[50px] mt-1">
                      <Linkedin color="white" />
                    </div>
                    <div>
                      <p className="font-medium">{job.title}</p>
                      <p className="text-sm">{job.company} Ful-time</p>
                    </div>
                  </div>
                  <div className="ml-[100px] mt-1 text-gray-400 text-sm">
                    {new Date(job.startDate).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}{" "}
                    -
                    {new Date(job.endDate).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </div>
                  <div className="ml-[100px] mt-2 text-sm w-[800px]">
                    {job.description}
                  </div>
                </div>
              ))}
          </div>

          <div className="bg-white w-4/5 mt-[20px] pb-4 rounded-lg mb-16">
            <div className="flex justify-center items-center mt-4 gap-6">
              <a href={profileData?.github}>
                <Github className="text-[#5b23d7] border-[2px] rounded h-[40px] w-[40px] p-2 border-[#5b23d7]" />
              </a>
              <a href={profileData?.linkdin}>
                <Linkedin className="text-[#5b23d7] border-[2px] rounded h-[40px] w-[40px] p-2 border-[#5b23d7]" />
              </a>
              <a href={profileData?.email}>
                <SquarePen className="text-[#5b23d7] border-[2px] rounded h-[40px] w-[40px] p-2 border-[#5b23d7]" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
