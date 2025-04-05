import Image from "next/image";
import ThemeToggle from "@/components/ThemeToggle";
import { MessageCircle, Bell } from "lucide-react";
import { NavbarProps } from "@/lib/types";

const Navbar = ({ role, userName = "Yousra&Marwa", userRoleLabel = "Admin" }: NavbarProps) => {
  return (
    <div className="flex items-center justify-between p-4">
      {/* Search bar */}
      <div className="hidden md:flex items-center gap-2 text-xs rounded-full ring-[1.5px] ring-gray-300 px-2 dark:ring-gray-600">
        <Image src="/search.png" alt="" width={14} height={14} className="dark:invert" />
        <input
          type="text"
          placeholder="Search..."
          className="w-[200px] p-2 bg-transparent outline-none dark:text-white"
        />
      </div>

      {/* Icons and profile */}
      <div className="flex items-center gap-6 justify-end w-full">
        {/* Messages */}
        <div className="bg-white rounded-full w-7 h-7 flex items-center justify-center cursor-pointer hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700">
          <MessageCircle className="w-4 h-4 text-gray-700 dark:text-gray-300" />
        </div>

        {/* Announcements */}
        <div className="bg-white rounded-full w-7 h-7 flex items-center justify-center cursor-pointer relative hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700">
          <Bell className="w-4 h-4 text-gray-700 dark:text-gray-300" />
          <div className="absolute -top-3 -right-3 w-5 h-5 flex items-center justify-center bg-purple-500 text-white rounded-full text-xs">
            1
          </div>
        </div>

        {/* Dark Mode Toggle */}
        <ThemeToggle />

        {/* Profile */}
        <div className="flex items-center gap-2">
          <div className="flex flex-col text-right">
            <span className="text-xs leading-3 font-medium dark:text-white">{userName}</span>
            <span className="text-[10px] text-gray-500 dark:text-gray-400">
              {role === "ROLE_ADMIN" ? "Admin" : 
               role === "ROLE_MODERATOR" ? "Manager" : "Collaborateur"}
            </span>
          </div>
          <Image
            src="/avatar.png"
            alt=""
            width={36}
            height={36}
            className="rounded-full"
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;