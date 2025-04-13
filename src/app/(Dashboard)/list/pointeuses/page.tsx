"use client";

import { useState, useEffect } from "react";
import { protectedApi } from "@/services/api";
import FormModal from "../../../../components/FormModal";
import Table from "../../../../components/Table";
import { Search, PlusCircle, Loader2, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";

// Updated interface to match backend model
interface Pointeuse {
  id: number;
  code: string;
  name: string;
  description: string;
  matricule?: string; // Added to match backend model
  badgeuseType: "IN" | "OUT";
}

interface TableColumn {
  header: string;
  accessor: string;
  cell?: (row: any) => React.ReactNode;
}

export default function PointeusesPage() {
  const router = useRouter();
  const [pointeuses, setPointeuses] = useState<Pointeuse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedPointeuse, setSelectedPointeuse] = useState<Pointeuse | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredPointeuses, setFilteredPointeuses] = useState<Pointeuse[]>([]);

  useEffect(() => {
    // Check if user is authenticated before fetching data
    const isAuthenticated = localStorage.getItem('token');
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }
    
    fetchPointeuses();
  }, [router]);

  useEffect(() => {
    if (searchTerm) {
      const filtered = pointeuses.filter(
        p => 
          p.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredPointeuses(filtered);
    } else {
      setFilteredPointeuses(pointeuses);
    }
  }, [searchTerm, pointeuses]);

  const fetchPointeuses = async () => {
    try {
      setLoading(true);
      setError(null);
      // Fetch data from the backend API
      const response = await protectedApi.get<Pointeuse[]>("/badgeuse/all");
      setPointeuses(response.data);
      setFilteredPointeuses(response.data);
    } catch (error: any) {
      console.error("Erreur lors de la récupération des pointeuses:", error);
      
      if (error.response?.status === 401 || error.response?.status === 403) {
        // Handle unauthorized or forbidden access
        localStorage.removeItem('token');
        router.push('/login');
      } else {
        setError("Impossible de charger les pointeuses. Veuillez réessayer plus tard.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleAddClick = () => {
    setSelectedPointeuse(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (pointeuse: Pointeuse) => {
    setSelectedPointeuse(pointeuse);
    setIsModalOpen(true);
  };

  const handleDeletePointeuse = async (id: number) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette pointeuse?")) {
      try {
        setLoading(true);
        // Delete the pointeuse using the correct endpoint
        await protectedApi.delete(`/badgeuse/delete/${id}`);
        fetchPointeuses();
      } catch (error: any) {
        console.error("Erreur lors de la suppression de la pointeuse:", error);
        
        if (error.response?.status === 401 || error.response?.status === 403) {
          localStorage.removeItem('token');
          router.push('/login');
        } else {
          setError("Erreur lors de la suppression de la pointeuse. Veuillez réessayer.");
        }
        setLoading(false);
      }
    }
  };

  const handleFormSubmit = () => {
    setIsModalOpen(false);
    fetchPointeuses();
  };

  const columns: TableColumn[] = [
    { header: "Code", accessor: "code" },
    { header: "Nom", accessor: "name" },
    { header: "Description", accessor: "description" },
    { 
      header: "Type", 
      accessor: "badgeuseType",
      cell: (row: Pointeuse) => (
        <span className={`py-1 px-3 rounded-full text-xs font-medium ${
          row.badgeuseType === "IN" 
            ? "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100" 
            : "bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100"
        }`}>
          {row.badgeuseType === "IN" ? "Entrée" : "Sortie"}
        </span>
      )
    },
    {
      header: "Actions",
      accessor: "actions",
      cell: (row: Pointeuse) => (
        <div className="flex space-x-2">
          <button
            onClick={() => handleEditClick(row)}
            className="bg-amber-500 hover:bg-amber-600 text-white font-medium py-1 px-3 rounded-md text-xs transition-colors"
          >
            Modifier
          </button>
          <button
            onClick={() => handleDeletePointeuse(row.id)}
            className="bg-red-500 hover:bg-red-600 text-white font-medium py-1 px-3 rounded-md text-xs transition-colors"
          >
            Supprimer
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Liste des Pointeuses</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">Gérez les appareils de pointage de l'entreprise</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <div className="relative flex-1 sm:flex-initial">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Rechercher..."
                className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md w-full focus:outline-none focus:ring-1 focus:ring-blue-500 dark:focus:ring-blue-600 bg-white dark:bg-gray-800 dark:text-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button
              onClick={handleAddClick}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md flex items-center justify-center gap-2 transition-colors"
            >
              <PlusCircle className="h-4 w-4" />
              <span>Ajouter une pointeuse</span>
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-50 dark:bg-red-900 border-l-4 border-red-500 rounded flex items-center">
            <AlertCircle className="h-5 w-5 text-red-500 dark:text-red-400 mr-2" />
            <p className="text-red-700 dark:text-red-300 text-sm">{error}</p>
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center py-8">
            <Loader2 className="h-8 w-8 text-blue-500 animate-spin" />
            <p className="ml-2 text-gray-600 dark:text-gray-400">Chargement des pointeuses...</p>
          </div>
        ) : (
          <>
            {filteredPointeuses.length === 0 ? (
              <div className="bg-gray-50 dark:bg-gray-800 rounded-md p-8 text-center border border-dashed border-gray-300 dark:border-gray-700">
                <p className="text-gray-500 dark:text-gray-400">
                  {searchTerm ? "Aucune pointeuse correspondant à votre recherche." : "Aucune pointeuse trouvée. Commencez par en ajouter une."}
                </p>
              </div>
            ) : (
              <div className="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700">
                <Table 
                  columns={columns} 
                  data={filteredPointeuses}
                />
              </div>
            )}
          </>
        )}
      </div>

      {isModalOpen && (
        <FormModal 
          table="pointeuse"
          type={selectedPointeuse ? "update" : "create"}
          data={selectedPointeuse}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleFormSubmit}
        />
      )}
    </div>
  );
}