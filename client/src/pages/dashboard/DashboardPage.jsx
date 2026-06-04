import { useSelector } from "react-redux";
import Layout from "../../components/Layout";

export default function DashboardPage() {
  const { user } = useSelector((state) => state.auth);

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <p className="text-gray-600">
        Welcome back, <strong>{user?.name}</strong>!
      </p>
      <p className="text-gray-500 mt-1">Role: {user?.role}</p>
    </Layout>
  );
}
