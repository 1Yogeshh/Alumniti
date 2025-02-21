import React, { useState } from "react";
import axios from "axios";

function CreateJobPage() {
  const apiUrl = process.env.REACT_APP_API_URL;

  const [formData, setFormData] = useState({
    jobTitle: "",
    companyName: "",
    location: "",
    companyWebsite: "",
    jobType: "",
    salary: "",
    jobDescription: "",
    jobApplyLink: "",
  });

  const [message, setMessage] = useState(null);

  // Handle form changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token"); // Assuming you're using JWT stored in localStorage
      const response = await axios.post(
        apiUrl + "/api/auth/createpost", // Adjust the URL to your backend
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Pass the token for authentication
          },
        }
      );
      setMessage("Job posted successfully!");
      alert("Job posted successfully!");
    } catch (error) {
      setMessage("Error creating job post");
    }
  };

  return (
    <div className="w-full p-4 pt-8 justify-center flex items-center h-screen">
      <div className="bg-zinc-100 pl-10 w-4/6 pr-10 pt-10 pb-10 rounded-md">
        <h1 className="mb-4 text-xl font-bold">Create a Job Post</h1>
        {message && <p>{message}</p>}
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-2 bg-zinc-100 w-full gap-4"
        >
          <div>
            <p>Job Title</p>
            <input
              type="text"
              name="jobTitle"
              value={formData.jobTitle}
              onChange={handleChange}
              placeholder="Job Title"
              required
              className="bg-white mt-2 pt-2 pb-2 pl-2 pr-2 rounded-md w-full"
            />
          </div>
          <div>
            <p>Company Name</p>
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              placeholder="Company Name"
              required
              className="bg-white mt-2 pt-2 pb-2 pl-2 pr-2 rounded-md w-full"
            />
          </div>
          <div>
            <p>Location</p>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Location"
              required
              className="bg-white mt-2 pt-2 pb-2 pl-2 pr-2 rounded-md w-full"
            />
          </div>
          <div>
            <p>Website link</p>
            <input
              type="text"
              name="companyWebsite"
              value={formData.companyWebsite}
              onChange={handleChange}
              placeholder="Company Website"
              required
              className="bg-white mt-2 pt-2 pb-2 pl-2 pr-2 rounded-md w-full"
            />
          </div>
          <div>
            <p>Job Type</p>
            <input
              type="text"
              name="jobType"
              value={formData.jobType}
              onChange={handleChange}
              placeholder="Job Type (e.g., Full-time)"
              required
              className="bg-white mt-2 pt-2 pb-2 pl-2 pr-2 rounded-md w-full"
            />
          </div>
          <div>
            <p>Salary</p>
            <input
              type="text"
              name="salary"
              value={formData.salary}
              onChange={handleChange}
              placeholder="Salary"
              required
              className="bg-white mt-2 pt-2 pb-2 pl-2 pr-2 rounded-md w-full"
            />
          </div>
          <div>
            <p>Job Description</p>
            <textarea
              name="jobDescription"
              value={formData.jobDescription}
              onChange={handleChange}
              placeholder="Job Description"
              required
              className="bg-white mt-2 pt-2 pb-2 pl-2 pr-2 rounded-md w-full"
            ></textarea>
          </div>
          <div>
            <p>Job Apply link</p>
            <input
              type="text"
              name="jobApplyLink"
              value={formData.jobApplyLink}
              onChange={handleChange}
              placeholder="Job Apply Link"
              required
              className="bg-white mt-2 pt-2 pb-2 pl-2 pr-2 rounded-md w-full"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-700 text-white pt-2 pb-2 rounded-md w-full"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateJobPage;
