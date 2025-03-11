"use client"; // Mark the page as a client-side component
import { useState } from "react";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { employeesData, role } from "@/lib/data";  // Adjust data for attendance
import Image from "next/image";
import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";

// Define Attendance type
type Attendance = {
  id: number;
  employeeName: string;
  date: string;
  status: "Present" | "Absent" | "Late";
};

const columns = [
  {
    header: "Employee Name",
    accessor: "employeeName",
  },
  {
    header: "Date",
    accessor: "date",
  },
  {
    header: "Status",
    accessor: "status",
  },
  {
    header: "Actions",
    accessor: "action",
  },
];

const AttendancePage = () => {
  // Attendance data
  const [attendanceData, setAttendanceData] = useState<Attendance[]>([
    { id: 1, employeeName: "John Doe", date: "2025-03-01", status: "Present" },
    { id: 2, employeeName: "Jane Smith", date: "2025-03-01", status: "Absent" },
    { id: 3, employeeName: "Mark Green", date: "2025-03-01", status: "Late" },
  ]);

  // Function to render each row of attendance data
  const renderRow = (item: Attendance) => (
    <tr key={item.id} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight">
      <td className="p-4">{item.employeeName}</td>
      <td className="p-4">{item.date}</td>
      <td className="p-4">{item.status}</td>
      <td className="p-4">
        <div className="flex items-center gap-2">
          {role === "admin" && (
            <>
              {/* Modal for updating attendance */}
              <FormModal table="attendance" type="update" data={item} />
              {/* Modal for deleting attendance record */}
              <FormModal table="attendance" type="delete" id={item.id} />
            </>
          )}
        </div>
      </td>
    </tr>
  );

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="hidden md:block text-lg font-semibold">Attendance Overview</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/filter.png" alt="Filter" width={14} height={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/sort.png" alt="Sort" width={14} height={14} />
            </button>
            {role === "admin" && (
              // Button to open modal for adding new attendance
              <FormModal table="attendance" type="create" />
            )}
          </div>
        </div>
      </div>
      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white text-sm">
          <thead>
            <tr className="border-b bg-gray-100">
              {columns.map((col) => (
                <th key={col.header} className="p-4 text-left font-semibold">{col.header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {attendanceData.map(renderRow)}
          </tbody>
        </table>
      </div>
      {/* PAGINATION */}
      <Pagination />
    </div>
  );
};

export default AttendancePage;
