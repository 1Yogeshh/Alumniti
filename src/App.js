import logo from "./logo.svg";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./Components/Loginpage/Login";
import Start from "./Components/StartPage/Start";
import Register from "./Components/Loginpage/Register";
import Landing from "./Components/StartPage/Landing";
import Home from "./Components/Homepage/Home";
import Connection from "./Components/Connection/Connection";
import Profile from "./Components/Profile/Profile";
import HeroCollabration from "./Components/Homepage/HeroCollabration";
import UserProfile from "./Components/OtherUser/UserProfile";
import Event from "./Components/Event/Event";
import Mentor from "./Components/Aimentor/Mentor";
import CreateJobPage from "./Components/Createjob/Createjob";
import CreateCollaboration from "./Components/CreateCollab/CreateCollab";
import CreateEventPage from "./Components/CreateEvent/Createevent";
import UpdateProfile from "./Components/Updated/Updateprofile";
import AdminDashboard from "./Components/Dashboard/Admindashboard"; // Import Admin Dashboard
import { useEffect, useState } from "react";
import Message from "./Components/Message/Message";
import Test from "./Components/Test/Test";
function App() {
  const [role, setRole] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token"); // Get token from local storage
    if (token) {
      try {
        // Split the token into parts and validate its structure
        const parts = token.split(".");
        if (parts.length === 3) {
          const decoded = JSON.parse(atob(parts[1])); // Decode token
          setRole(decoded.role); // Set user role
        } else {
          console.error("Invalid token structure");
        }
      } catch (error) {
        console.error("Failed to decode token:", error);
      }
    }
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Landing />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/home",
      element: <Home />,
    },
    {
      path: "/connection",
      element: <Connection />,
    },
    {
      path: "/profile",
      element: <Profile />,
    },
    {
      path: "/collabration",
      element: <HeroCollabration />,
    },
    {
      path: "/otheruser/:userId",
      element: <UserProfile />,
    },
    {
      path: "/events",
      element: <Event />,
    },
    {
      path: "/aimentor",
      element: <Mentor />,
    },
    {
      path: "/createjob",
      element: <CreateJobPage />,
    },
    {
      path: "/createcollab",
      element: <CreateCollaboration />,
    },
    {
      path: "/createevent",
      element: <CreateEventPage />,
    },
    {
      path: "/update",
      element: <UpdateProfile />,
    },
    {
      path: "/admin", // Route for Admin Dashboard
      element: <AdminDashboard />,
    },
    {
      path: "/student", // Route for Student Dashboard
      element: <Home />,
    },
    {
      path: "/message/:userId",
      element: <Message />,
    },
    {
      path: "/test",
      element: <Test />,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
