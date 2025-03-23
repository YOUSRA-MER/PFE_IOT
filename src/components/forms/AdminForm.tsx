"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Image from "next/image";
import { useState } from "react";

const schema = z.object({
  username: z
    .string()
    .min(3, { message: "Le nom d'utilisateur doit contenir au moins 3 caractères!" })
    .max(20, { message: "Le nom d'utilisateur ne doit pas dépasser 20 caractères!" }),
  email: z
    .string()
    .email({ message: "Adresse e-mail invalide!" })
    .max(50, { message: "L'email ne doit pas dépasser 50 caractères!" }),
  password: z
    .string()
    .max(120, { message: "Le mot de passe ne doit pas dépasser 120 caractères!" }),
  firstName: z
    .string()
    .min(1, { message: "Le prénom est obligatoire!" }),
  lastName: z
    .string()
    .min(1, { message: "Le nom est obligatoire!" }),
  phone: z
    .string()
    .min(1, { message: "Le téléphone est obligatoire!" }),
  address: z
    .string()
    .min(1, { message: "L'adresse est obligatoire!" }),
  departmentCode: z
    .string()
    .min(1, { message: "Le département est obligatoire!" }),
  role: z
    .enum(["admin", "mod"], { message: "Le rôle est obligatoire!" }),
  img: z
    .instanceof(File)
    .optional(),
});

type Inputs = z.infer<typeof schema>;

// Interface pour les props du composant principal
interface AdminFormProps {
  type: "create" | "update";
  data?: any;
  onClose?: () => void;
}

// Interface pour les props du sous-composant
interface CustomInputFieldProps {
  label: string;
  name: keyof Inputs;
  type?: string;
  defaultValue?: string | undefined;
}

