"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useState } from "react";

// Define proper FormProps interface
interface FormProps {
  type: "create" | "update";
  data?: any;
  onClose: () => void;
}

// USE LAZY LOADING
const AdminForm = dynamic(() => import("./forms/AdminForm"), {
  loading: () => <h1>Loading...</h1>,
});
const UserForm = dynamic(() => import("./forms/UserForm"), {
  loading: () => <h1>Loading...</h1>,
});
const ManagerForm = dynamic(() => import("./forms/ManagerForm"), {
  loading: () => <h1>Loading...</h1>,
});

// Define table types
type TableType = 
  | "admin"
  | "administrateur"
  | "user"
  | "manager"
  | "subject"
  | "class"
  | "lesson"
  | "exam"
  | "assignment"
  | "result"
  | "attendance"
  | "event"
  | "announcement";

type ModalType = "create" | "update" | "delete";

interface FormModalProps {
  table: TableType;
  type: ModalType;
  data?: any;
  id?: number;
}

const FormModal = ({ table, type, data, id }: FormModalProps) => {
  const size = type === "create" ? "w-8 h-8" : "w-7 h-7";
  const bgColor =
    type === "create"
      ? "bg-lamaYellow"
      : type === "update"
      ? "bg-lamaSky"
      : "bg-lamaPurple";

  const [open, setOpen] = useState(false);
  
  const handleClose = () => {
    setOpen(false);
  };

  const Form = () => {
    if (type === "delete" && id) {
      const entityName = getEntityDisplayName(table);
      return (
        <form className="p-4 flex flex-col gap-4">
          <span className="text-center font-medium">
            All data will be lost. Are you sure you want to delete this {entityName}?
          </span>
          <button 
            type="button"
            className="bg-red-700 text-white py-2 px-4 rounded-md border-none w-max self-center"
            onClick={handleClose}
          >
            Delete
          </button>
        </form>
      );
    } else if (type === "create" || type === "update") {
      // Handle the form components directly instead of through a mapping
      if (table === "admin" || table === "administrateur") {
        return <AdminForm type={type} data={data} onClose={handleClose} />;
      } else if (table === "user") {
        return <UserForm type={type} data={data} onClose={handleClose} />;
      } else if (table === "manager") {
        return <ManagerForm type={type} data={data} onClose={handleClose} />;
      } else {
        return <div>Form not found for {table}!</div>;
      }
    } else {
      return <div>Form not found for {table}!</div>;
    }
  };

  // Helper function to get user-friendly entity names
  const getEntityDisplayName = (table: string) => {
    const displayNames: { [key: string]: string } = {
      admin: "administrator",
      administrateur: "administrateur",
      user: "collaborator",
      manager: "manager",
      subject: "subject",
      class: "class",
      lesson: "lesson",
      exam: "exam",
      assignment: "assignment",
      result: "result",
      attendance: "attendance",
      event: "event",
      announcement: "announcement"
    };
      
    return displayNames[table] || table;
  };

  return (
    <>
      <button
        className={`${size} flex items-center justify-center rounded-full ${bgColor}`}
        onClick={() => setOpen(true)}
      >
        <Image src={`/${type}.png`} alt="" width={16} height={16} />
      </button>
      {open && (
        <div className="w-screen h-screen fixed left-0 top-0 bg-black bg-opacity-60 z-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-md relative w-[90%] md:w-[70%] lg:w-[60%] xl:w-[50%] 2xl:w-[40%]">
            <Form />
            <div
              className="absolute top-4 right-4 cursor-pointer"
              onClick={handleClose}
            >
              <Image src="/close.png" alt="" width={14} height={14} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FormModal;