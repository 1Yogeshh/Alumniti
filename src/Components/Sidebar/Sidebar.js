import { Home } from "lucide-react";
import React from "react";
import { NavLink, useLocation, matchPath } from "react-router-dom";

function Sidebar() {
    const location = useLocation();

    const getActiveClass = ({ isActive, paths }) =>
        isActive || paths.some(path => matchPath(path, location.pathname))
            ? 'text-blue-700 bg-zinc-100 transition-colors duration-300 ml-[50px] bg-black pt-3 pb-3 pl-[80px] rounded pr-[80px]'
            : 'text-black ml-[70px] transition-colors duration-300';

    return (
        <div className="bg-white h-screen sticky top-0 flex flex-col gap-8 pt-8">
            <div className="">
                <NavLink
                    to="/home"
                    className={({ isActive }) => getActiveClass({ isActive, paths: ["/home", "/collabration"] })}
                >
                    Home
                </NavLink>
            </div>
            <div className="h-[1px] ml-[50px] bg-zinc-100 w-[200px]"></div>
            <div className="">
                <NavLink
                    to="/Events"
                    className={({ isActive }) => getActiveClass({ isActive, paths: ["/Events"] })}
                >
                    Events
                </NavLink>
            </div>
            <div className="h-[1px] ml-[50px] bg-zinc-100 w-[200px]"></div>
            <div className="">
                <NavLink
                    to="/connection"
                    className={({ isActive }) => getActiveClass({ isActive, paths: ["/connection"] })}
                >
                    Network
                </NavLink>
            </div>
            <div className="h-[1px] ml-[50px] bg-zinc-100 w-[200px]"></div>
            <div className="">
                <NavLink
                    to="/aimentor"
                    className={({ isActive }) => getActiveClass({ isActive, paths: ["/aimentor"] })}
                >
                    AI Mentor
                </NavLink>
            </div>
        </div>
    );
}

export default Sidebar;
