const Table = ({ columns, data, renderRow }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left whitespace-nowrap">
        <thead>
          <tr className="bg-gray-50 text-gray-500 border-b">
            {columns.map((col, i) => (
              <th key={i} className="py-3 px-4 font-semibold">
                {col}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="divide-y">
          {data.map((item, index) => renderRow(item, index))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;