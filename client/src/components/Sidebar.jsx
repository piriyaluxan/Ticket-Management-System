import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../app/authSlice";

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
      <div className="p-4 text-xl font-bold border-b border-gray-700">
        Ticket System
      </div>
      <nav className="flex-1 p-4 space-y-2">
        <Link
          to="/dashboard"
          className="block py-2 px-3 rounded hover:bg-gray-700"
        >
          Dashboard
        </Link>

        {user?.role === "admin" && (
          <>
            <Link
              to="/tickets"
              className="block py-2 px-3 rounded hover:bg-gray-700"
            >
              Ticket Management
            </Link>
            <Link
              to="/users"
              className="block py-2 px-3 rounded hover:bg-gray-700"
            >
              User Management
            </Link>
          </>
        )}

        {user?.role === "agent" && (
          <Link
            to="/tickets"
            className="block py-2 px-3 rounded hover:bg-gray-700"
          >
            Assigned Tickets
          </Link>
        )}

        {user?.role === "user" && (
          <>
            <Link
              to="/tickets"
              className="block py-2 px-3 rounded hover:bg-gray-700"
            >
              My Tickets
            </Link>
            <Link
              to="/tickets/create"
              className="block py-2 px-3 rounded hover:bg-gray-700"
            >
              Create Ticket
            </Link>
          </>
        )}
      </nav>
      <div className="p-4 border-t border-gray-700">
        <p className="text-sm text-gray-400 mb-2">
          {user?.name} ({user?.role})
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
