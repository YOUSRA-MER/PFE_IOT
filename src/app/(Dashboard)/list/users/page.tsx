import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { role } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
import { Eye, Filter, Plus, ArrowUpDown } from "lucide-react";

// Données d'exemple - en production, ces données proviendraient d'une API
const usersData = [
  {
    id: 1,
    matricule: "JFKXCS90",
    name: "Sanae Omari",
    email: "sanae.omari@gmail.com",
    photo: "/avatar1.png",
    phone: "0600000000",
    department: "FIN",
    manager: "Fouad Madani",
    address: "123 Main St",
  },
  {
    id: 2,
    matricule: "LMTQRS45",
    name: "Ahmed Tazi",
    email: "ahmed.tazi@gmail.com",
    photo: "/avatar2.png",
    phone: "0611111111",
    department: "IT",
    manager: "Fouad Madani",
    address: "456 Second Ave",
  },
  // Ajoutez plus d'utilisateurs si nécessaire
];

type User = {
  id: number;
  matricule: string;
  name: string;
  email?: string;
  photo: string;
  phone: string;
  department: string;
  manager: string;
  address: string;
};

// Définition du type de colonne pour une meilleure vérification de type
interface Column {
  header: string;
  accessor: string;
  className?: string;
}

const columns: Column[] = [
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
    header: "Responsable",
    accessor: "manager",
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

const UserListPage = () => {
  const renderRow = (item: User) => (
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
      <td className="hidden md:table-cell dark:text-white">{item.manager}</td>
      <td className="hidden lg:table-cell dark:text-white">{item.phone}</td>
      <td className="hidden lg:table-cell dark:text-white">{item.address}</td>
      <td>
        <div className="flex items-center gap-2">
          <Link href={`/list/users/${item.id}`}>
            <button className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaSky dark:bg-gray-700">
              <Eye className="w-4 h-4 dark:text-white" />
            </button>
          </Link>
          {(role === "admin" || role === "mod") && (
            <FormModal table="user" type="delete" id={item.id} />
          )}
        </div>
      </td>
    </tr>
  );

  return (
    <div className="bg-white dark:bg-gray-900 p-4 rounded-md flex-1 m-4 mt-0">
      {/* HAUT */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold dark:text-white">Tous les Collaborateurs</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow dark:bg-gray-700">
              <Filter className="w-3.5 h-3.5 dark:text-white" />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow dark:bg-gray-700">
              <ArrowUpDown className="w-3.5 h-3.5 dark:text-white" />
            </button>
            {(role === "admin" || role === "mod") && (
              <FormModal 
                table="user" 
                type="create" 
                icon={<Plus className="w-4 h-4 dark:text-white" />} 
              />
            )}
          </div>
        </div>
      </div>
      {/* LISTE */}
      <Table columns={columns} renderRow={renderRow} data={usersData} />
      {/* PAGINATION */}
      <Pagination />
    </div>
  );
};

export default UserListPage;