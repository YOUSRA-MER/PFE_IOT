"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import FormModal from "../../../../components/FormModal";
import Table from "@/components/Table";
import { Search, PlusCircle, Loader2 } from "lucide-react";

// Updated interface to match backend exactly
interface Department {
  id?: number;
  code: string;
  name: string;
}

interface TableColumn {
  header: string;
  accessor: string;
  cell?: (row: any) => React.ReactNode;
}

export default function DepartmentsPage() {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredDepartments, setFilteredDepartments] = useState<Department[]>([]);

  useEffect(() => {
    fetchDepartments();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = departments.filter(
        d => 
          d.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
          d.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredDepartments(filtered);
    } else {
      setFilteredDepartments(departments);
    }
  }, [searchTerm, departments]);

  const fetchDepartments = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get<Department[]>("http://localhost:8080/api/departments", {
        headers: {
          Authorization: `Bearer ${token}`,
          "profile-secret": "pol"
        },
      });
      setDepartments(response.data);
      setFilteredDepartments(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Erreur lors de la récupération des départements:", error);
      setLoading(false);
    }
  };

  const handleAddClick = () => {
    setIsModalOpen(true);
  };

  const columns: TableColumn[] = [
    { header: "Code", accessor: "code" },
    { header: "Nom", accessor: "name" }
  ];

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Liste des Départements</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">Gérez les départements de l'entreprise</p>
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
              <span>Ajouter un département</span>
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-8">
            <Loader2 className="h-8 w-8 text-blue-500 animate-spin" />
            <p className="ml-2 text-gray-600 dark:text-gray-400">Chargement des départements...</p>
          </div>
        ) : (
          <>
            {filteredDepartments.length === 0 ? (
              <div className="bg-gray-50 dark:bg-gray-800 rounded-md p-8 text-center border border-dashed border-gray-300 dark:border-gray-700">
                <p className="text-gray-500 dark:text-gray-400">
                  {searchTerm ? "Aucun département correspondant à votre recherche." : "Aucun département trouvé. Commencez par en ajouter un."}
                </p>
              </div>
            ) : (
              <div className="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700">
                <Table 
                  columns={columns} 
                  data={filteredDepartments}
                />
              </div>
            )}
          </>
        )}
      </div>

      {isModalOpen && (
        <FormModal 
          table="department"
          type="create"
          onClose={() => setIsModalOpen(false)}
          onSubmit={() => {
            setIsModalOpen(false);
            fetchDepartments();
          }}
        />
      )}
    </div>
  );
}