"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";

interface PointageDetail {
  date: string;
  heureEntree: string;
  heureSortie: string;
  duree: string;
}

export default function PointageDetailsPage() {
  const [loading, setLoading] = useState<boolean>(true);
  const [pointages, setPointages] = useState<PointageDetail[]>([]);
  const searchParams = useSearchParams();
  
  const matricule = searchParams.get('matricule');
  const annee = searchParams.get('annee');
  const semaine = searchParams.get('semaine');

  useEffect(() => {
    if (matricule) {
      fetchPointageDetails();
    }
  }, [matricule, annee, semaine]);

  const fetchPointageDetails = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.get(`http://localhost:8085/api/pointage/details`, {
        params: {
          matricule,
          annee: annee || new Date().getFullYear(),
          semaine: semaine || getWeekNumber(new Date())
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPointages(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des détails de pointage:", error);
    } finally {
      setLoading(false);
    }
  };

  function getWeekNumber(d: Date) {
    const date = new Date(d);
    date.setHours(0, 0, 0, 0);
    date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
    const week1 = new Date(date.getFullYear(), 0, 4);
    return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
  }

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Détails de Pointage</h1>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Matricule: <span className="font-medium">{matricule}</span>
              </span>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                | Année: <span className="font-medium">{annee}</span>
              </span>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                | Semaine: <span className="font-medium">{semaine}</span>
              </span>
            </div>
          </div>
          <Link
            href="/dashboard/Pointage"
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
          >
            <ArrowLeft className="h-4 w-4" />
            Retour
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 text-blue-500 animate-spin" />
            <span className="ml-2 text-gray-600 dark:text-gray-400">Chargement...</span>
          </div>
        ) : (
          <div className="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Heure Entrée
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Heure Sortie
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Durée
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                {pointages.length > 0 ? (
                  pointages.map((pointage, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                        {pointage.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                        {pointage.heureEntree || '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                        {pointage.heureSortie || '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                        {pointage.duree || '-'}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400">
                      Aucun détail de pointage trouvé
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}