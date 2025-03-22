"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "../InputField";
import Image from "next/image";
import { useState } from "react";

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
  department: z
    .string()
    .min(1, { message: "Department is required!" }),
  img: z
    .instanceof(File)
    .optional(),
});

type Inputs = z.infer<typeof schema>;

const ManagerForm = ({
  type,
  data,
  onClose,
}: {
  type: "create" | "update";
  data?: any;
  onClose?: () => void;
}) => {
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
      department: data?.department?.code || "",
    }
  });

  const onSubmit = handleSubmit(async (formData) => {
    setIsSubmitting(true);
    setSubmitError("");
    setSubmitSuccess("");
    
    try {
      // Transform the data to match the backend structure from your API docs
      const backendData = {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        role: ["mod"], // "mod" is the role for moderator/manager as per API docs
        departmentDTO: {
          code: formData.department
        }
      };
      
      console.log("Backend formatted data:", backendData);
      
      // Make the API call to your backend
      const response = await fetch('http://localhost:8085/api/auth/signup', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'profile-secret': 'pol' // As required in your API documentation
        },
        body: JSON.stringify(backendData)
      });
      
      const responseData = await response.json();
      
      if (!response.ok) {
        throw new Error(responseData.message || 'Failed to create manager');
      }
      
      // Success
      setSubmitSuccess(`Manager created successfully with matricule: ${responseData.message.split(':')[1]}`);
      
      // Close the modal after a short delay
      setTimeout(() => {
        if (onClose) onClose();
      }, 2000);
      
    } catch (error: any) {
      console.error("Error submitting form:", error);
      setSubmitError(error.message || "Failed to submit the form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  });

  return (
    <form className="flex flex-col gap-6" onSubmit={onSubmit}>
      <span className="text-xs text-gray-400 font-medium">
        Authentication Information
      </span>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
        Department Information
      </span>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-xs text-gray-500">Department</label>
          <select
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            {...register("department")}
            defaultValue={data?.department?.code}
          >
            <option value="">Select Department</option>
            <option value="D001">FIN</option>
            <option value="D002">IT</option>
            <option value="D003">HR</option>
            <option value="D004">Sales</option>
            <option value="D005">Marketing</option>
          </select>
          {errors.department?.message && (
            <p className="text-xs text-red-400">
              {errors.department.message.toString()}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-2 justify-center">
          <label
            className="text-xs text-gray-500 flex items-center gap-2 cursor-pointer"
            htmlFor="img"
          >
            <span className="bg-gray-100 p-2 rounded">
              Upload a photo
            </span>
          </label>
          <input type="file" id="img" {...register("img")} className="hidden" />
          {errors.img?.message && (
            <p className="text-xs text-red-400">
              {errors.img.message.toString()}
            </p>
          )}
        </div>
      </div>
      
      {submitError && (
        <div className="text-red-500 bg-red-50 p-2 rounded">
          {submitError}
        </div>
      )}
      
      {submitSuccess && (
        <div className="text-green-500 bg-green-50 p-2 rounded">
          {submitSuccess}
        </div>
      )}
      
      <div className="flex justify-end gap-2 mt-4">
        <button 
          type="button" 
          onClick={onClose}
          className="border border-gray-300 text-gray-700 p-2 rounded-md"
        >
          Cancel
        </button>
        <button 
          type="submit" 
          className="bg-blue-500 text-white p-2 rounded-md" 
          disabled={isSubmitting}
        >
          {isSubmitting ? "Processing..." : type === "create" ? "Create Manager" : "Update Manager"}
        </button>
      </div>
    </form>
  );
};

export default ManagerForm;