import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout";
import Badge from "../../components/Badge";
import { SkeletonTable } from "../../components/Skeleton";
import { fetchTickets, deleteTicket } from "../../app/ticketSlice";

const SORT_OPTIONS = [
  { label: "Newest First", value: "-createdAt" },
  { label: "Oldest First", value: "createdAt" },
  { label: "Priority (High)", value: "-priority" },
  { label: "Status", value: "status" },
];

export default function TicketListPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { tickets, total, loading, error } = useSelector(
    (state) => state.tickets,
  );
  const { user } = useSelector((state) => state.auth);

  const [filters, setFilters] = useState({
    search: "",
    status: "",
    priority: "",
    category: "",
    sort: "-createdAt",
    page: 1,
    limit: 10,
  });

  useEffect(() => {
    dispatch(fetchTickets(filters));
  }, [filters, dispatch]);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value, page: 1 });
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this ticket?")) {
      dispatch(deleteTicket(id));
    }
  };

  const totalPages = Math.ceil(total / filters.limit);

  return (
    <Layout>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">
            {user?.role === "user"
              ? "My Tickets"
              : user?.role === "agent"
                ? "Assigned Tickets"
                : "Ticket Management"}
          </h1>
          <p className="text-gray-500 text-sm mt-1">{total} ticket(s) found</p>
        </div>
        {(user?.role === "user" || user?.role === "admin") && (
          <button
            onClick={() => navigate("/tickets/create")}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm"
          >
            + Create Ticket
          </button>
        )}
      </div>

      {error && (
        <p className="bg-red-100 text-red-600 p-3 rounded mb-4 text-sm">
          {error}
        </p>
      )}

      {/* Filters */}
      <div className="bg-white p-4 rounded shadow mb-4">
        <div className="flex flex-wrap gap-3">
          <input
            type="text"
            name="search"
            placeholder="Search title or ticket number..."
            value={filters.search}
            onChange={handleFilterChange}
            className="border rounded px-3 py-2 text-sm flex-1 min-w-48 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            name="status"
            value={filters.status}
            onChange={handleFilterChange}
            className="border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Status</option>
            <option>Open</option>
            <option>In Progress</option>
            <option>Resolved</option>
            <option>Closed</option>
          </select>
          <select
            name="priority"
            value={filters.priority}
            onChange={handleFilterChange}
            className="border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Priority</option>
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
            <option>Urgent</option>
          </select>
          <select
            name="category"
            value={filters.category}
            onChange={handleFilterChange}
            className="border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Categories</option>
            <option>Bug</option>
            <option>Feature Request</option>
            <option>Technical Issue</option>
            <option>Payment Issue</option>
            <option>Account Issue</option>
            <option>Other</option>
          </select>
          <select
            name="sort"
            value={filters.sort}
            onChange={handleFilterChange}
            className="border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          {(filters.search ||
            filters.status ||
            filters.priority ||
            filters.category) && (
            <button
              onClick={() =>
                setFilters({
                  search: "",
                  status: "",
                  priority: "",
                  category: "",
                  sort: "-createdAt",
                  page: 1,
                  limit: 10,
                })
              }
              className="border rounded px-3 py-2 text-sm text-red-500 hover:bg-red-50"
            >
              Clear Filters
            </button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded shadow overflow-x-auto">
        {loading ? (
          <SkeletonTable rows={5} />
        ) : tickets.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-gray-400 text-lg mb-2">No tickets found</p>
            <p className="text-gray-300 text-sm">
              {filters.search || filters.status || filters.priority
                ? "Try clearing your filters"
                : user?.role === "user"
                  ? "Create your first ticket to get started"
                  : "No tickets have been created yet"}
            </p>
            {user?.role === "user" && (
              <button
                onClick={() => navigate("/tickets/create")}
                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700"
              >
                Create Ticket
              </button>
            )}
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-left border-b">
              <tr>
                <th className="px-4 py-3 font-semibold text-gray-600">
                  Ticket #
                </th>
                <th className="px-4 py-3 font-semibold text-gray-600">Title</th>
                <th className="px-4 py-3 font-semibold text-gray-600">
                  Category
                </th>
                <th className="px-4 py-3 font-semibold text-gray-600">
                  Priority
                </th>
                <th className="px-4 py-3 font-semibold text-gray-600">
                  Status
                </th>
                <th className="px-4 py-3 font-semibold text-gray-600">
                  Created By
                </th>
                <th className="px-4 py-3 font-semibold text-gray-600">Date</th>
                <th className="px-4 py-3 font-semibold text-gray-600">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {tickets.map((ticket) => (
                <tr
                  key={ticket._id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-4 py-3 font-mono text-blue-600 text-xs">
                    {ticket.ticketNumber}
                  </td>
                  <td className="px-4 py-3 font-medium max-w-xs truncate">
                    {ticket.title}
                  </td>
                  <td className="px-4 py-3 text-gray-600">{ticket.category}</td>
                  <td className="px-4 py-3">
                    <Badge value={ticket.priority} type="priority" />
                  </td>
                  <td className="px-4 py-3">
                    <Badge value={ticket.status} type="status" />
                  </td>
                  <td className="px-4 py-3 text-gray-600">
                    {ticket.createdBy?.name}
                  </td>
                  <td className="px-4 py-3 text-gray-400 text-xs">
                    {new Date(ticket.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button
                        onClick={() => navigate(`/tickets/${ticket._id}`)}
                        className="text-blue-600 hover:underline text-xs"
                      >
                        View
                      </button>
                      {(user?.role === "admin" ||
                        ticket.createdBy?._id === user?._id) && (
                        <button
                          onClick={() =>
                            navigate(`/tickets/${ticket._id}/edit`)
                          }
                          className="text-yellow-600 hover:underline text-xs"
                        >
                          Edit
                        </button>
                      )}
                      {user?.role === "admin" && (
                        <button
                          onClick={() => handleDelete(ticket._id)}
                          className="text-red-500 hover:underline text-xs"
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      {!loading && tickets.length > 0 && (
        <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
          <p>
            Showing {(filters.page - 1) * filters.limit + 1}–
            {Math.min(filters.page * filters.limit, total)} of {total}
          </p>
          <div className="flex gap-1">
            <button
              disabled={filters.page <= 1}
              onClick={() => setFilters({ ...filters, page: 1 })}
              className="px-2 py-1 border rounded disabled:opacity-40 hover:bg-gray-100"
            >
              «
            </button>
            <button
              disabled={filters.page <= 1}
              onClick={() => setFilters({ ...filters, page: filters.page - 1 })}
              className="px-3 py-1 border rounded disabled:opacity-40 hover:bg-gray-100"
            >
              Prev
            </button>
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setFilters({ ...filters, page: i + 1 })}
                className={`px-3 py-1 border rounded hover:bg-gray-100 ${
                  filters.page === i + 1
                    ? "bg-blue-600 text-white border-blue-600"
                    : ""
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              disabled={filters.page >= totalPages}
              onClick={() => setFilters({ ...filters, page: filters.page + 1 })}
              className="px-3 py-1 border rounded disabled:opacity-40 hover:bg-gray-100"
            >
              Next
            </button>
            <button
              disabled={filters.page >= totalPages}
              onClick={() => setFilters({ ...filters, page: totalPages })}
              className="px-2 py-1 border rounded disabled:opacity-40 hover:bg-gray-100"
            >
              »
            </button>
          </div>
        </div>
      )}
    </Layout>
  );
}
