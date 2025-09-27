import { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import {useAuth} from "../context/AuthContext";

export default function Layout() {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const{logout} = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div
        className={`${
          collapsed ? "w-20" : "w-64"
        } bg-gray-800 text-white shadow-lg border-r fixed top-0 left-0 h-screen flex flex-col justify-between transition-all duration-300`}
      >
        <div>
          {/* Collapse button + App logo */}
          <div className="flex items-center justify-between p-4 border-b relative">
            <h2 className={`font-bold text-xl ${collapsed ? "hidden" : "block"}`}>
              Moodboard
            </h2>

            {/* Small circular collapse button */}
           
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="absolute -right-3 top-1/2 transform -translate-y-1/2 bg-white border border-gray-600 rounded-full w-8 h-8 flex items-center justify-center shadow hover:bg-gray-700 transition"
          >
          {collapsed ? "➡️" : "⬅️"}
          </button>

          </div>

          {/* Navigation */}
          <nav className="p-4 space-y-4">
            <Link to="/Home" className="flex items-center gap-2 !text-blue-300 hover:!text-blue-400">
              <span>🏠</span>
              {!collapsed && <span>Home</span>}
            </Link>
            <Link to="/dashboard" className="flex items-center gap-2 !text-blue-300 hover:!text-blue-400">
              <span>📓</span>
              {!collapsed && <span>Dashboard</span>}
            </Link>
            <Link to="/mood-ai" className="flex items-center gap-2 !text-blue-300 hover:!text-blue-400">
              <span>📊</span>
              {!collapsed && <span>Graph</span>}
            </Link>
            <Link to="/tips" className="flex items-center gap-2 !text-blue-300 hover:!text-blue-400">
              <span>💡</span>
              {!collapsed && <span>Tips</span>}
            </Link>
            <Link to="/faq" className="flex items-center gap-2 !text-blue-300 hover:!text-blue-400">
              <span>❓</span>
              {!collapsed && <span>FAQ</span>}
            </Link>
          </nav>
        </div>

        {/* Logout button */}
        <div className="p-4 ">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 w-full  bg-red-500 text-white-500 hover:bg-red-700"
          >
            <span>⏏️</span>
            {!collapsed && <span>Logout</span>}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className={`${collapsed ? "ml-20" : "ml-64"} flex-1  transition-all duration-300`}>
        <Outlet />
      </div>
    </div>
  );
}
