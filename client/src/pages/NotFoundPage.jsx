import { useNavigate } from "react-router-dom";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-6xl font-bold text-gray-300 mb-4">404</h1>
      <p className="text-xl text-gray-500 mb-2">Page Not Found</p>
      <p className="text-gray-400 text-sm mb-6">
        The page you are looking for does not exist.
      </p>
      <button
        onClick={() => navigate("/dashboard")}
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
      >
        Go to Dashboard
      </button>
    </div>
  );
}
