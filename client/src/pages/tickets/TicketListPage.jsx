import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout";
import Badge from "../../components/Badge";
import { fetchTickets, deleteTicket } from "../../app/ticketSlice";

export default function TicketListPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { tickets, total, loading } = useSelector((state) => state.tickets);
  const { user } = useSelector((state) => state.auth);

  const [filters, setFilters] = useState({
    search: "",
    status: "",
    priority: "",
    page: 1,
  });

  useEffect(() => {
    dispatch(fetchTickets(filters));
  }, [filters, dispatch]);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value, page: 1 });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this ticket?")) {
      dispatch(deleteTicket(id));
    }
  };

  return (
    <Layout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">
          {user?.role === "user" ? "My Tickets" : "Ticket Management"}
        </h1>
        {user?.role === "user" && (
          <button
            onClick={() => navigate("/tickets/create")}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            + Create Ticket
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded shadow mb-4 flex flex-wrap gap-3">
        <input
          type="text"
          name="search"
          placeholder="Search by title or ticket number..."
          value={filters.search}
          onChange={handleFilterChange}
          className="border rounded px-3 py-2 text-sm flex-1 min-w-48"
        />
        <select
          name="status"
          value={filters.status}
          onChange={handleFilterChange}
          className="border rounded px-3 py-2 text-sm"
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
          className="border rounded px-3 py-2 text-sm"
        >
          <option value="">All Priority</option>
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
          <option>Urgent</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded shadow overflow-x-auto">
        {loading ? (
          <p className="p-6 text-center text-gray-500">Loading...</p>
        ) : tickets.length === 0 ? (
          <p className="p-6 text-center text-gray-500">No tickets found.</p>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-left">
              <tr>
                <th className="px-4 py-3 font-semibold">Ticket #</th>
                <th className="px-4 py-3 font-semibold">Title</th>
                <th className="px-4 py-3 font-semibold">Category</th>
                <th className="px-4 py-3 font-semibold">Priority</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 font-semibold">Created By</th>
                <th className="px-4 py-3 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {tickets.map((ticket) => (
                <tr key={ticket._id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-mono text-blue-600">
                    {ticket.ticketNumber}
                  </td>
                  <td className="px-4 py-3">{ticket.title}</td>
                  <td className="px-4 py-3">{ticket.category}</td>
                  <td className="px-4 py-3">
                    <Badge value={ticket.priority} type="priority" />
                  </td>
                  <td className="px-4 py-3">
                    <Badge value={ticket.status} type="status" />
                  </td>
                  <td className="px-4 py-3">{ticket.createdBy?.name}</td>
                  <td className="px-4 py-3 flex gap-2">
                    <button
                      onClick={() => navigate(`/tickets/${ticket._id}`)}
                      className="text-blue-600 hover:underline text-xs"
                    >
                      View
                    </button>
                    {(user?.role === "admin" ||
                      ticket.createdBy?._id === user?._id) && (
                      <button
                        onClick={() => navigate(`/tickets/${ticket._id}/edit`)}
                        className="text-yellow-600 hover:underline text-xs"
                      >
                        Edit
                      </button>
                    )}
                    {user?.role === "admin" && (
                      <button
                        onClick={() => handleDelete(ticket._id)}
                        className="text-red-600 hover:underline text-xs"
                      >
                        Delete
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
        <p>Total: {total} tickets</p>
        <div className="flex gap-2">
          <button
            disabled={filters.page <= 1}
            onClick={() => setFilters({ ...filters, page: filters.page - 1 })}
            className="px-3 py-1 border rounded disabled:opacity-40 hover:bg-gray-100"
          >
            Prev
          </button>
          <span className="px-3 py-1">Page {filters.page}</span>
          <button
            disabled={filters.page * 10 >= total}
            onClick={() => setFilters({ ...filters, page: filters.page + 1 })}
            className="px-3 py-1 border rounded disabled:opacity-40 hover:bg-gray-100"
          >
            Next
          </button>
        </div>
      </div>
    </Layout>
  );
}
