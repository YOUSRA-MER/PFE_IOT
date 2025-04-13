"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import { protectedApi } from "@/services/api";
import { useRouter } from "next/navigation";

// Updated schema for validation
const pointeuseSchema = z.object({
  code: z.string().min(1, { message: "Le code est obligatoire" }),
  name: z.string().min(1, { message: "Le nom est obligatoire" }),
  description: z.string().optional(),
  badgeuseType: z.enum(["IN", "OUT"], { message: "Le type doit être IN ou OUT" })
});

type PointeuseData = z.infer<typeof pointeuseSchema>;

interface Pointeuse {
  id?: number;
  code: string;
  name: string;
  description?: string;
  matricule?: string; // Added to match backend model
  badgeuseType: "IN" | "OUT";
}

interface PointeuseFormProps {
  pointeuse: Pointeuse | null;
  onSubmitSuccess: () => void;
  onCancel: () => void;
  type: "create" | "update";
}

interface CustomInputFieldProps {
  label: string;
  name: keyof PointeuseData;
  register: any;
  error?: any;
  type?: string;
  placeholder?: string;
  required?: boolean;
}

export default function PointeuseForm({ 
  pointeuse, 
  onSubmitSuccess, 
  onCancel,
  type
}: PointeuseFormProps) {
  const router = useRouter();
  const isEditMode = type === "update";
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm<PointeuseData>({
    resolver: zodResolver(pointeuseSchema),
    defaultValues: {
      code: pointeuse?.code || "",
      name: pointeuse?.name || "",
      description: pointeuse?.description || "",
      badgeuseType: pointeuse?.badgeuseType || "IN"
    }
  });

  const onSubmit: SubmitHandler<PointeuseData> = async (data) => {
    setLoading(true);
    setError("");
    setSuccess("");
    
    try {
      if (isEditMode && pointeuse?.id) {
        // Update existing pointeuse
        await protectedApi.put(`/badgeuse/update/${pointeuse.id}`, data);
        setSuccess("La pointeuse a été mise à jour avec succès");
      } else {
        // Create new pointeuse
        await protectedApi.post("/badgeuse/save", data);
        setSuccess("La pointeuse a été créée avec succès");
      }
      
      setTimeout(() => {
        onSubmitSuccess();
      }, 1500);
    } catch (error: any) {
      console.error("Erreur lors de l'enregistrement de la pointeuse:", error);
      
      if (error.response?.status === 401 || error.response?.status === 403) {
        // Handle unauthorized or forbidden access
        localStorage.removeItem('token');
        router.push('/login');
      } else if (error.response?.data?.message) {
        // Display server-provided error message if available
        setError(error.response.data.message);
      } else {
        setError("Une erreur s'est produite lors de l'enregistrement de la pointeuse");
      }
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
          {isEditMode ? "Modifier la pointeuse" : "Créer une nouvelle pointeuse"}
        </h2>
        
        {success && (
          <div className="bg-green-50 dark:bg-green-900 border-l-4 border-green-500 p-4 flex items-start">
            <CheckCircle2 className="h-5 w-5 text-green-500 dark:text-green-400 mr-2 mt-0.5" />
            <p className="text-sm text-green-700 dark:text-green-200">{success}</p>
          </div>
        )}
        
        {error && (
          <div className="bg-red-50 dark:bg-red-900 border-l-4 border-red-500 p-4 flex items-start">
            <AlertCircle className="h-5 w-5 text-red-500 dark:text-red-400 mr-2 mt-0.5" />
            <p className="text-sm text-red-700 dark:text-red-200">{error}</p>
          </div>
        )}
        
        <div className="border-l-4 border-blue-500 pl-3 bg-blue-50 dark:bg-blue-900 py-2 px-2">
          <span className="text-sm text-gray-700 dark:text-gray-200 font-medium">
            Informations de la pointeuse
          </span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <CustomInputField
            label="Code"
            name="code"
            register={register}
            error={errors.code}
            placeholder="AQ195"
            required
          />
          
          <CustomInputField
            label="Nom"
            name="name"
            register={register}
            error={errors.name}
            placeholder="Main Entrance Badge Reader"
            required
          />
        </div>
        
        <div className="grid grid-cols-1 gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-600 dark:text-gray-300 font-medium" htmlFor="description">Description</label>
            <textarea
              id="description"
              rows={3}
              className="border border-gray-300 dark:border-gray-600 rounded-md p-2.5 text-sm w-full focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              placeholder="Description détaillée de la pointeuse..."
              {...register("description")}
            />
          </div>
        </div>
        
        <div className="border-l-4 border-green-500 pl-3 bg-green-50 dark:bg-green-900 py-2 px-2 mt-2">
          <span className="text-sm text-gray-700 dark:text-gray-200 font-medium">
            Configuration
          </span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-600 dark:text-gray-300 font-medium" htmlFor="badgeuseType">
              Type de pointeuse <span className="text-red-500">*</span>
            </label>
            <select
              id="badgeuseType"
              className={`border ${errors.badgeuseType ? 'border-red-300 bg-red-50 dark:bg-red-900' : 'border-gray-300 dark:border-gray-600'} rounded-md p-2.5 text-sm w-full focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white`}
              {...register("badgeuseType")}
            >
              <option value="IN">Entrée (IN)</option>
              <option value="OUT">Sortie (OUT)</option>
            </select>
            {errors.badgeuseType && (
              <p className="text-xs text-red-500 dark:text-red-400 mt-1 flex items-center">
                <AlertCircle className="inline h-3 w-3 mr-1" />
                {errors.badgeuseType.message?.toString()}
              </p>
            )}
          </div>
        </div>
        
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