const AdminForm = ({
  type,
  data,
  onClose,
}: AdminFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
    defaultValues: {
      username: data?.username || "",
      email: data?.email || "",
      password: data?.password || "",
      firstName: data?.firstName || "",
      lastName: data?.lastName || "",
      phone: data?.phone || "",
      address: data?.address || "",
      departmentCode: data?.department?.code || "",
      role: (data?.role as "admin" | "mod") || "admin"
    }
  });

  const onSubmit = handleSubmit(async (formData) => {
    setIsSubmitting(true);
    setSubmitError("");
    setSubmitSuccess("");
    
    try {
      // Transformation des données pour correspondre à la structure backend
      const backendData = {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        role: [formData.role],
        departmentDTO: {
          code: formData.departmentCode
        }
      };
      
      console.log("Données formatées pour le backend:", backendData);
      
      // Appel API vers le backend
      const response = await fetch('http://localhost:8085/api/auth/signup', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'profile-secret': 'pol' // Selon les exigences de votre documentation API
        },
        body: JSON.stringify(backendData)
      });
      
      const responseData = await response.json();
      
      if (!response.ok) {
        throw new Error(responseData.message || 'Échec de la création de l\'administrateur');
      }
      
      setSubmitSuccess(`Administrateur créé avec succès. Matricule: ${responseData.message.split(':')[1]}`);
      
      // Fermer la modal après un court délai
      setTimeout(() => {
        if (onClose) onClose();
      }, 2000);
      
    } catch (error: any) {
      console.error("Erreur lors de la soumission du formulaire:", error);
      setSubmitError(error.message || "Échec de la soumission du formulaire. Veuillez réessayer.");
    } finally {
      setIsSubmitting(false);
    }
  });

  const CustomInputField = ({ 
    label, 
    name, 
    type = "text", 
    defaultValue = "" 
  }: CustomInputFieldProps) => (
    <div className="flex flex-col gap-1 w-full">
      <label className="text-sm text-gray-600 font-medium">{label}</label>
      <input
        type={type}
        className="border border-gray-300 rounded-md p-2.5 text-sm w-full focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
        {...register(name)}
        defaultValue={defaultValue}
      />
      {errors[name] && (
        <p className="text-xs text-red-500 mt-1">
          {errors[name]?.message?.toString()}
        </p>
      )}
    </div>
  );

  return (
    <div className="overflow-y-auto max-h-[80vh]">
      <form className="flex flex-col gap-5 bg-white p-6 rounded-md shadow-sm w-full max-w-4xl mx-auto" onSubmit={onSubmit}>
        <h2 className="text-lg font-medium text-gray-800 border-b pb-3">
          {type === "create" ? "Créer un nouvel administrateur" : "Modifier l'administrateur"}
        </h2>
        
        <div className="border-l-4 border-blue-500 pl-3 bg-blue-50 py-2 px-2">
          <span className="text-sm text-gray-700 font-medium">
            Informations d'authentification
          </span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <CustomInputField
            label="Nom d'utilisateur"
            name="username"
            defaultValue={data?.username}
          />
          <CustomInputField
            label="Email"
            name="email"
            defaultValue={data?.email}
          />
          <CustomInputField
            label="Mot de passe"
            name="password"
            type="password"
            defaultValue={data?.password}
          />
        </div>
        
        <div className="border-l-4 border-green-500 pl-3 bg-green-50 py-2 px-2 mt-2">
          <span className="text-sm text-gray-700 font-medium">
            Informations personnelles
          </span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <CustomInputField
            label="Prénom"
            name="firstName"
            defaultValue={data?.firstName}
          />
          <CustomInputField
            label="Nom"
            name="lastName"
            defaultValue={data?.lastName}
          />
          <CustomInputField
            label="Téléphone"
            name="phone"
            defaultValue={data?.phone}
          />
          <CustomInputField
            label="Adresse"
            name="address"
            defaultValue={data?.address}
          />
        </div>
        
        <div className="border-l-4 border-yellow-500 pl-3 bg-yellow-50 py-2 px-2 mt-2">
          <span className="text-sm text-gray-700 font-medium">
            Informations administratives
          </span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-600 font-medium">Département</label>
            <select
              className="border border-gray-300 rounded-md p-2.5 text-sm w-full focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              {...register("departmentCode")}
              defaultValue={data?.department?.code}
            >
              <option value="">Sélectionner un département</option>
              <option value="D001">Finance</option>
              <option value="D002">Informatique</option>
              <option value="D003">Ressources Humaines</option>
              <option value="D004">Ventes</option>
              <option value="D005">Marketing</option>
            </select>
            {errors.departmentCode?.message && (
              <p className="text-xs text-red-500 mt-1">
                {errors.departmentCode.message.toString()}
              </p>
            )}
          </div>
          
          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-600 font-medium">Rôle</label>
            <select
              className="border border-gray-300 rounded-md p-2.5 text-sm w-full focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              {...register("role")}
              defaultValue={data?.role || "admin"}
            >
              <option value="admin">Administrateur</option>
              <option value="mod">Modérateur</option>
            </select>
            {errors.role?.message && (
              <p className="text-xs text-red-500 mt-1">
                {errors.role.message.toString()}
              </p>
            )}
          </div>
          
          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-600 font-medium" htmlFor="img">
              Photo de profil
            </label>
            <div className="flex items-center">
              <label
                className="cursor-pointer bg-gray-100 text-gray-700 py-2.5 px-3 rounded-md text-sm hover:bg-gray-200 transition-colors border border-gray-300"
                htmlFor="img"
              >
                Télécharger une photo
              </label>
              <input type="file" id="img" {...register("img")} className="hidden" />
            </div>
            {errors.img?.message && (
              <p className="text-xs text-red-500 mt-1">
                {errors.img.message.toString()}
              </p>
            )}
          </div>
        </div>
        
        {submitError && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-md text-sm mt-3">
            {submitError}
          </div>
        )}
        
        {submitSuccess && (
          <div className="bg-green-50 border border-green-200 text-green-700 p-3 rounded-md text-sm mt-3">
            {submitSuccess}
          </div>
        )}
        
        <div className="sticky bottom-0 bg-white border-t py-3 flex justify-end gap-3 mt-4">
          <button 
            type="button" 
            onClick={onClose}
            className="border border-gray-300 text-gray-600 px-4 py-2 rounded-md text-sm hover:bg-gray-50"
          >
            Annuler
          </button>
          <button 
            type="submit" 
            className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 disabled:bg-blue-400"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Traitement..." : type === "create" ? "Créer l'administrateur" : "Mettre à jour l'administrateur"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminForm;