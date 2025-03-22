"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "../InputField";
import Image from "next/image";
import { useState } from "react";

// Schéma Zod basé sur la structure API backend
const schema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long!" })
    .max(20, { message: "Username must be at most 20 characters long!" }),
  email: z
    .string()
    .email({ message: "Invalid email address!" })
    .max(50, { message: "Email must be at most 50 characters long!" }),
  password: z
    .string()
    .max(120, { message: "Password must be at most 120 characters long!" }),
  firstName: z
    .string()
    .min(1, { message: "First name is required!" }),
  lastName: z
    .string()
    .min(1, { message: "Last name is required!" }),
  phone: z
    .string()
    .min(1, { message: "Phone is required!" }),
  address: z
    .string()
    .min(1, { message: "Address is required!" }),
  departmentCode: z
    .string()
    .min(1, { message: "Department code is required!" }),
  role: z
    .enum(["admin", "mod"], { message: "Admin role is required!" }),
  img: z
    .instanceof(File)
    .optional(),
});

type Inputs = z.infer<typeof schema>;

interface AdminFormProps {
  type: "create" | "update";
  data?: any;
  onClose: () => void;
}

const AdminForm = ({
  type,
  data,
  onClose
}: AdminFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
    defaultValues: {
      role: "admin"
    }
  });

  const onSubmit = handleSubmit(async (formData) => {
    setIsSubmitting(true);
    setError(null);
    
    try {
      // Transform the data to match the backend structure (API FingerPrint)
      const backendData = {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        role: [formData.role],
        departmentDTO: {
          code: formData.departmentCode,
          // Si c'est un nouveau département, on peut aussi inclure le name
          // name: type === "create" ? "New Department" : undefined
        }
      };
      
      console.log("Backend formatted data:", backendData);
      
      // API call would go here
      // const response = await fetch('http://localhost:8085/api/auth/signup', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'profile-secret': 'pol'
      //   },
      //   body: JSON.stringify(backendData)
      // });
      
      // if (!response.ok) {
      //   throw new Error(`Error: ${response.status}`);
      // }
      
      // const result = await response.json();
      // console.log("API response:", result);
      
      // Close modal on success
      onClose();
    } catch (err) {
      console.error("Error submitting form:", err);
      setError(err instanceof Error ? err.message : "An unknown error occurred");
    } finally {
      setIsSubmitting(false);
    }
  });

  // Liste des départements (à remplacer par un appel API pour obtenir les départements)
  const departments = [
    { code: "D001", name: "FIN" },
    { code: "D002", name: "IT" },
    { code: "D003", name: "HR" },
  ];

  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">
        {type === "create" ? "Create a new" : "Update"} administrateur
      </h1>
      <span className="text-xs text-gray-400 font-medium">
        Authentication Information
      </span>
      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="Username"
          name="username"
          defaultValue={data?.username}
          register={register}
          error={errors?.username}
        />
        <InputField
          label="Email"
          name="email"
          defaultValue={data?.email}
          register={register}
          error={errors?.email}
        />
        <InputField
          label="Password"
          name="password"
          type="password"
          defaultValue={data?.password}
          register={register}
          error={errors?.password}
        />
      </div>
      <span className="text-xs text-gray-400 font-medium">
        Personal Information
      </span>
      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="First Name"
          name="firstName"
          defaultValue={data?.firstName}
          register={register}
          error={errors.firstName}
        />
        <InputField
          label="Last Name"
          name="lastName"
          defaultValue={data?.lastName}
          register={register}
          error={errors.lastName}
        />
        <InputField
          label="Phone"
          name="phone"
          defaultValue={data?.phone}
          register={register}
          error={errors.phone}
        />
        <InputField
          label="Address"
          name="address"
          defaultValue={data?.address}
          register={register}
          error={errors.address}
        />
      </div>
      <span className="text-xs text-gray-400 font-medium">
        Administrative Information
      </span>
      <div className="flex justify-between flex-wrap gap-4">
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Department</label>
          <select
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            {...register("departmentCode")}
            defaultValue={data?.department?.code}
          >
            <option value="">Select Department</option>
            {departments.map(dept => (
              <option key={dept.code} value={dept.code}>
                {dept.name} ({dept.code})
              </option>
            ))}
          </select>
          {errors.departmentCode?.message && (
            <p className="text-xs text-red-400">
              {errors.departmentCode.message.toString()}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Admin Role</label>
          <select
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            {...register("role")}
            defaultValue={data?.role || "admin"}
          >
            <option value="admin">Admin</option>
            <option value="mod">Modérateur</option>
          </select>
          {errors.role?.message && (
            <p className="text-xs text-red-400">
              {errors.role.message.toString()}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-2 w-full md:w-1/4 justify-center">
          <label
            className="text-xs text-gray-500 flex items-center gap-2 cursor-pointer"
            htmlFor="img"
          >
            <Image src="/upload.png" alt="" width={28} height={28} />
            <span>Upload a photo</span>
          </label>
          <input type="file" id="img" {...register("img")} className="hidden" />
          {errors.img?.message && (
            <p className="text-xs text-red-400">
              {errors.img.message.toString()}
            </p>
          )}
        </div>
      </div>
      {error && (
        <div className="text-red-500 text-sm">
          {error}
        </div>
      )}
      <button 
        className="bg-blue-400 text-white p-2 rounded-md"
        disabled={isSubmitting}
      >
        {isSubmitting 
          ? "Processing..." 
          : type === "create" 
            ? "Create" 
            : "Update"}
      </button>
    </form>
  );
};

export default AdminForm;