"use client";

import React from "react";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, Loader2 } from "lucide-react";

// Simplified schema to match backend exactly
const departmentSchema = z.object({
  code: z.string().min(1, { message: "Le code est obligatoire" }),
  name: z.string().min(1, { message: "Le nom est obligatoire" })
});

type DepartmentData = z.infer<typeof departmentSchema>;

const DepartmentForm: React.FC<{
  onSubmitSuccess: () => void;
  onCancel: () => void;
}> = ({ 
  onSubmitSuccess, 
  onCancel
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm<DepartmentData>({
    resolver: zodResolver(departmentSchema)
  });

  const onSubmit: SubmitHandler<DepartmentData> = async (data) => {
    setLoading(true);
    setError("");
    setSuccess("");
    
    try {
      const token = localStorage.getItem("token");
      
      await axios.post("http://localhost:8080/api/departments", data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "profile-secret": "pol"
        },
      });
      
      setSuccess("Le département a été créé avec succès");
      
      setTimeout(() => {
        onSubmitSuccess();
      }, 1500);
    } catch (error) {
      console.error("Erreur lors de l'enregistrement du département:", error);
      setError("Une erreur s'est produite lors de l'enregistrement du département");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="overflow-y-auto max-h-[80vh]">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 bg-white dark:bg-gray-800 p-6 rounded-md shadow-sm w-full max-w-4xl mx-auto">
        <h2 className="text-lg font-medium text-gray-800 dark:text-white border-b pb-3">
          Créer un nouveau département
        </h2>
        
        <div className="border-l-4 border-blue-500 pl-3 bg-blue-50 dark:bg-blue-900 py-2 px-2">
          <span className="text-sm text-gray-700 dark:text-gray-200 font-medium">
            Informations du département
          </span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1 w-full">
            <label className="text-sm text-gray-600 dark:text-gray-300 font-medium" htmlFor="code">
              Code <span className="text-red-500">*</span>
            </label>
            <input
              id="code"
              type="text"
              placeholder="D001"
              className={`border ${errors.code ? 'border-red-300 bg-red-50 dark:bg-red-900' : 'border-gray-300 dark:border-gray-600'} rounded-md p-2.5 text-sm w-full focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white`}
              {...register("code")}
            />
            {errors.code && (
              <p className="text-xs text-red-500 dark:text-red-400 mt-1 flex items-center">
                <AlertCircle className="inline h-3 w-3 mr-1" />
                {errors.code.message}
              </p>
            )}
          </div>
          
          <div className="flex flex-col gap-1 w-full">
            <label className="text-sm text-gray-600 dark:text-gray-300 font-medium" htmlFor="name">
              Nom <span className="text-red-500">*</span>
            </label>
            <input
              id="name"
              type="text"
              placeholder="Département des Ressources Humaines"
              className={`border ${errors.name ? 'border-red-300 bg-red-50 dark:bg-red-900' : 'border-gray-300 dark:border-gray-600'} rounded-md p-2.5 text-sm w-full focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white`}
              {...register("name")}
            />
            {errors.name && (
              <p className="text-xs text-red-500 dark:text-red-400 mt-1 flex items-center">
                <AlertCircle className="inline h-3 w-3 mr-1" />
                {errors.name.message}
              </p>
            )}
          </div>
        </div>
        
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded relative" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        
        {success && (
          <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded relative" role="alert">
            <span className="block sm:inline">{success}</span>
          </div>
        )}
        
        <div className="sticky bottom-0 bg-white dark:bg-gray-800 border-t py-3 flex justify-end gap-3 mt-4">
          <button
            type="button"
            onClick={onCancel}
            className="border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-200 px-4 py-2 rounded-md text-sm hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            Annuler
          </button>
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 disabled:bg-blue-400 flex items-center gap-2"
          >
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            {loading ? "Traitement..." : "Enregistrer"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default DepartmentForm;