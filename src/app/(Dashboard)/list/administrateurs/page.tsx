import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { role, adminsData } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";

type Admin = {
  id: number;
  matricule: string; // Changé adminId en matricule pour correspondre à l'API
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
    header: "Matricule", // Changé "Admin ID" en "Matricule"
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
              <Image src="/view.png" alt="" width={16} height={16} className="dark:invert" />
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
      {/* HAUT */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold dark:text-white">Tous les Administrateurs</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow dark:bg-gray-700">
              <Image src="/filter.png" alt="" width={14} height={14} className="dark:invert" />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow dark:bg-gray-700">
              <Image src="/sort.png" alt="" width={14} height={14} className="dark:invert" />
            </button>
            {role === "admin" && (
              <FormModal table="admin" type="create" />
            )}
          </div>
        </div>
      </div>
      {/* LISTE */}
      <Table columns={columns} renderRow={renderRow} data={adminsData} />
      {/* PAGINATION */}
      <Pagination />
    </div>
  );
};

export default AdminListPage;