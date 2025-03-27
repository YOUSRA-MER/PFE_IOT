"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import FormModal from "../../../../components/FormModal";
import Table from "../../../../components/Table";
import { Search, PlusCircle, Loader2, Eye } from "lucide-react";
import Link from "next/link";

interface Pointage {
  id: number;
  matricule: string;
  date: string;
  heure: string;
  pointeuseId: number;
  type: "IN" | "OUT";
}

interface TableColumn {
  header: string;
  accessor: string;
  cell?: (row: any) => React.ReactNode;
}

export default function PointagePage() {
  const [pointages, setPointages] = useState<Pointage[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedPointage, setSelectedPointage] = useState<Pointage | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredPointages, setFilteredPointages] = useState<Pointage[]>([]);

  useEffect(() => {
    fetchPointages();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = pointages.filter(
        p => 
          p.matricule.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.date.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.heure.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredPointages(filtered);
    } else {
      setFilteredPointages(pointages);
    }
  }, [searchTerm, pointages]);

  const fetchPointages = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get<Pointage[]>("http://localhost:8085/api/pointage/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPointages(response.data);
      setFilteredPointages(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Erreur lors de la récupération des pointages:", error);
      setLoading(false);
    }
  };

  const handleAddClick = () => {
    setSelectedPointage(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (pointage: Pointage) => {
    setSelectedPointage(pointage);
    setIsModalOpen(true);
  };

  const handleDeletePointage = async (id: number) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce pointage?")) {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        await axios.delete(`http://localhost:8085/api/pointage/delete/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        fetchPointages();
      } catch (error) {
        console.error("Erreur lors de la suppression du pointage:", error);
        setLoading(false);
      }
    }
  };

  const handleFormSubmit = () => {
    setIsModalOpen(false);
    fetchPointages();
  };

  const getWeekNumber = (d: Date) => {
    const date = new Date(d);
    date.setHours(0, 0, 0, 0);
    date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
    const week1 = new Date(date.getFullYear(), 0, 4);
    return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
  };

  const columns: TableColumn[] = [
    { header: "Matricule", accessor: "matricule" },
    { header: "Date", accessor: "date" },
    { header: "Heure", accessor: "heure" },
    { header: "Pointeuse ID", accessor: "pointeuseId" },
    { 
      header: "Type", 
      accessor: "type",
      cell: (row: Pointage) => (
        <span className={`py-1 px-3 rounded-full text-xs font-medium ${
          row.type === "IN" 
            ? "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100" 
            : "bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100"
        }`}>
          {row.type === "IN" ? "Entrée" : "Sortie"}
        </span>
      )
    },
    {
      header: "Actions",
      accessor: "actions",
      cell: (row: Pointage) => (
        <div className="flex space-x-2">
          <button
            onClick={() => handleEditClick(row)}
            className="bg-amber-500 hover:bg-amber-600 text-white font-medium py-1.5 px-3 rounded-md text-xs transition-colors shadow-sm hover:shadow-md flex items-center gap-1"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
            </svg>
            Modifier
          </button>
          <button
            onClick={() => handleDeletePointage(row.id)}
            className="bg-red-500 hover:bg-red-600 text-white font-medium py-1.5 px-3 rounded-md text-xs transition-colors shadow-sm hover:shadow-md flex items-center gap-1"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            </svg>
            Supprimer
          </button>
          <Link
            href={{
              pathname: "/dashboard/Pointage/details",
              query: { 
                matricule: row.matricule,
                annee: new Date(row.date).getFullYear(),
                semaine: getWeekNumber(new Date(row.date))
              }
            }}
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-1.5 px-3 rounded-md text-xs transition-colors shadow-sm hover:shadow-md flex items-center gap-1"
          >
            <Eye className="h-3.5 w-3.5" />
            Détails
          </Link>
        </div>
      ),
    },
  ];

  return (
    <div className="container mx-auto p-4 sm:p-6">
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div className="mb-4 md:mb-0">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Liste des Pointages</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">Gérez les enregistrements de pointage des collaborateurs</p>
          </div>
          
          {/* Improved Search and Add Section */}
          <div className="w-full md:w-auto bg-gray-50 dark:bg-gray-800 p-3 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="flex flex-col sm:flex-row gap-3 w-full">
              {/* Enhanced Search Input */}
              <div className="relative flex-grow">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Rechercher par matricule, date ou heure..."
                  className="pl-10 pr-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-600 dark:bg-gray-700 dark:text-white transition-all duration-200 shadow-inner"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              {/* Enhanced Add Button */}
              <button
                onClick={handleAddClick}
                className="flex-shrink-0 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-5 rounded-lg flex items-center justify-center gap-2 transition-all duration-200 shadow-md hover:shadow-lg"
              >
                <PlusCircle className="h-5 w-5" />
                <span className="whitespace-nowrap">Ajouter un pointage</span>
              </button>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 text-blue-500 animate-spin" />
            <span className="ml-2 text-gray-600 dark:text-gray-400">Chargement des données...</span>
          </div>
        ) : (
          <>
            {filteredPointages.length === 0 ? (
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8 text-center border border-dashed border-gray-300 dark:border-gray-700">
                <p className="text-gray-500 dark:text-gray-400">
                  {searchTerm ? "Aucun pointage correspondant à votre recherche." : "Aucun pointage trouvé. Commencez par en ajouter un."}
                </p>
              </div>
            ) : (
              <div className="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700 shadow-xs">
                <Table 
                  columns={columns} 
                  data={filteredPointages}
                />
              </div>
            )}
          </>
        )}
      </div>

      {isModalOpen && (
        <FormModal 
          table="pointage"
          type={selectedPointage ? "update" : "create"}
          data={selectedPointage}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleFormSubmit}
        />
      )}
    </div>
  );
}