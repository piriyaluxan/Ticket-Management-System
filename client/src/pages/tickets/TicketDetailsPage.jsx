import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../../components/Layout";
import Badge from "../../components/Badge";
import {
  fetchTicketById,
  updateTicketStatus,
  assignTicket,
  addComment,
} from "../../app/ticketSlice";
import { fetchAgents } from "../../app/userSlice";

export default function TicketDetailsPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentTicket, loading } = useSelector((state) => state.tickets);
  const { agents } = useSelector((state) => state.users);
  const { user } = useSelector((state) => state.auth);

  const [comment, setComment] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedAgent, setSelectedAgent] = useState("");

  useEffect(() => {
    dispatch(fetchTicketById(id));
    if (user?.role === "admin") dispatch(fetchAgents());
  }, [id, dispatch]);

  useEffect(() => {
    if (currentTicket) {
      setSelectedStatus(currentTicket.status);
      setSelectedAgent(currentTicket.assignedTo?._id || "");
    }
  }, [currentTicket]);

  const handleStatusUpdate = async () => {
    if (selectedStatus !== currentTicket.status) {
      await dispatch(updateTicketStatus({ id, status: selectedStatus }));
      dispatch(fetchTicketById(id));
    }
  };

  const handleAssign = async () => {
    if (selectedAgent) {
      await dispatch(assignTicket({ id, agentId: selectedAgent }));
      dispatch(fetchTicketById(id));
    }
  };

  const handleComment = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;
    await dispatch(addComment({ id, message: comment }));
    setComment("");
  };

  if (loading || !currentTicket) {
    return (
      <Layout>
        <p className="text-center text-gray-500 mt-10">Loading...</p>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <p className="text-sm text-blue-600 font-mono mb-1">
              {currentTicket.ticketNumber}
            </p>
            <h1 className="text-2xl font-bold">{currentTicket.title}</h1>
            <p className="text-gray-500 text-sm mt-1">
              Created by <strong>{currentTicket.createdBy?.name}</strong> on{" "}
              {new Date(currentTicket.createdAt).toLocaleDateString()}
            </p>
          </div>
          <button
            onClick={() => navigate("/tickets")}
            className="text-sm text-gray-500 hover:underline"
          >
            ← Back
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Description */}
            <div className="bg-white rounded shadow p-5">
              <h2 className="font-semibold mb-3">Description</h2>
              <p className="text-gray-700 text-sm leading-relaxed">
                {currentTicket.description}
              </p>
            </div>

            {/* Comments */}
            <div className="bg-white rounded shadow p-5">
              <h2 className="font-semibold mb-4">
                Comments ({currentTicket.comments?.length || 0})
              </h2>
              <div className="space-y-4 mb-4">
                {currentTicket.comments?.length === 0 && (
                  <p className="text-gray-400 text-sm">No comments yet.</p>
                )}
                {currentTicket.comments?.map((c) => (
                  <div
                    key={c._id}
                    className="border-l-4 border-blue-200 pl-4 py-1"
                  >
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                      <span className="font-semibold text-gray-700">
                        {c.user?.name}{" "}
                        <span className="text-gray-400 font-normal">
                          ({c.user?.role})
                        </span>
                      </span>
                      <span>{new Date(c.createdAt).toLocaleString()}</span>
                    </div>
                    <p className="text-sm text-gray-700">{c.message}</p>
                  </div>
                ))}
              </div>

              {/* Add Comment */}
              <form onSubmit={handleComment} className="flex gap-2">
                <input
                  type="text"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Write a comment..."
                  className="flex-1 border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700"
                >
                  Post
                </button>
              </form>
            </div>

            {/* Status History */}
            <div className="bg-white rounded shadow p-5">
              <h2 className="font-semibold mb-4">Status History</h2>
              {currentTicket.statusHistory?.length === 0 && (
                <p className="text-gray-400 text-sm">No status changes yet.</p>
              )}
              <div className="space-y-2">
                {currentTicket.statusHistory?.map((h) => (
                  <div
                    key={h._id}
                    className="flex items-center gap-2 text-sm text-gray-600"
                  >
                    <span className="text-red-400 line-through">
                      {h.oldStatus}
                    </span>
                    <span>→</span>
                    <span className="text-green-600 font-medium">
                      {h.newStatus}
                    </span>
                    <span className="text-gray-400">
                      by {h.changedBy?.name} on{" "}
                      {new Date(h.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar Info */}
          <div className="space-y-4">
            {/* Ticket Info */}
            <div className="bg-white rounded shadow p-5 space-y-3 text-sm">
              <h2 className="font-semibold mb-2">Ticket Info</h2>
              <div className="flex justify-between">
                <span className="text-gray-500">Status</span>
                <Badge value={currentTicket.status} type="status" />
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Priority</span>
                <Badge value={currentTicket.priority} type="priority" />
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Category</span>
                <span>{currentTicket.category}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Assigned To</span>
                <span>{currentTicket.assignedTo?.name || "Unassigned"}</span>
              </div>
            </div>

            {/* Status Update — Admin & Agent */}
            {(user?.role === "admin" || user?.role === "agent") && (
              <div className="bg-white rounded shadow p-5 text-sm">
                <h2 className="font-semibold mb-3">Update Status</h2>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full border rounded px-3 py-2 mb-3"
                >
                  <option>Open</option>
                  <option>In Progress</option>
                  <option>Resolved</option>
                  <option>Closed</option>
                </select>
                <button
                  onClick={handleStatusUpdate}
                  className="w-full bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600"
                >
                  Update Status
                </button>
              </div>
            )}

            {/* Assign Ticket — Admin only */}
            {user?.role === "admin" && (
              <div className="bg-white rounded shadow p-5 text-sm">
                <h2 className="font-semibold mb-3">Assign Ticket</h2>
                <select
                  value={selectedAgent}
                  onChange={(e) => setSelectedAgent(e.target.value)}
                  className="w-full border rounded px-3 py-2 mb-3"
                >
                  <option value="">Select Agent</option>
                  {agents.map((agent) => (
                    <option key={agent._id} value={agent._id}>
                      {agent.name}
                    </option>
                  ))}
                </select>
                <button
                  onClick={handleAssign}
                  className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
                >
                  Assign
                </button>
              </div>
            )}

            {/* Edit Button */}
            {(user?.role === "admin" ||
              currentTicket.createdBy?._id === user?._id) && (
              <button
                onClick={() => navigate(`/tickets/${id}/edit`)}
                className="w-full bg-gray-700 text-white py-2 rounded hover:bg-gray-800 text-sm"
              >
                Edit Ticket
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
