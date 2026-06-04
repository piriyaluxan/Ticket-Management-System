export function SkeletonCard() {
  return (
    <div className="border rounded-lg p-5 bg-gray-50 animate-pulse">
      <div className="h-3 bg-gray-200 rounded w-1/2 mb-3"></div>
      <div className="h-8 bg-gray-200 rounded w-1/3"></div>
    </div>
  );
}

export function SkeletonRow() {
  return (
    <tr className="animate-pulse">
      {[...Array(6)].map((_, i) => (
        <td key={i} className="px-4 py-3">
          <div className="h-3 bg-gray-200 rounded w-full"></div>
        </td>
      ))}
    </tr>
  );
}

export function SkeletonTable({ rows = 5 }) {
  return (
    <table className="w-full">
      <tbody className="divide-y">
        {[...Array(rows)].map((_, i) => (
          <SkeletonRow key={i} />
        ))}
      </tbody>
    </table>
  );
}
