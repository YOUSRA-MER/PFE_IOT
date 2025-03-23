"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";

// Define schema for validation
const pointeuseSchema = z.object({
  code: z.string().min(1, { message: "Le code est obligatoire" }),
  name: z.string().min(1, { message: "Le nom est obligatoire" }),
  description: z.string().optional(),
  badgeuseType: z.enum(["IN", "OUT"], { message: "Le type doit être IN ou OUT" })
});

type PointeuseData = z.infer<typeof pointeuseSchema>;

interface Pointeuse {
  id?: string;
  code: string;
  name: string;
  description?: string;
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
      const token = localStorage.getItem("token");
      
      if (isEditMode && pointeuse?.id) {
        await axios.put(`http://localhost:8085/api/badgeuse/update/${pointeuse.id}`, data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setSuccess("La pointeuse a été mise à jour avec succès");
      } else {
        await axios.post("http://localhost:8085/api/badgeuse/save", data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setSuccess("La pointeuse a été créée avec succès");
      }
      
      setTimeout(() => {
        onSubmitSuccess();
      }, 1500);
    } catch (error) {
      console.error("Erreur lors de l'enregistrement de la pointeuse:", error);
      setError("Une erreur s'est produite lors de l'enregistrement de la pointeuse");
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
      <label className="text-sm text-gray-600 font-medium" htmlFor={name}>
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        id={name}
        type={type}
        placeholder={placeholder}
        className={`border ${error ? 'border-red-300 bg-red-50' : 'border-gray-300'} rounded-md p-2.5 text-sm w-full focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500`}
        {...register(name)}
      />
      {error && (
        <p className="text-xs text-red-500 mt-1 flex items-center">
          <AlertCircle className="inline h-3 w-3 mr-1" />
          {error.message}
        </p>
      )}
    </div>
  );

  return (
    <div className="overflow-y-auto max-h-[80vh]">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 bg-white p-6 rounded-md shadow-sm w-full max-w-4xl mx-auto">
        <h2 className="text-lg font-medium text-gray-800 border-b pb-3">
          {isEditMode ? "Modifier la pointeuse" : "Créer une nouvelle pointeuse"}
        </h2>
        
        <div className="border-l-4 border-blue-500 pl-3 bg-blue-50 py-2 px-2">
          <span className="text-sm text-gray-700 font-medium">
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
            <label className="text-sm text-gray-600 font-medium" htmlFor="description">Description</label>
            <textarea
              id="description"
              rows={3}
              className="border border-gray-300 rounded-md p-2.5 text-sm w-full focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Description détaillée de la pointeuse..."
              {...register("description")}
            />
          </div>
        </div>
        
        <div className="border-l-4 border-green-500 pl-3 bg-green-50 py-2 px-2 mt-2">
          <span className="text-sm text-gray-700 font-medium">
            Configuration
          </span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-600 font-medium" htmlFor="badgeuseType">
              Type de pointeuse <span className="text-red-500">*</span>
            </label>
            <select
              id="badgeuseType"
              className={`border ${errors.badgeuseType ? 'border-red-300 bg-red-50' : 'border-gray-300'} rounded-md p-2.5 text-sm w-full focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500`}
              {...register("badgeuseType")}
            >
              <option value="IN">Entrée (IN)</option>
              <option value="OUT">Sortie (OUT)</option>
            </select>
            {errors.badgeuseType && (
              <p className="text-xs text-red-500 mt-1 flex items-center">
                <AlertCircle className="inline h-3 w-3 mr-1" />
                {errors.badgeuseType.message?.toString()}
              </p>
            )}
          </div>
        </div>
        
        <div className="sticky bottom-0 bg-white border-t py-3 flex justify-end gap-3 mt-4">
          <button
            type="button"
            onClick={onCancel}
            className="border border-gray-300 text-gray-600 px-4 py-2 rounded-md text-sm hover:bg-gray-50"
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
