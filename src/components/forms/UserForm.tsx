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
  matricule: z
    .string()
    .min(1, { message: "L'identifiant utilisateur est obligatoire!" }),
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
  department: z
    .string()
    .min(1, { message: "Le département est obligatoire!" }),
  manager: z
    .string()
    .min(1, { message: "Le responsable est obligatoire!" }),
  img: z
    .instanceof(File)
    .optional(),
});

type Inputs = z.infer<typeof schema>;

interface UserFormProps {
  type: "create" | "update";
  data?: any;
  onClose: () => void;
  managers?: Array<{
    matricule: string;
    firstName: string;
    lastName: string;
  }>;
}

// Interface pour CustomInputField
interface CustomInputFieldProps {
  label: string;
  name: keyof Inputs;
  type?: string;
  defaultValue?: string;
}

const UserForm = ({
  type,
  data,
  onClose,
  managers = []
}: UserFormProps) => {
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
      matricule: data?.matricule || "",
      firstName: data?.firstName || "",
      lastName: data?.lastName || "",
      phone: data?.phone || "",
      address: data?.address || "",
      department: data?.departmentDTO?.code || "",
      manager: data?.manager || "",
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
        matricule: formData.matricule,
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
        address: formData.address,
        departmentDTO: {
          code: formData.department
        },
        manager: formData.manager,
        roles: [{ name: "user" }],
      };
      
      console.log("Données formatées pour le backend:", backendData);
      
      // Simulation de l'appel API (à remplacer par l'appel réel)
      // const response = await fetch('http://localhost:8085/api/users', {
      //   method: 'POST',
      //   headers: { 
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(backendData)
      // });
      
      // const responseData = await response.json();
      
      // if (!response.ok) {
      //   throw new Error(responseData.message || 'Échec de la création du collaborateur');
      // }
      
      // Simuler le succès
      setSubmitSuccess(`Collaborateur créé avec succès. Matricule: ${formData.matricule}`);
      
      // Fermer la modal après un court délai
      setTimeout(() => {
        onClose();
      }, 2000);
      
    } catch (error: any) {
      console.error("Erreur lors de la soumission du formulaire:", error);
      setSubmitError(error.message || "Échec de la soumission du formulaire. Veuillez réessayer.");
    } finally {
      setIsSubmitting(false);
    }
  });

  // Composant avec typage correct
  const CustomInputField = ({ label, name, type = "text", defaultValue = "" }: CustomInputFieldProps) => (
    <div className="flex flex-col gap-1 w-full">
      <label className="text-sm text-gray-600 dark:text-gray-300 font-medium">{label}</label>
      <input
        type={type}
        className="border border-gray-300 dark:border-gray-600 rounded-md p-2.5 text-sm w-full focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
        {...register(name)}
        defaultValue={defaultValue}
      />
      {errors[name] && (
        <p className="text-xs text-red-500 dark:text-red-400 mt-1">
          {errors[name]?.message?.toString()}
        </p>
      )}
    </div>
  );

  return (
    <div className="overflow-y-auto max-h-[80vh]">
      <form className="flex flex-col gap-5 bg-white dark:bg-gray-800 p-6 rounded-md shadow-sm w-full max-w-4xl mx-auto" onSubmit={onSubmit}>
        <h2 className="text-lg font-medium text-gray-800 dark:text-white border-b pb-3">
          {type === "create" ? "Créer un nouveau collaborateur" : "Modifier le collaborateur"}
        </h2>
        
        <div className="border-l-4 border-blue-500 pl-3 bg-blue-50 dark:bg-blue-900 py-2 px-2">
          <span className="text-sm text-gray-700 dark:text-gray-200 font-medium">
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
          <CustomInputField
            label="Identifiant utilisateur"
            name="matricule"
            defaultValue={data?.matricule}
          />
        </div>
        
        <div className="border-l-4 border-green-500 pl-3 bg-green-50 dark:bg-green-900 py-2 px-2 mt-2">
          <span className="text-sm text-gray-700 dark:text-gray-200 font-medium">
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
        
        <div className="border-l-4 border-yellow-500 pl-3 bg-yellow-50 dark:bg-yellow-900 py-2 px-2 mt-2">
          <span className="text-sm text-gray-700 dark:text-gray-200 font-medium">
            Informations organisationnelles
          </span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-600 dark:text-gray-300 font-medium">Département</label>
            <select
              className="border border-gray-300 dark:border-gray-600 rounded-md p-2.5 text-sm w-full focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              {...register("department")}
              defaultValue={data?.departmentDTO?.code}
            >
              <option value="">Sélectionner un département</option>
              <option value="D001">Finance</option>
              <option value="D002">Informatique</option>
              <option value="D003">Ressources Humaines</option>
              <option value="D004">Ventes</option>
              <option value="D005">Marketing</option>
            </select>
            {errors.department?.message && (
              <p className="text-xs text-red-500 dark:text-red-400 mt-1">
                {errors.department.message.toString()}
              </p>
            )}
          </div>
          
          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-600 dark:text-gray-300 font-medium">Responsable</label>
            <select
              className="border border-gray-300 dark:border-gray-600 rounded-md p-2.5 text-sm w-full focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              {...register("manager")}
              defaultValue={data?.manager}
            >
              <option value="">Sélectionner un responsable</option>
              {managers.length > 0 ? (
                managers.map((manager) => (
                  <option key={manager.matricule} value={manager.matricule}>
                    {manager.firstName} {manager.lastName} ({manager.matricule})
                  </option>
                ))
              ) : (
                <option value="D6M3N093">Fouad Madani (D6M3N093)</option>
              )}
            </select>
            {errors.manager?.message && (
              <p className="text-xs text-red-500 dark:text-red-400 mt-1">
                {errors.manager.message.toString()}
              </p>
            )}
          </div>
          
          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-600 dark:text-gray-300 font-medium" htmlFor="img">
              Photo de profil
            </label>
            <div className="flex items-center">
              <label
                className="cursor-pointer bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 py-2.5 px-3 rounded-md text-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors border border-gray-300 dark:border-gray-600"
                htmlFor="img"
              >
                Télécharger une photo
              </label>
              <input type="file" id="img" {...register("img")} className="hidden" />
            </div>
            {errors.img?.message && (
              <p className="text-xs text-red-500 dark:text-red-400 mt-1">
                {errors.img.message.toString()}
              </p>
            )}
          </div>
        </div>
        
        {submitError && (
          <div className="bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 text-red-700 dark:text-red-200 p-3 rounded-md text-sm mt-3">
            {submitError}
          </div>
        )}
        
        {submitSuccess && (
          <div className="bg-green-50 dark:bg-green-900 border border-green-200 dark:border-green-700 text-green-700 dark:text-green-200 p-3 rounded-md text-sm mt-3">
            {submitSuccess}
          </div>
        )}
        
        <div className="sticky bottom-0 bg-white dark:bg-gray-800 border-t py-3 flex justify-end gap-3 mt-4">
          <button 
            type="button" 
            onClick={onClose}
            className="border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-200 px-4 py-2 rounded-md text-sm hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            Annuler
          </button>
          <button 
            type="submit" 
            className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 disabled:bg-blue-400"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Traitement..." : type === "create" ? "Créer le collaborateur" : "Mettre à jour le collaborateur"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserForm;