// src/components/SidebarLayout.jsx
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function SidebarLayout() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white shadow-lg border-r fixed top-0 left-0 h-screen flex flex-col ">
        <div>
          <div className="p-6 text-2xl font-bold">Moodboard</div>
          <nav className="flex flex-col space-y-4 px-6">
            <Link to="/Home" className="!text-blue-300 hover:!text-blue-400">
              Home
            </Link>
            <Link to="/dashboard" className="!text-blue-300 hover:!text-blue-400">
              Dashboard
            </Link>
            <Link to="/mood-ai" className="!text-blue-300 hover:!text-blue-400">
              Mood Graph (AI)
            </Link>
            <Link to="/tips" className="!text-blue-300 hover:!text-blue-400">
              Tips & Tricks
            </Link>
            <Link to="/faq" className="!text-blue-300 hover:!text-blue-400">
              FAQs
            </Link>
          </nav>
        </div>

       
        <div className="p-6 mt-auto">
          <button
            onClick={handleLogout}
            className="w-full bg-red-500 hover:bg-red-600 py-2 rounded"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 bg-gray-100 p-6">
        <Outlet /> {/* This will render the current page */}
      </main>
    </div>
  );
}
