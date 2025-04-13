"use client";
import Link from "next/link";
import {
  Home, UserCog, Users, Briefcase, Building,
  QrCode, Calendar, LogOut, User, ClipboardList
} from "lucide-react";
import { UserRole, MenuSection } from "@/lib/types";
import { apiService } from "@/services/api";

interface MenuProps {
  role: UserRole;
}

const menuItems = (role: UserRole): MenuSection[] => [
  {
    title: "MENU PRINCIPAL",
    items: [
      {
        icon: <Home className="h-5 w-5" />,
        label: "Tableau de Bord",
        href: role === "ROLE_ADMIN" ? "/admin" :
               role === "ROLE_MODERATOR" ? "/manager" : "/user",
        visible: true,
      },
      {
        icon: <UserCog className="h-5 w-5" />,
        label: "Administrateurs",
        href: "/list/administrateurs",
        visible: role === "ROLE_ADMIN",
      },
      {
        icon: <Briefcase className="h-5 w-5" />,
        label: "Managers",
        href: "/list/managers",
        visible: role === "ROLE_ADMIN",
      },
      {
        icon: <Users className="h-5 w-5" />,
        label: "Collaborateurs",
        href: "/list/users",
        visible: role === "ROLE_ADMIN" || role === "ROLE_MODERATOR",
      },
      {
        icon: <Building className="h-5 w-5" />,
        label: "Départements",
        href: "/list/departments",
        visible: role === "ROLE_ADMIN",
      },
      {
        icon: <QrCode className="h-5 w-5" />,
        label: "Pointeuses",
        href: "/list/pointeuses",
        visible: role === "ROLE_ADMIN",
      },
      {
        icon: <Calendar className="h-5 w-5" />,
        label: "Pointages",
        href: "/list/pointage",
        visible: role === "ROLE_ADMIN" || role === "ROLE_MODERATOR",
      },
      {
        icon: <LogOut className="h-5 w-5" />,
        label: "Déconnexion",
        href: "/login",
        visible: true,
        onClick: () => {
          apiService.logout();
        },
      }
    ],
  },
];

const Menu = ({ role }: MenuProps) => {
  return (
    <div className="mt-4 text-sm">
      {menuItems(role).map((section) => (
        <div className="flex flex-col gap-2" key={section.title}>
          <span className="hidden lg:block text-gray-400 font-light my-4">
            {section.title}
          </span>
          {section.items
            .filter(item => item.visible)
            .map((item) => {
              // Create a client component NavLink for logout
              if (item.onClick) {
                return (
                  <button
                    key={item.label}
                    className="flex items-center justify-center lg:justify-start gap-4 text-gray-500 py-2 hover:text-gray-700 dark:hover:text-gray-300"
                    onClick={item.onClick}
                  >
                    {item.icon}
                    <span className="hidden lg:block">{item.label}</span>
                  </button>
                );
              }
              
              // Regular links
              return (
                <Link
                  href={item.href}
                  key={item.label}
                  className="flex items-center justify-center lg:justify-start gap-4 text-gray-500 py-2 hover:text-gray-700 dark:hover:text-gray-300"
                >
                  {item.icon}
                  <span className="hidden lg:block">{item.label}</span>
                </Link>
              );
            })}
        </div>
      ))}
    </div>
  );
};

export default Menu;