import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { role } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";

// Données d'exemple - en production, ces données proviendraient d'une API
const managersData = [
  {
    id: 1,
    matricule: "D6M3N093",
    name: "Fouad Madani",
    email: "fouad.madani@gmail.com",
    photo: "/avatar1.png",
    phone: "0600000001",
    department: "FIN",
    teamSize: 5,
    address: "123 Manager St",
  },
  {
    id: 2,
    matricule: "H7K9P451",
    name: "Nadia Bakkali",
    email: "nadia.bakkali@gmail.com",
    photo: "/avatar2.png",
    phone: "0611111112",
    department: "IT",
    teamSize: 8,
    address: "456 Lead Ave",
  },
  // Ajoutez plus de gestionnaires si nécessaire
];

type Manager = {
  id: number;
  matricule: string;
  name: string;
  email?: string;
  photo: string;
  phone: string;
  department: string;
  teamSize: number;
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
    header: "Taille d'Équipe",
    accessor: "teamSize",
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

const ManagerListPage = () => {
  const renderRow = (item: Manager) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
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
          <h3 className="font-semibold">{item.name}</h3>
          <p className="text-xs text-gray-500">{item?.email}</p>
        </div>
      </td>
      <td className="hidden md:table-cell">{item.matricule}</td>
      <td className="hidden md:table-cell">{item.department}</td>
      <td className="hidden md:table-cell">{item.teamSize}</td>
      <td className="hidden lg:table-cell">{item.phone}</td>
      <td className="hidden lg:table-cell">{item.address}</td>
      <td>
        <div className="flex items-center gap-2">
          <Link href={`/list/managers/${item.id}`}>
            <button className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaSky">
              <Image src="/view.png" alt="" width={16} height={16} />
            </button>
          </Link>
          {role === "admin" && (
            <FormModal table="manager" type="delete" id={item.id} />
          )}
        </div>
      </td>
    </tr>
  );

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* HAUT */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">Tous les Gestionnaires</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/filter.png" alt="" width={14} height={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/sort.png" alt="" width={14} height={14} />
            </button>
            {role === "admin" && (
              <FormModal table="manager" type="create" />
            )}
          </div>
        </div>
      </div>
      {/* LISTE */}
      <Table columns={columns} renderRow={renderRow} data={managersData} />
      {/* PAGINATION */}
      <Pagination />
    </div>
  );
};

export default ManagerListPage;