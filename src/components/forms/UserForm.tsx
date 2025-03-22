"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "../InputField";
import Image from "next/image";

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
  matricule: z
    .string()
    .min(1, { message: "User ID is required!" }),
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
  manager: z
    .string()
    .min(1, { message: "Manager ID is required!" }),
  img: z
    .instanceof(File)
    .optional(),
});

type Inputs = z.infer<typeof schema>;

// Define props interface for the component
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

const UserForm = ({ type, data, managers = [] }: UserFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  });

  const onSubmit = handleSubmit((data) => {
    console.log("Submitted user data:", data);
    
    // Transform the data to match the backend structure
    const backendData = {
      username: data.username,
      email: data.email,
      password: data.password,
      matricule: data.matricule,
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
      address: data.address,
      departmentDTO: {
        code: data.department
      },
      manager: data.manager, // Manager matricule as per API docs
      roles: [{ name: "user" }], // "user" is the role for regular collaborator as per API docs
    };
    
    console.log("Backend formatted data:", backendData);
  });

  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">
        {type === "create" ? "Create a new" : "Update"} collaborator
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
        <InputField
          label="User ID"
          name="matricule"
          defaultValue={data?.matricule}
          register={register}
          error={errors?.matricule}
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
        Organizational Information
      </span>
      <div className="flex justify-between flex-wrap gap-4">
        <div className="flex flex-col gap-2 w-full md:w-1/3">
          <label className="text-xs text-gray-500">Department</label>
          <select
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            {...register("department")}
            defaultValue={data?.departmentDTO?.code}
          >
            <option value="">Select Department</option>
            <option value="D001">FIN</option>
            <option value="D002">IT</option>
            {/* Add more departments as needed */}
          </select>
          {errors.department?.message && (
            <p className="text-xs text-red-400">
              {errors.department.message.toString()}
            </p>
          )}
        </div>
        
        <div className="flex flex-col gap-2 w-full md:w-1/3">
          <label className="text-xs text-gray-500">Manager</label>
          <select
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            {...register("manager")}
            defaultValue={data?.manager}
          >
            <option value="">Select Manager</option>
            {managers.length > 0 ? (
              managers.map((manager) => (
                <option key={manager.matricule} value={manager.matricule}>
                  {manager.firstName} {manager.lastName} ({manager.matricule})
                </option>
              ))
            ) : (
              <>
                <option value="D6M3N093">Fouad Madani (D6M3N093)</option>
                {/* Add more sample managers if needed */}
              </>
            )}
          </select>
          {errors.manager?.message && (
            <p className="text-xs text-red-400">
              {errors.manager.message.toString()}
            </p>
          )}
        </div>
        
        <div className="flex flex-col gap-2 w-full md:w-1/3 justify-center">
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
      {Object.keys(errors).length > 0 && (
        <div className="text-red-500">
          {Object.values(errors).map((error) => (
            <p key={error.message}>{error.message}</p>
          ))}
        </div>
      )}
      <button className="bg-blue-400 text-white p-2 rounded-md">
        {type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
};

export default UserForm;