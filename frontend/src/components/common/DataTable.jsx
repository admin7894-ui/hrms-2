const Toggle = ({ enabled, onChange }) => (
  <button
    onClick={(e) => {
      e.stopPropagation();
      onChange(!enabled);
    }}
    className={`${
      enabled ? 'bg-indigo-600' : 'bg-gray-200'
    } relative inline-flex h-5 w-10 items-center rounded-full transition-colors focus:outline-none shadow-inner`}
  >
    <span
      className={`${
        enabled ? 'translate-x-5' : 'translate-x-1'
      } inline-block h-4 w-4 transform rounded-full bg-white transition-transform shadow-sm`}
    />
  </button>
);

const DataTable = ({ columns, data, loading, onEdit, onDelete, onToggle, onView }) => {
  // console.log("this is the person data ",data);
  
  if (loading) {
    return (
      <div className="flex items-center justify-center h-48">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600" />
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-150 shadow-sm">
      <table className="min-w-full divide-y divide-gray-100 text-sm">
        <thead className="bg-gray-50/50">
          <tr>
            {columns.map((col) => (
              <th key={col.key} className="px-4 py-4 text-left font-bold text-gray-500 uppercase tracking-wider text-[10px]">
                {col.label}
              </th>
            ))}
            {(onView || onEdit || onDelete) && (
              <th className="px-4 py-4 text-right text-[10px] font-bold text-gray-500 uppercase">Actions</th>
            )}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-50">
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length + 1} className="text-center py-12 text-gray-400 font-medium">
                No records found
              </td>
            </tr>
          ) : (
            data.map((row, i) => (
              <tr key={row.id || i} className="hover:bg-indigo-50/30 transition-colors group">
                {columns.map((col) => (
                  <td key={col.key} className="px-4 py-3.5 text-gray-700 whitespace-nowrap max-w-xs truncate">
                    {col.type === 'toggle' ? (
                      <Toggle enabled={!!row[col.key]} onChange={(val) => onToggle && onToggle(row.id, col.key, val)} />
                    ) : col.render ? (
                      col.render(row[col.key], row)
                    ) : (
                      String(row[col.key] ?? '—')
                    )}
                  </td>
                ))}
                {(onView || onEdit || onDelete) && (
                  <td className="px-4 py-3.5 text-right space-x-1 whitespace-nowrap">
                    {onView && (
                      <button
                        onClick={() => onView(row)}
                        className="text-blue-600 hover:text-blue-700 font-bold text-[11px] px-2.5 py-1.5 rounded-md hover:bg-blue-100/50 transition-all active:scale-95"
                      >
                        View
                      </button>
                    )}
                    {onEdit && (
                      <button
                        onClick={() => onEdit(row)}
                        className="text-indigo-600 hover:text-indigo-700 font-bold text-[11px] px-2.5 py-1.5 rounded-md hover:bg-indigo-100/50 transition-all active:scale-95"
                      >
                        Edit
                      </button>
                    )}
                    {onDelete && (
                      <button
                        onClick={() => onDelete(row.id)}
                        className="text-red-500 hover:text-red-600 font-bold text-[11px] px-2.5 py-1.5 rounded-md hover:bg-red-50 transition-all active:scale-95"
                      >
                        Delete
                      </button>
                    )}
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
