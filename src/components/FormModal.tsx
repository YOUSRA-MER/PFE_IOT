"use client";

import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { X, Plus, Pencil, Trash2 } from "lucide-react";

// Define proper interfaces
interface FormProps {
  type: "create" | "update";
  data?: any;
  onClose: () => void;
}

interface PointeuseFormProps {
  pointeuse: any | null;
  onSubmitSuccess: () => void;
  onCancel: () => void;
  type: "create" | "update";
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
const PointeuseForm = dynamic(() => import("./forms/PointeuseForm"), {
  loading: () => <h1>Loading...</h1>,
});
const DepartmentForm = dynamic(() => import("./forms/DepartmentForm"), {
  loading: () => <h1>Loading...</h1>,
});
const PointageForm = dynamic(() => import("./forms/PointageForm"), {
  loading: () => <h1>Loading...</h1>,
});

// Define table types
type TableType =
  | "admin"
  | "administrateur"
  | "user"
  | "manager"
  | "pointeuse"
  | "pointage"
  | "department";

type ModalType = "create" | "update" | "delete";

interface FormModalProps {
  table: TableType;
  type: ModalType;
  data?: any;
  id?: number;
  onClose?: () => void;
  onSubmit?: () => void;
  icon?: React.ReactNode;
}

const FormModal = ({ table, type, data, id, onClose, onSubmit, icon }: FormModalProps) => {
  const size = type === "create" ? "w-8 h-8" : "w-7 h-7";
  const bgColor =
    type === "create"
      ? "bg-lamaYellow hover:bg-lamaYellow/90 dark:bg-yellow-600 dark:hover:bg-yellow-700"
      : type === "update"
      ? "bg-lamaSky hover:bg-lamaSky/90 dark:bg-blue-600 dark:hover:bg-blue-700"
      : "bg-lamaPurple hover:bg-lamaPurple/90 dark:bg-purple-600 dark:hover:bg-purple-700";

  const [open, setOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (open || onClose) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 10);
      
      const handleEsc = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          handleClose();
        }
      };
      
      window.addEventListener('keydown', handleEsc);
      
      return () => {
        clearTimeout(timer);
        window.removeEventListener('keydown', handleEsc);
      };
    }
  }, [open, onClose]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      setOpen(false);
      if (onClose) onClose();
    }, 300);
  };

  const Form = () => {
    if (type === "delete" && id) {
      const entityName = getEntityDisplayName(table);
      return (
        <form className="p-4 flex flex-col gap-4">
          <span className="text-center font-medium dark:text-white">
            All data will be lost. Are you sure you want to delete this {entityName}?
          </span>
          <button
            type="button"
            className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md border-none w-max self-center transition-colors"
            onClick={handleClose}
          >
            Delete
          </button>
        </form>
      );
    } else if (type === "create" || type === "update") {
      switch (table) {
        case "admin":
        case "administrateur":
          return <AdminForm type={type} data={data} onClose={handleClose} />;
        case "user":
          return <UserForm type={type} data={data} onClose={handleClose} />;
        case "manager":
          return <ManagerForm type={type} data={data} onClose={handleClose} />;
        case "pointeuse":
          return (
            <PointeuseForm
              pointeuse={type === "update" ? data : null}
              onSubmitSuccess={onSubmit || handleClose}
              onCancel={handleClose}
              type={type}
            />
          );
        case "department":
          return (
            <DepartmentForm
              department={type === "update" ? data : null}
              onSubmitSuccess={onSubmit || handleClose}
              onCancel={handleClose}
              type={type}
            />
          );
        case "pointage":
          return (
            <PointageForm
              pointage={type === "update" ? data : null}
              onSubmitSuccess={onSubmit || handleClose}
              onCancel={handleClose}
              type={type}
            />
          );
        default:
          return <div className="dark:text-white">Form not found for {table}!</div>;
      }
    }
    return <div className="dark:text-white">Form not found for {table}!</div>;
  };

  const getEntityDisplayName = (table: string) => {
    const displayNames: { [key: string]: string } = {
      admin: "administrator",
      administrateur: "administrateur",
      user: "collaborator",
      manager: "manager",
      pointeuse: "pointeuse",
      department: "department",
      pointage: "pointage"
    };
    return displayNames[table] || table;
  };

  return (
    <>
      {!onClose && (
        <button
          className={`${size} flex items-center justify-center rounded-full ${bgColor} transition-colors`}
          onClick={() => setOpen(true)}
        >
          {icon || (
            <span className="text-white dark:text-white">
              {type === "create" ? <Plus className="w-4 h-4" /> : 
               type === "update" ? <Pencil className="w-4 h-4" /> : 
               <Trash2 className="w-4 h-4" />}
            </span>
          )}
        </button>
      )}
      {(open || onClose) && (
        <div 
          className={`fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 transition-opacity duration-300 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={handleClose}
        >
          <div 
            className={`bg-white dark:bg-gray-800 rounded-lg shadow-xl relative w-[90%] md:w-[70%] lg:w-[60%] xl:w-[50%] 2xl:w-[40%] transition-transform duration-300 ${
              isVisible ? 'translate-y-0' : 'translate-y-8'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center p-4 border-b dark:border-gray-700">
              <h2 className="text-lg font-medium text-gray-800 dark:text-white">
                {type === "create" ? "Ajouter" : type === "update" ? "Modifier" : "Supprimer"} {getEntityDisplayName(table)}
              </h2>
              <button
                onClick={handleClose}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="p-4">
              <Form />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FormModal;