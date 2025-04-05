"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import TeamAttendance from "@/components/TeamAttendance";
import SubordinateList from "@/components/SubordinateList";
import ManagerStats from "@/components/ManagerStats";
import { apiService } from "@/services/api";

const ManagerPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  
  useEffect(() => {
    const checkAuth = () => {
      if (!apiService.isAuthenticated()) {
        router.push("/login");
        return;
      }
      
      const roles = apiService.getUserRoles();
      if (!roles.includes('ROLE_MODERATOR')) {
        router.push("/");
        return;
      }
      
      setAuthorized(true);
      setLoading(false);
    };
    
    checkAuth();
  }, [router]);
  
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }
  
  if (!authorized) {
    return null;
  }

  return (
    <div className="p-4 flex gap-4 flex-col">
      <h1 className="text-2xl font-bold">Tableau de Bord Manager</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <TeamAttendance />
        </div>
        <div className="lg:col-span-1">
          <ManagerStats />
        </div>
      </div>
      
      <div className="mt-4">
        <SubordinateList />
      </div>
    </div>
  );
};

export default ManagerPage;