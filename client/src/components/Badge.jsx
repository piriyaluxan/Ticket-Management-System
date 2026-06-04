export default function Badge({ value, type }) {
  const statusColors = {
    Open: "bg-blue-100 text-blue-700",
    "In Progress": "bg-yellow-100 text-yellow-700",
    Resolved: "bg-green-100 text-green-700",
    Closed: "bg-gray-100 text-gray-600",
  };

  const priorityColors = {
    Low: "bg-green-100 text-green-700",
    Medium: "bg-yellow-100 text-yellow-700",
    High: "bg-orange-100 text-orange-700",
    Urgent: "bg-red-100 text-red-700",
  };

  const colors =
    type === "status" ? statusColors[value] : priorityColors[value];

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${colors}`}>
      {value}
    </span>
  );
}
