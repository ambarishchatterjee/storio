import {
  Home,
  Search,
  Settings,
  BarChart2,
  LogOut,
  BadgeDollarSign,
  File,
  User,
} from "lucide-react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import { getImage } from "../api/api";

export default function DashboardLayout({ children }) {
  const { logout } = useLogout();

  const { user } = useAuthContext();

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 text-white flex flex-col p-6 space-y-6">
        <Link to={"/"}>
          <h1 className="text-2xl font-bold">Storio</h1>
        </Link>
        <nav className="space-y-4">
          <Link
            to="/dashboard"
            className="flex items-center gap-3 hover:text-gray-100"
          >
            <Home size={20} /> Dashboard
          </Link>
          <Link
            to="/dashboard/files"
            className="flex items-center gap-3 hover:text-gray-100"
          >
            <File size={20} /> Files
          </Link>
          {/* <Link to="/search" className="flex items-center gap-3 hover:text-gray-100">
            <Search size={20} /> Search
          </Link> */}
          <Link
            to="/dashboard/plans"
            className="flex items-center gap-3 hover:text-gray-100"
          >
            <BadgeDollarSign size={20} /> Plan
          </Link>
          <Link
            to="/dashboard/settings"
            className="flex items-center gap-3 hover:text-gray-100"
          >
            <Settings size={20} /> Settings
          </Link>

          {user?.user?.role === "admin" && (
            <NavLink
              to="/dashboard/admin/users"
              className="flex items-center gap-3 hover:text-gray-100"
            >
              <User size={20} />
              Admin Panel
            </NavLink>
          )}
        </nav>
        <div className="mt-auto text-sm text-white">
          © {new Date().getFullYear()} Storio
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 bg-gray-50 flex flex-col">
        {/* Topbar */}
        <header className="flex justify-between items-center px-6 py-4 shadow-sm bg-white">
          <h2 className="text-xl font-semibold">Dashboard</h2>

          <div className="flex items-center gap-2">
            <h4>Hello, {user.user.name}</h4>
            <img
              src={getImage(user.user.profileImage)}
              alt={user.user.name}
              className="w-8 h-8 object-cover rounded-full"
            />
          </div>

          <button
            onClick={logout}
            className="flex items-center gap-2 text-red-500 hover:text-red-700"
          >
            <LogOut size={18} /> Logout
          </button>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
