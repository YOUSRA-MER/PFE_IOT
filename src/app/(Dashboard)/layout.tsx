"use client";
import Menu from "@/components/Menu";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { apiService } from "@/services/api";
import { UserRole } from "@/lib/types";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const [role, setRole] = useState<UserRole>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is authenticated
    if (!apiService.isAuthenticated()) {
      router.push("/login");
      return;
    }

    // Get user roles
    const roles = apiService.getUserRoles();
    if (roles && roles.length > 0) {
      setRole(roles[0]);
    } else {
      // If no role is found, redirect to login
      router.push("/login");
      return;
    }

    setLoading(false);
  }, [router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="h-screen flex">
      {/* LEFT SIDEBAR */}
      <div className="w-[14%] md:w-[8%] lg:w-[16%] xl:w-[14%] p-4 bg-lamaSkyLight dark:bg-gray-800">
        <Link
          href="/"
          className="flex items-center justify-center lg:justify-start gap-2"
        >
          <span className="hidden lg:block font-bold text-black dark:text-white">
            System de Gestion de Pointage
          </span>
        </Link>
        <Menu role={role} />
      </div>
      
      {/* RIGHT CONTENT */}
      <div className="w-[86%] md:w-[92%] lg:w-[84%] xl:w-[86%] bg-[#F7F8FA] dark:bg-gray-900 overflow-scroll flex flex-col">
        {/* Navbar */}
        <Navbar />
        
        {/* MAIN CONTENT */}
        <div className="flex-1 p-4">{children}</div>
      </div>
    </div>
  );
}