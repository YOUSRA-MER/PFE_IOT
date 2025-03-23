interface TableProps {
  columns: { header: string; accessor: string; className?: string }[];
  data: any[];
  renderRow?: (item: any) => React.ReactNode; // Make renderRow optional
}

const Table = ({ columns, renderRow, data }: TableProps) => {
  return (
    <table className="w-full mt-4">
      <thead>
        <tr className="text-left text-gray-500 text-sm">
          {columns.map((col) => (
            <th key={col.accessor} className={col.className}>{col.header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (renderRow ? renderRow(item) : null))} {/* Handle optional renderRow */}
      </tbody>
    </table>
  );
};

export default Table;
