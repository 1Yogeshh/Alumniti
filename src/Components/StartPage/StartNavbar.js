import React from "react";
import { Activity, Gem, Lightbulb, PenLine } from "lucide-react";
import { useNavigate } from "react-router-dom";
import logo from "../Assets/logo2.png";
import { Link } from "react-router-dom";

function StartNavbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const user = token ? JSON.parse(atob(token.split(".")[1])) : null; // Decode JWT to get user info
  const isAdmin = user?.role === "admin";
  const isStudent = user?.role === "student";
  const isAlumni = user?.role === "alumni";

  const handleDashboardRedirect = () => {
    if (isAdmin) {
      navigate("/admin");
    } else if (isStudent) {
      navigate("/home");
    } else if (isAlumni) {
      navigate("/home");
    }
  };

  const links = [
    {
      id: 0,
      name: "Events",
      path: "/events",
    },
    {
      id: 1,
      name: "Jobs",
      path: "/home",
    },
    {
      id: 2,
      name: "Categories",
      path: "/",
    },
  ];

  console.log(token);

  return (
    <div className="sticky top-0">
      <div className="flex justify-between bg-white h-[60px] items-center pl-10 pr-10 w-full">
        <img
          src={logo}
          alt="logo"
          className="h-[30px] ml-4 mix-blend-multiply"
        ></img>

        <div className="mr-10 flex gap-8 justify-center items-center w-1/4">
          <div>
            <ul className="list-none flex gap-8 font-medium text-base">
              {/* <a className="hover:text-blue-700 text-[15px] hover:cursor-pointer hover:underline flex gap-2">
                  {" "}
                  Events
                </a> */}
              {links.map((item) => (
                <li key={item.id} className="">
                  <Link
                    className="hover:text-blue-700 text-[15px] hover:cursor-pointer hover:underline flex gap-2"
                    to={item.path}
                  >
                    {" "}
                    {item.name}{" "}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {token ? (
            <button
              className=" bg-blue-700 pt-1 pb-1 h-[40px] pl-6 pr-6 rounded text-white"
              onClick={handleDashboardRedirect}
            >
              Dashboard
            </button>
          ) : (
            <a
              className=" bg-blue-700 pt-1 pb-1 flex justify-center items-center h-[40px] pl-6 pr-6 rounded text-white"
              href="/login"
            >
              Login
            </a>
          )}
        </div>
      </div>
      <div>
        <div className="bg-zinc-200 h-[1px] w-full"></div>
      </div>
    </div>
  );
}

export default StartNavbar;
