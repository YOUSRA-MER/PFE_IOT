import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { role } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
import { Eye, Filter, Plus, ArrowUpDown } from "lucide-react";

// Temporary data matching your API structure
const adminsData = [
  {
    id: 1,
    matricule: "TclJ6XLK",
    name: "Kenza Squalli",
    email: "kenza.squalli@gmail.com",
    photo: "/avatar1.png",
    phone: "0600000000",
    department: "FIN",
    role: "Admin",
    address: "123 Admin Street"
  },
  {
    id: 2,
    matricule: "A2D9M4N6",
    name: "Admin Two",
    email: "admin2@company.com",
    photo: "/avatar2.png",
    phone: "0611111111",
    department: "HR",
    role: "Admin",
    address: "456 Management Ave"
  },
  {
    id: 3,
    matricule: "B5C8E2F1",
    name: "Admin Three",
    email: "admin3@company.com",
    photo: "/avatar3.png",
    phone: "0622222222",
    department: "IT",
    role: "Admin",
    address: "789 Executive Blvd"
  }
];

type Admin = {
  id: number;
  matricule: string;
  name: string;
  email?: string;
  photo: string;
  phone: string;
  department: string;
  role: string;
  address: string;
};

const columns = [
  {
    header: "Information",
    accessor: "info",
  },
  {
    header: "Matricule",
    accessor: "matricule",
    className: "hidden md:table-cell",
  },
  {
    header: "Département",
    accessor: "department",
    className: "hidden md:table-cell",
  },
  {
    header: "Rôle",
    accessor: "role",
    className: "hidden md:table-cell",
  },
  {
    header: "Téléphone",
    accessor: "phone",
    className: "hidden lg:table-cell",
  },
  {
    header: "Adresse",
    accessor: "address",
    className: "hidden lg:table-cell",
  },
  {
    header: "Actions",
    accessor: "action",
  },
];

const AdminListPage = () => {
  const renderRow = (item: Admin) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 dark:even:bg-gray-800 text-sm hover:bg-lamaPurpleLight dark:hover:bg-gray-700"
    >
      <td className="flex items-center gap-4 p-4">
        <Image
          src={item.photo}
          alt=""
          width={40}
          height={40}
          className="md:hidden xl:block w-10 h-10 rounded-full object-cover"
        />
        <div className="flex flex-col">
          <h3 className="font-semibold dark:text-white">{item.name}</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400">{item?.email}</p>
        </div>
      </td>
      <td className="hidden md:table-cell dark:text-white">{item.matricule}</td>
      <td className="hidden md:table-cell dark:text-white">{item.department}</td>
      <td className="hidden md:table-cell dark:text-white">{item.role}</td>
      <td className="hidden lg:table-cell dark:text-white">{item.phone}</td>
      <td className="hidden lg:table-cell dark:text-white">{item.address}</td>
      <td>
        <div className="flex items-center gap-2">
          <Link href={`/list/admins/${item.id}`}>
            <button className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaSky dark:bg-gray-700">
              <Eye className="w-4 h-4 dark:text-white" />
            </button>
          </Link>
          {role === "admin" && (
            <FormModal table="admin" type="delete" id={item.id} />
          )}
        </div>
      </td>
    </tr>
  );

  return (
    <div className="bg-white dark:bg-gray-900 p-4 rounded-md flex-1 m-4 mt-0">
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold dark:text-white">Tous les Administrateurs</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow dark:bg-gray-700">
              <Filter className="w-3.5 h-3.5 dark:text-white" />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow dark:bg-gray-700">
              <ArrowUpDown className="w-3.5 h-3.5 dark:text-white" />
            </button>
            {role === "admin" && (
              <FormModal 
                table="admin" 
                type="create" 
                icon={<Plus className="w-4 h-4 dark:text-white" />} 
              />
            )}
          </div>
        </div>
      </div>
      <Table columns={columns} renderRow={renderRow} data={adminsData} />
      <Pagination />
    </div>
  );
};

export default AdminListPage;