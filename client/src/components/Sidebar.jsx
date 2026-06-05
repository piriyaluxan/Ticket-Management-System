import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../app/authSlice";

const linkClass = ({ isActive }) =>
  `block py-2 px-3 rounded text-sm transition-colors ${
    isActive
      ? "bg-blue-600 text-white"
      : "text-gray-300 hover:bg-gray-700 hover:text-white"
  }`;

export default function Sidebar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="w-64 min-h-screen bg-gray-800 text-white flex flex-col">
      <div className="p-4 border-b border-gray-700">
        <p className="text-lg font-bold">🎫 Ticket System</p>
        <p className="text-xs text-gray-400 mt-1">QTechy</p>
      </div>
      <nav className="flex-1 p-4 space-y-1">
        <NavLink to="/dashboard" className={linkClass}>
          Dashboard
        </NavLink>

        {user?.role === "admin" && (
          <>
            <NavLink to="/tickets" className={linkClass}>
              Ticket Management
            </NavLink>
            <NavLink to="/users" className={linkClass}>
              User Management
            </NavLink>
          </>
        )}

        {user?.role === "agent" && (
          <NavLink to="/tickets" className={linkClass}>
            Assigned Tickets
          </NavLink>
        )}

        {user?.role === "user" && (
          <>
            <NavLink to="/tickets" className={linkClass}>
              My Tickets
            </NavLink>
            <NavLink to="/tickets/create" className={linkClass}>
              Create Ticket
            </NavLink>
          </>
        )}
      </nav>
      <div className="p-4 border-t border-gray-700">
        <p className="text-xs text-gray-400 mb-1">{user?.email}</p>
        <p className="text-sm font-medium mb-3">
          {user?.name}{" "}
          <span className="text-xs text-gray-400 capitalize">
            ({user?.role})
          </span>
        </p>
        <button
          onClick={handleLogout}
          className="w-full bg-red-600 py-2 rounded hover:bg-red-700 text-sm"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
