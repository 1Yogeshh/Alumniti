import axios from "axios";
import { Activity, Lock, Mail } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const apiUrl = process.env.REACT_APP_API_URL;
  console.log(apiUrl);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(apiUrl + "/api/auth/login", {
        email,
        password,
      });
      const { token } = response.data;
      localStorage.setItem("token", token);
      // Navigate to the appropriate dashboard
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      if (decodedToken.role === "admin") {
        navigate("/home"); // Redirect to Admin Dashboard
      } else if (decodedToken.role === "student") {
        navigate("/home"); // Redirect to Student Dashboard
      } else {
        navigate("/");
      }
    } catch (error) {
      alert(error.response?.data?.message || "An error occurred during login.");
    }
  };
  return (
    <div className="flex h-screen  bg-white">
      <div className="bg-black h-screen w-1/4 flex items-center  justify-center">
        <div className="animate-slideIn rotate-180">
          <p className="text-9xl font-extrabold tracking-wide  bg-gradient-to-b from-white via-white to-black text-transparent bg-clip-text transform -rotate-90">
            Alum<span className="text-8xl text-blue-700">नीति</span>
          </p>
        </div>
      </div>

      <div className=" justify-center items-center flex flex-col bg-white h-[screen] w-3/4 rounded-md">
        <div className="font-extrabold text-4xl">
          <p>
            <span className="">Welcome</span> back!
          </p>
        </div>
        <div className="mt-2 mb-2 font-medium text-zinc-500">
          <p>Please enter your details</p>
        </div>
        <form onSubmit={handleLogin}>
          <div className="font-medium">
            <p className="mb-1 mt-3 flex gap-2">Email Address</p>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-[#f6f6f6] outline-none text-sm  rounded w-[500px] pt-3 pb-3 pl-3 pr-3"
              type="email"
              placeholder="example@gmail.com"
            ></input>
          </div>
          <div className="font-medium">
            <p className="mb-1 mt-3 flex gap-2">Password</p>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-[#f6f6f6] outline-none text-sm rounded w-[500px] pt-3 pb-3 pl-3 pr-3"
              type="password"
              placeholder="password"
            ></input>
          </div>
          <div>
            <button
              type="submit"
              className="w-[500px] bg-gradient-to-b from-black to-[#2e2e2e]  pt-3 pb-3 rounded mt-6 font-medium text-white"
            >
              Sign In
            </button>
          </div>
        </form>

        <div className="mt-4 font-medium">
          <p>
            Don't have an Account?{" "}
            <a
              className=" underline text-blue-700 hover:cursor-pointer"
              href="/register"
            >
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
