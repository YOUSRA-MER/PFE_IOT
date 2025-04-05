interface TableProps {
  columns: { 
    header: string; 
    accessor: string; 
    className?: string;
    renderCell?: (value: any) => React.ReactNode; // Add renderCell function
  }[];
  data: any[];
  renderRow?: (item: any) => React.ReactNode;
  className?: string; // Add optional className for the table
}

const Table = ({ columns, renderRow, data, className = '' }: TableProps) => {
  return (
    <table className={`w-full mt-4 ${className}`}>
      <thead>
        <tr className="text-left text-gray-500 text-sm border-b">
          {columns.map((col) => (
            <th 
              key={col.accessor} 
              className={`px-4 py-3 ${col.className || ''}`}
            >
              {col.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          renderRow ? 
            renderRow(item) : 
            (
              <tr key={index} className="border-b hover:bg-gray-50">
                {columns.map((col) => (
                  <td 
                    key={`${index}-${col.accessor}`} 
                    className={`px-4 py-3 ${col.className || ''}`}
                  >
                    {col.renderCell ? 
                      col.renderCell(item[col.accessor]) : 
                      item[col.accessor]
                    }
                  </td>
                ))}
              </tr>
            )
        ))}
      </tbody>
    </table>
  );
};

export default Table;