import axios from "axios";
import {
  Calendar,
  ChevronRight,
  History,
  IndianRupee,
  Instagram,
  LinkedinIcon,
  MapPin,
  Sparkle,
  Workflow,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function HeroJob() {
  const navigate = useNavigate();
  const [job, setJob] = useState([]);
  const apiUrl = process.env.REACT_APP_API_URL;

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await axios.get(apiUrl + "/api/auth/getjobs", {
          headers: {
            Authorization: `Bearer ${token}`, // Include token for authorization
          },
        });
        setJob(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchJob();
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="bg-zinc-100 mt-4 pb-20 flex flex-col min-h-screen">
      <div className="flex justify-between items-center">
        <div className="font-medium text-xl ml-[30px]">Recommended jobs</div>
        <div className="flex mr-[30px] gap-4">
          <button
            onClick={() => navigate("/createjob")}
            className="bg-black text-white rounded px-6 py-2 text-sm font-semibold shadow-lg hover:bg-[#3f0071] transition-transform transform hover:scale-105"
          >
            Create Job
          </button>
          <div className="border-[1px] border-gray-400 hover:cursor-pointer rounded text-sm justify-center font-medium items-center flex gap-2 p-1 pb-1 pl-2 pr-2">
            Most recent <Workflow />
          </div>
        </div>
      </div>

      <div className="flex gap-14">
        <div className="bg-white shadow-lg w-[330px] h-[300px] rounded-lg ml-[30px] mt-8 p-4">
          <div className="text-center font-medium text-lg text-black mb-4">
            Filters
          </div>

          <div className="text-sm font-semibold text-gray-700 mb-2">
            Profile
          </div>
          <div className="border border-gray-300 rounded-lg p-2">
            <input
              type="text"
              className="text-sm outline-none w-full"
              placeholder="e.g. React Developer"
            />
          </div>

          <div className="text-sm font-semibold text-gray-700 mt-4 mb-2">
            Location
          </div>
          <div className="border border-gray-300 rounded-lg p-2">
            <input
              type="text"
              className="text-sm outline-none w-full"
              placeholder="e.g. Delhi"
            />
          </div>

          <div className="flex items-center gap-2 mt-4 text-sm">
            <input
              type="checkbox"
              id="work-from-home"
              className="form-checkbox"
              aria-label="Work from home"
            />
            <label htmlFor="work-from-home" className="text-gray-700">
              Work from home
            </label>
          </div>

          <div className="flex items-center gap-2 mt-2 text-sm">
            <input
              type="checkbox"
              id="part-time"
              className="form-checkbox"
              aria-label="Part time"
            />
            <label htmlFor="part-time" className="text-gray-700">
              Part time
            </label>
          </div>

          <div className="text-right mt-6">
            <span className="text-blue-700 cursor-pointer hover:underline">
              Clear all
            </span>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-6">
          {job.map((job, index) => (
            <div
              key={index}
              className="bg-white shadow-lg w-[750px] rounded-lg flex p-6 justify-between items-start hover:cursor-pointer"
            >
              <div className="flex-1">
                <div className="font-medium mb-4 text-gray-800">
                  {job.postedBy.name}
                  <span className="text-gray-400 ml-1">
                    ({job.postedBy.role})
                  </span>
                </div>
                <div className="font-semibold text-xl text-gray-800">
                  {job.jobTitle}
                </div>
                <a
                  href={job.companyWebsite}
                  className="text-sm text-blue-700 font-medium mt-1"
                >
                  {job.companyName}
                </a>
                <div className="text-sm text-gray-500 mt-1">
                  {job.jobDescription}
                </div>
                <div className="flex gap-6 mt-4">
                  <div className="flex gap-1 text-sm text-gray-700">
                    <MapPin size={18} />
                    {job.location}
                  </div>
                  <div className="flex text-sm text-gray-700 gap-1">
                    <Calendar size={18} />
                    {job.jobType}
                  </div>
                  <div className="flex text-sm text-gray-700 gap-1">
                    <IndianRupee size={18} />
                    {job.salary}
                  </div>
                </div>
                <div className="flex mt-4">
                  <div
                    className={` text-gray-400 rounded-full px-2 py-1 text-[13px] flex items-center gap-2`}
                  >
                    <History className="text-gray-400" size={13} />
                    {formatDate(job.datePosted)}
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-end">
                <div
                  className={`border-[2px] ${job.borderColor} w-[45px] h-[45px] rounded-full flex justify-center items-center ${job.textColor} mb-4`}
                >
                  {job.companyIcon}
                </div>
                <a
                  href={job.jobApplyLink}
                  className="bg-gradient-to-r from-black to-black mt-24 text-white rounded px-6 py-2 text-sm font-semibold shadow-lg  hover:shadow-xl transition-transform transform hover:scale-105"
                >
                  Apply Now
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HeroJob;
