"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Announcements from "@/components/Announcements";
import AttendanceChart from "@/components/AttendanceChart";
import CountChart from "@/components/CountChart";
import EventCalendar from "@/components/EventCalendar";
import UserCard from "@/components/UserCard";
import { apiService } from "@/services/api";

const AdminPage = () => {
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
      if (!roles.includes('ROLE_ADMIN')) {
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
    <div className="p-4 flex gap-4 flex-col md:flex-row">
      <div className="w-full lg:w-2/3 flex flex-col gap-8">
        <div className="flex gap-4 justify-between flex-wrap">
          <UserCard type="Administrateur" />
          <UserCard type="Manager" />
          <UserCard type="User" />
        </div>
        <div className="flex gap-4 flex-col lg:flex-row">
          <div className="w-full lg:w-1/3 h-[450px]">
            <CountChart />
          </div>
          <div className="w-full lg:w-2/3 h-[450px]">
            <AttendanceChart />
          </div>
        </div>
      </div>
      <div className="w-full lg:w-1/3 flex flex-col gap-8">
        <EventCalendar />
        <Announcements />
      </div>
    </div>
  );
};

export default AdminPage;