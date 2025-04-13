import Table from "@/components/Table";
import { Search, ChevronDown, Filter } from "lucide-react";

const subordinates = [
  { name: "Jean Dupont", department: "IT", lastCheckIn: "08:45", status: "Present" },
  { name: "Marie Martin", department: "HR", lastCheckIn: "09:15", status: "Present" },
  { name: "Pierre Durand", department: "Finance", lastCheckIn: "08:30", status: "Present" },
  { name: "Sophie Lambert", department: "IT", lastCheckIn: "-", status: "Absent" },
];

export default function SubordinateList() {
  const columns = [
    { header: "Nom", accessor: "name" },
    { header: "Département", accessor: "department" },
    { header: "Dernier Pointage", accessor: "lastCheckIn" },
    {
      header: "Statut",
      accessor: "status",
      renderCell: (status: string) => (
        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
          status === "Present" 
            ? "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200" 
            : "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200"
        }`}>
          {status}
        </span>
      )
    },
    {
      header: "Actions",
      accessor: "",
      renderCell: () => (
        <button className="text-lamaSky dark:text-lamaSkyLight hover:text-lamaPurple dark:hover:text-lamaPurpleLight font-medium text-xs">
          Détails
        </button>
      )
    }
  ];

  return (
    <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 space-y-2 sm:space-y-0">
        <h2 className="text-sm font-semibold text-gray-800 dark:text-white">Mes Collaborateurs</h2>
        
        <div className="flex items-center space-x-2">
          <div className="relative">
            <input
              type="text"
              placeholder="Rechercher..."
              className="pl-7 pr-2 py-1 text-xs border border-gray-200 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 focus:outline-none focus:ring-1 focus:ring-lamaSky dark:focus:ring-lamaSkyDark"
            />
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-3 w-3 text-gray-400 dark:text-gray-500" />
          </div>
          
          <button className="flex items-center px-2 py-1 text-xs border border-gray-200 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600">
            <Filter className="h-3 w-3 mr-1" />
            Filtrer
            <ChevronDown className="h-2 w-2 ml-1" />
          </button>
        </div>
      </div>
      
      <div className="rounded-md overflow-hidden border border-gray-200 dark:border-gray-700 text-xs">
        <Table
          columns={columns}
          data={subordinates}
          className="w-full"
          darkModeSupport={true}
        />
      </div>
      
      <div className="mt-2 text-center text-xs text-gray-500 dark:text-gray-400">
        Affichage de 4 collaborateurs sur 4
      </div>
    </div>
  );
}