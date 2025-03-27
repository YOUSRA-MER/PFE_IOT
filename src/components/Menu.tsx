import Link from "next/link";
import { 
  Home, 
  UserCog, 
  Users,  
  Briefcase, 
  Building,  // For departments
  QrCode,    // For badge readers
  Calendar,  // For time tracking
  LogOut,     // For authentication
} from "lucide-react";

const menuItems = [
  {
    title: "MENU PRINCIPAL",
    items: [
      {
        icon: <Home className="h-5 w-5" />,
        label: "Tableau de Bord",
        href: "/admin",
        visible: ["admin", "mod"],
      },
      {
        icon: <UserCog className="h-5 w-5" />,
        label: "Administrateurs",
        href: "/list/administrateurs",
        visible: ["admin"],
      },
      {
        icon: <Briefcase className="h-5 w-5" />,
        label: "Managers",
        href: "/list/managers",
        visible: ["admin"],
      },
      {
        icon: <Users className="h-5 w-5" />,
        label: "Collaborateurs",
        href: "/list/users",
        visible: ["admin", "mod"],
      },
      {
        icon: <Building className="h-5 w-5" />,
        label: "Départements",
        href: "/list/departments",
        visible: ["admin"],
      },
      {
        icon: <QrCode className="h-5 w-5" />,
        label: "Pointeuses",
        href: "/list/pointeuses",
        visible: ["admin"],
      },
      {
        icon: <Calendar className="h-5 w-5" />,
        label: "Pointages",
        href: "/list/pointage",
        visible: ["admin", "mod"],
      },
      {
        icon: <LogOut className="h-5 w-5" />,
        label: "Déconnexion",
        href: "#",
        visible: ["admin", "mod", "user"],
        onClick: () => {
          localStorage.removeItem("token"); // Supprimez le token
          window.location.href = "/auth/login"; // Redirigez
        },
      }
    ],
  },
];

const Menu = () => {
  return (
    <div className="mt-4 text-sm">
      {menuItems.map((section) => (
        <div className="flex flex-col gap-2" key={section.title}>
          <span className="hidden lg:block text-gray-400 font-light my-4">
            {section.title}
          </span>
          {section.items.map((item) => (
            <Link
              href={item.href}
              key={item.label}
              className="flex items-center justify-center lg:justify-start gap-4 text-gray-500 py-2 hover:text-gray-700 dark:hover:text-gray-300"
            >
              {item.icon}
              <span className="hidden lg:block">{item.label}</span>
            </Link>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Menu;