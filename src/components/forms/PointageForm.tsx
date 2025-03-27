"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";

// Define schema for validation
const pointageSchema = z.object({
  matricule: z.string().min(1, { message: "Le matricule est obligatoire" }),
  date: z.string().min(1, { message: "La date est obligatoire" }),
  heure: z.string().min(1, { message: "L'heure est obligatoire" }),
  pointeuseId: z.number().min(1, { message: "L'ID de la pointeuse est obligatoire" }),
  type: z.enum(["IN", "OUT"], { message: "Le type doit être IN ou OUT" })
});

type PointageData = z.infer<typeof pointageSchema>;

interface Pointage {
  id?: string;
  matricule: string;
  date: string;
  heure: string;
  pointeuseId: number;
  type: "IN" | "OUT";
}

interface PointageFormProps {
  pointage: Pointage | null;
  onSubmitSuccess: () => void;
  onCancel: () => void;
  type: "create" | "update";
}

interface CustomInputFieldProps {
  label: string;
  name: keyof PointageData;
  register: any;
  error?: any;
  type?: string;
  placeholder?: string;
  required?: boolean;
}

export default function PointageForm({ 
  pointage, 
  onSubmitSuccess, 
  onCancel,
  type
}: PointageFormProps) {
  const isEditMode = type === "update";
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm<PointageData>({
    resolver: zodResolver(pointageSchema),
    defaultValues: {
      matricule: pointage?.matricule || "",
      date: pointage?.date || "",
      heure: pointage?.heure || "",
      pointeuseId: pointage?.pointeuseId || 1,
      type: pointage?.type || "IN"
    }
  });

  const onSubmit: SubmitHandler<PointageData> = async (data) => {
    setLoading(true);
    setError("");
    setSuccess("");
    
    try {
      const token = localStorage.getItem("token");
      
      if (isEditMode && pointage?.id) {
        await axios.put(`http://localhost:8085/api/pointage/update/${pointage.id}`, data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setSuccess("Le pointage a été mis à jour avec succès");
      } else {
        await axios.post("http://localhost:8085/api/pointage/save", data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setSuccess("Le pointage a été créé avec succès");
      }
      
      setTimeout(() => {
        onSubmitSuccess();
      }, 1500);
    } catch (error) {
      console.error("Erreur lors de l'enregistrement du pointage:", error);
      setError("Une erreur s'est produite lors de l'enregistrement du pointage");
    } finally {
      setLoading(false);
    }
  };

  const CustomInputField = ({ 
    label, 
    name, 
    register, 
    error, 
    type = "text", 
    placeholder = "", 
    required = false 
  }: CustomInputFieldProps) => (
    <div className="flex flex-col gap-1 w-full">
      <label className="text-sm text-gray-600 dark:text-gray-300 font-medium" htmlFor={name}>
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        id={name}
        type={type}
        placeholder={placeholder}
        className={`border ${error ? 'border-red-300 bg-red-50 dark:bg-red-900' : 'border-gray-300 dark:border-gray-600'} rounded-md p-2.5 text-sm w-full focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white`}
        {...register(name)}
      />
      {error && (
        <p className="text-xs text-red-500 dark:text-red-400 mt-1 flex items-center">
          <AlertCircle className="inline h-3 w-3 mr-1" />
          {error.message}
        </p>
      )}
    </div>
  );

  return (
    <div className="overflow-y-auto max-h-[80vh]">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 bg-white dark:bg-gray-800 p-6 rounded-md shadow-sm w-full max-w-4xl mx-auto">
        <h2 className="text-lg font-medium text-gray-800 dark:text-white border-b pb-3">
          {isEditMode ? "Modifier le pointage" : "Créer un nouveau pointage"}
        </h2>
        
        <div className="border-l-4 border-blue-500 pl-3 bg-blue-50 dark:bg-blue-900 py-2 px-2">
          <span className="text-sm text-gray-700 dark:text-gray-200 font-medium">
            Informations du pointage
          </span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <CustomInputField
            label="Matricule"
            name="matricule"
            register={register}
            error={errors.matricule}
            placeholder="D6M3N093"
            required
          />
          
          <CustomInputField
            label="Date"
            name="date"
            register={register}
            error={errors.date}
            type="date"
            required
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <CustomInputField
            label="Heure"
            name="heure"
            register={register}
            error={errors.heure}
            type="time"
            required
          />
          
          <CustomInputField
            label="ID Pointeuse"
            name="pointeuseId"
            register={register}
            error={errors.pointeuseId}
            type="number"
            placeholder="1"
            required
          />
        </div>
        
        <div className="border-l-4 border-green-500 pl-3 bg-green-50 dark:bg-green-900 py-2 px-2 mt-2">
          <span className="text-sm text-gray-700 dark:text-gray-200 font-medium">
            Configuration
          </span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-600 dark:text-gray-300 font-medium" htmlFor="type">
              Type de pointage <span className="text-red-500">*</span>
            </label>
            <select
              id="type"
              className={`border ${errors.type ? 'border-red-300 bg-red-50 dark:bg-red-900' : 'border-gray-300 dark:border-gray-600'} rounded-md p-2.5 text-sm w-full focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white`}
              {...register("type")}
            >
              <option value="IN">Entrée (IN)</option>
              <option value="OUT">Sortie (OUT)</option>
            </select>
            {errors.type && (
              <p className="text-xs text-red-500 dark:text-red-400 mt-1 flex items-center">
                <AlertCircle className="inline h-3 w-3 mr-1" />
                {errors.type.message?.toString()}
              </p>
            )}
          </div>
        </div>
        
        {success && (
          <div className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 p-3 rounded-md flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4" />
            <span className="text-sm">{success}</span>
          </div>
        )}
        
        {error && (
          <div className="bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-100 p-3 rounded-md flex items-center gap-2">
            <AlertCircle className="h-4 w-4" />
            <span className="text-sm">{error}</span>
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
            {loading ? "Traitement..." : isEditMode ? "Mettre à jour" : "Enregistrer"}
          </button>
        </div>
      </form>
    </div>
  );
}