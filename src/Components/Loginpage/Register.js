import axios from "axios";
import { Lock, Mail, User } from "lucide-react";
import React, { useState } from "react";

function Register() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [college, setCollege] = useState("");
  const [role, setRole] = useState("student");
  const [message, setMessage] = useState("");
  const apiUrl = process.env.REACT_APP_API_URL;
  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await axios.post(apiUrl + "/api/auth/signup", {
        name,
        email,
        password,
        role,
        college,
      });
      alert(res.data.message);
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "An error occurred during registration."
      );
    }
  };

  return (
    <div className="flex  h-screen  bg-white">
      <div className="bg-black h-screen w-1/4 flex items-center  justify-center">
        <div className="animate-slideIn rotate-180">
          <p className="text-9xl font-extrabold tracking-wide  bg-gradient-to-b from-white via-white to-black text-transparent bg-clip-text transform -rotate-90">
            Alum<span className="text-8xl text-blue-700">नीति</span>
          </p>
        </div>
      </div>

      <div className="justify-center items-center flex flex-col bg-white h-screen w-3/4 rounded-md">
        <div className="font-extrabold text-4xl">
          <p>Create your account</p>
        </div>
        <div className="mt-2 mb-2 font-medium text-zinc-500">
          <p>Please enter your details</p>
        </div>
        <form onSubmit={handleRegister}>
          <div className="font-medium">
            <p className="mb-1 mt-2 text-base flex gap-2">Name</p>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-[#f6f6f6] outline-none text-sm  rounded w-[500px] pt-3 pb-3 pl-3 pr-3"
              type="text"
              placeholder="name"
            ></input>
          </div>
          <div className="font-medium">
            <p className="mb-1 mt-2 text-base flex gap-2">Email Address</p>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-[#f6f6f6] outline-none rounded w-[500px] pt-3 text-sm pb-3 pl-3 pr-3"
              type="email"
              placeholder="example@gmail.com"
            ></input>
          </div>
          <p className="mb-1 mt-2 text-base flex gap-2 font-medium">Role</p>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
            className="bg-[#f6f6f6] w-[500px] pt-3 pb-3 pl-3 pr-3 rounded outline-none"
          >
            <option value="student">Student</option>
            <option value="alumni">Alumni</option>
            <option value="admin">Admin</option>
          </select>
          <div className="font-medium">
            <p className="mb-1 mt-2 text-base flex gap-2">College</p>
            <input
              value={college}
              onChange={(e) => setCollege(e.target.value)}
              className="bg-[#f6f6f6] outline-none rounded w-[500px] pt-3 text-sm pb-3 pl-3 pr-3"
              type="text"
              placeholder="college name"
            ></input>
          </div>
          <div className="font-medium text-base">
            <p className="mb-1 mt-2 flex gap-2">Password</p>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className=" text-sm bg-[#f6f6f6] outline-none rounded w-[500px] pt-3 pb-3 pl-3 pr-3"
              type="password"
              placeholder="password"
            ></input>
          </div>
          <div>
            <button
              className="w-[500px] bg-gradient-to-b from-black to-[#2e2e2e] pt-3 pb-3 rounded mt-6 font-medium text-white"
              type="submit"
            >
              Sign up
            </button>
          </div>
        </form>
        <div className="mt-4 font-medium">
          <p>
            You have already Account?{" "}
            <a
              className=" underline text-blue-700 hover:cursor-pointer"
              href="/login"
            >
              Sign In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
