import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout";
import StatCard from "../../components/StatCard";
import Badge from "../../components/Badge";
import { SkeletonCard } from "../../components/Skeleton";
import { fetchDashboardStats } from "../../app/dashboardSlice";

export default function DashboardPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { summary, recentTickets, categoryBreakdown, loading, error } =
    useSelector((state) => state.dashboard);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchDashboardStats());
  }, [dispatch]);

  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">
          Welcome back, <strong>{user?.name}</strong> —{" "}
          <span className="capitalize">{user?.role}</span>
        </p>
      </div>

      {error && (
        <p className="bg-red-100 text-red-600 p-3 rounded mb-4 text-sm">
          {error}
        </p>
      )}

      {/* Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {loading ? (
          [...Array(7)].map((_, i) => <SkeletonCard key={i} />)
        ) : (
          <>
            <StatCard
              label="Total Tickets"
              value={summary?.total}
              color="purple"
            />
            <StatCard label="Open" value={summary?.open} color="blue" />
            <StatCard
              label="In Progress"
              value={summary?.inProgress}
              color="yellow"
            />
            <StatCard
              label="Resolved"
              value={summary?.resolved}
              color="green"
            />
            <StatCard label="Closed" value={summary?.closed} color="gray" />
            <StatCard label="Urgent" value={summary?.urgent} color="red" />
            <StatCard
              label="High Priority"
              value={summary?.high}
              color="orange"
            />
          </>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Tickets */}
        <div className="bg-white rounded shadow p-5">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold">Recent Tickets</h2>
            <button
              onClick={() => navigate("/tickets")}
              className="text-sm text-blue-600 hover:underline"
            >
              View All
            </button>
          </div>
          {loading ? (
            <div className="space-y-3">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="animate-pulse h-10 bg-gray-100 rounded"
                />
              ))}
            </div>
          ) : recentTickets.length === 0 ? (
            <p className="text-gray-400 text-sm">No tickets yet.</p>
          ) : (
            <div className="space-y-3">
              {recentTickets.map((ticket) => (
                <div
                  key={ticket._id}
                  onClick={() => navigate(`/tickets/${ticket._id}`)}
                  className="flex justify-between items-center p-3 rounded border hover:bg-gray-50 cursor-pointer"
                >
                  <div>
                    <p className="text-sm font-medium">{ticket.title}</p>
                    <p className="text-xs text-gray-400 font-mono">
                      {ticket.ticketNumber} · {ticket.createdBy?.name}
                    </p>
                  </div>
                  <Badge value={ticket.status} type="status" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Category Breakdown */}
        <div className="bg-white rounded shadow p-5">
          <h2 className="font-semibold mb-4">Tickets by Category</h2>
          {loading ? (
            <div className="space-y-3">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="animate-pulse h-8 bg-gray-100 rounded"
                />
              ))}
            </div>
          ) : categoryBreakdown.length === 0 ? (
            <p className="text-gray-400 text-sm">No data yet.</p>
          ) : (
            <div className="space-y-3">
              {categoryBreakdown.map((item) => {
                const percent = summary?.total
                  ? Math.round((item.count / summary.total) * 100)
                  : 0;
                return (
                  <div key={item._id}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-700">{item._id}</span>
                      <span className="text-gray-500">
                        {item.count} ({percent}%)
                      </span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
