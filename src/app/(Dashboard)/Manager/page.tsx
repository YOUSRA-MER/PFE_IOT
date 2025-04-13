"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import TeamAttendance from "@/components/TeamAttendance";
import SubordinateList from "@/components/SubordinateList";
import ManagerStats from "@/components/ManagerStats";
import { apiService } from "@/services/api";
import { Clock, Users, ChevronDown, Menu, Bell, UserCircle } from "lucide-react";

const ManagerPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
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
      <div className="flex items-center justify-center h-screen bg-lamaSkyLight dark:bg-gray-900">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-lamaPurple dark:border-lamaPurpleDark"></div>
      </div>
    );
  }
  
  if (!authorized) {
    return null;
  }

  return (
    <div className="min-h-screen bg-lamaSkyLight dark:bg-gray-900">
      {/* Top Navigation */}
      <nav className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-3">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <div className="w-8 h-8 rounded-lg bg-lamaSky dark:bg-lamaSkyDark flex items-center justify-center shadow-sm mr-2">
                  <Clock className="w-5 h-5 text-gray-700 dark:text-white" />
                </div>
                <span className="text-base font-bold text-gray-800 dark:text-white">TimeTrack</span>
              </div>
              <div className="hidden md:block ml-8">
                <div className="flex items-center space-x-4">
                  <a href="#" className="bg-lamaSky dark:bg-lamaSkyDark bg-opacity-20 dark:bg-opacity-30 px-3 py-1.5 rounded-md text-xs font-medium text-gray-700 dark:text-white">Tableau de bord</a>
                  <a href="#" className="px-3 py-1.5 rounded-md text-xs font-medium text-gray-600 dark:text-gray-300 hover:bg-lamaSky hover:bg-opacity-10 dark:hover:bg-gray-700">Équipe</a>
                  <a href="#" className="px-3 py-1.5 rounded-md text-xs font-medium text-gray-600 dark:text-gray-300 hover:bg-lamaSky hover:bg-opacity-10 dark:hover:bg-gray-700">Rapports</a>
                </div>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="flex items-center space-x-3">
                <button className="p-1 rounded-full text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white focus:outline-none">
                  <Bell className="h-4 w-4" />
                </button>
                <div className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-lamaPurple bg-opacity-30 dark:bg-opacity-50 flex items-center justify-center">
                    <UserCircle className="w-4 h-4 text-lamaPurple dark:text-lamaPurpleLight" />
                  </div>
                  <span className="ml-2 text-xs font-medium text-gray-700 dark:text-white">Manager</span>
                  <ChevronDown className="ml-1 h-3 w-3 text-gray-500 dark:text-gray-300" />
                </div>
              </div>
            </div>
            <div className="md:hidden">
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-1 rounded-md text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
              >
                <Menu className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white dark:bg-gray-800">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <a href="#" className="bg-lamaSky dark:bg-lamaSkyDark bg-opacity-20 dark:bg-opacity-30 block px-3 py-1.5 rounded-md text-xs font-medium text-gray-700 dark:text-white">Tableau de bord</a>
              <a href="#" className="block px-3 py-1.5 rounded-md text-xs font-medium text-gray-600 dark:text-gray-300 hover:bg-lamaSky hover:bg-opacity-10 dark:hover:bg-gray-700">Équipe</a>
              <a href="#" className="block px-3 py-1.5 rounded-md text-xs font-medium text-gray-600 dark:text-gray-300 hover:bg-lamaSky hover:bg-opacity-10 dark:hover:bg-gray-700">Rapports</a>
            </div>
          </div>
        )}
      </nav>

      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-5 py-4">
        <div className="mb-4">
          <div className="flex items-center space-x-3 mb-2">
            <div className="flex items-center justify-center w-7 h-7 rounded-md bg-lamaPurple bg-opacity-20 dark:bg-opacity-40">
              <Users className="h-4 w-4 text-lamaPurple dark:text-lamaPurpleLight" />
            </div>
            <h1 className="text-lg font-bold text-gray-800 dark:text-white">Tableau de Bord Manager</h1>
          </div>
          <p className="text-xs text-gray-600 dark:text-gray-400">Bienvenue sur votre tableau de bord. Gérez votre équipe et suivez leur présence.</p>
        </div>
        
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
    </div>
  );
};

export default ManagerPage;