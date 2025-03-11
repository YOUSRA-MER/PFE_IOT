"use client"; // Marking as Client Component to use client-side features like useState

import { useState } from "react";
import FormModal from "@/components/FormModal";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import Pagination from "@/components/Pagination";
import Image from "next/image";

// Example settings options
const columns = [
  {
    header: "Setting",
    accessor: "setting",
  },
  {
    header: "Value",
    accessor: "value",
  },
  {
    header: "Actions",
    accessor: "action",
  },
];

const settingsData = [
  { id: 1, setting: "Email Notifications", value: "Enabled" },
  { id: 2, setting: "Dark Mode", value: "Disabled" },
  { id: 3, setting: "Account Privacy", value: "Public" },
];

const SettingsPage = () => {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [accountPrivacy, setAccountPrivacy] = useState("Public");

  const renderRow = (item: typeof settingsData[0]) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
    >
      <td className="flex items-center gap-4 p-4">{item.setting}</td>
      <td>{item.value}</td>
      <td>
        <div className="flex items-center gap-2">
          <FormModal table="assignment" type="update" data={item} />
          <FormModal table="assignment" type="delete" id={item.id} />
        </div>
      </td>
    </tr>
  );

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">Settings</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button
              className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow"
              onClick={() => setEmailNotifications(!emailNotifications)}
            >
              <Image src="/filter.png" alt="" width={14} height={14} />
            </button>
            <button
              className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow"
              onClick={() => setDarkMode(!darkMode)}
            >
              <Image src="/sort.png" alt="" width={14} height={14} />
            </button>
          </div>
        </div>
      </div>
      {/* SETTINGS LIST */}
      <Table columns={columns} renderRow={renderRow} data={settingsData} />
      {/* PAGINATION */}
      <Pagination />
    </div>
  );
};

export default SettingsPage;
