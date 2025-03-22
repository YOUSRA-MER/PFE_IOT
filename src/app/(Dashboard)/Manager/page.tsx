"use client";

import Announcements from "@/components/Announcements";
import BigCalendar from "@/components/BigCalender";
import EventCalendar from "@/components/EventCalendar";
import { useState, useEffect } from "react";

// Define proper type for Manager data
interface Department {
  code: string;
  name: string;
}

interface Subordinate {
  matricule: string;
  username: string;
  firstName: string;
  lastName: string;
}

interface Manager {
  matricule: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  department: Department;
  subordinates: Subordinate[];
}

const ManagerPage = () => {
  const [managerData, setManagerData] = useState<Manager | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch manager data based on authentication
  useEffect(() => {
    // This would be replaced with actual API call using the JWT token
    // Example: fetchManagerProfile(token)
    const fetchData = async () => {
      try {
        // Mock manager data - in production this would come from API
        const mockManagerData: Manager = {
          matricule: "D6M3N093",
          username: "fouad.madani",
          firstName: "Fouad",
          lastName: "Madani",
          email: "fouad.madani@gmail.com",
          phone: "0600000001",
          department: {
            code: "D001",
            name: "FIN"
          },
          subordinates: [
            {
              matricule: "JFKXCS90",
              username: "sanae.omari",
              firstName: "Sanae",
              lastName: "Omari"
            },
            // Plus de subordonnés seraient ajoutés ici
          ]
        };
        
        setManagerData(mockManagerData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching manager data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-4 flex gap-4 flex-col xl:flex-row">
      {/* LEFT */}
      <div className="w-full xl:w-2/3">
        <div className="h-full bg-white p-4 rounded-md">
          <h1 className="text-xl font-semibold">Manager Dashboard</h1>
          {loading ? (
            <p>Loading manager data...</p>
          ) : (
            <>
              <div className="mb-4 p-4 bg-gray-50 rounded-md">
                <h2 className="text-lg font-medium mb-2">Manager Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Manager ID</p>
                    <p className="font-medium">{managerData?.matricule}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Name</p>
                    <p className="font-medium">{managerData?.firstName} {managerData?.lastName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Department</p>
                    <p className="font-medium">{managerData?.department?.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium">{managerData?.email}</p>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <h2 className="text-lg font-medium mb-2">Team Members</h2>
                <div className="bg-white border rounded-md">
                  {managerData?.subordinates.map((subordinate) => (
                    <div key={subordinate.matricule} className="p-3 border-b last:border-b-0 hover:bg-gray-50">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">{subordinate.firstName} {subordinate.lastName}</p>
                          <p className="text-sm text-gray-500">{subordinate.matricule}</p>
                        </div>
                        <button className="bg-blue-400 text-white px-3 py-1 rounded-md text-sm">
                          View Attendance
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {managerData && <BigCalendar userId={managerData.matricule} />}
            </>
          )}
        </div>
      </div>
      {/* RIGHT */}
      <div className="w-full xl:w-1/3 flex flex-col gap-8">
        <div className="bg-white p-4 rounded-md">
          <h2 className="text-lg font-medium mb-4">Team Attendance Summary</h2>
          {loading ? (
            <p>Loading attendance data...</p>
          ) : (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Present Today</span>
                <span className="text-sm font-medium">{managerData?.subordinates.length || 0} / {managerData?.subordinates.length || 0}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Average Hours This Week</span>
                <span className="text-sm font-medium">39h 15m</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Late Arrivals This Month</span>
                <span className="text-sm font-medium">2</span>
              </div>
              <button className="w-full mt-2 bg-blue-400 text-white p-2 rounded-md">
                View Team Report
              </button>
            </div>
          )}
        </div>
        <EventCalendar />
        <Announcements />
      </div>
    </div>
  );
};

export default ManagerPage;