"use client";

import Announcements from "@/components/Announcements";
import BigCalendar from "@/components/BigCalender";
import EventCalendar from "@/components/EventCalendar";
import { useState, useEffect } from "react";

// Define proper type for User data
interface Department {
  code: string;
  name: string;
}

interface User {
  matricule: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  department: Department;
  manager: string;
  managerName: string;
}

const UserPage = () => {
  const [userData, setUserData] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch user data based on authentication
  useEffect(() => {
    // This would be replaced with actual API call using the JWT token
    // Example: fetchUserProfile(token)
    const fetchData = async () => {
      try {
        // Mock user data - in production this would come from API
        const mockUserData: User = {
          matricule: "JFKXCS90",
          username: "sanae.omari",
          firstName: "Sanae",
          lastName: "Omari",
          email: "sanae.omari@gmail.com",
          phone: "0600000000",
          department: {
            code: "D001",
            name: "FIN"
          },
          manager: "D6M3N093", // Manager matricule
          managerName: "Fouad Madani" // Would be fetched in a real app
        };
        
        setUserData(mockUserData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
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
          <h1 className="text-xl font-semibold">My Schedule</h1>
          {loading ? (
            <p>Loading schedule...</p>
          ) : (
            <>
              <div className="mb-4 p-4 bg-gray-50 rounded-md">
                <h2 className="text-lg font-medium mb-2">Personal Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Employee ID</p>
                    <p className="font-medium">{userData?.matricule}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Name</p>
                    <p className="font-medium">{userData?.firstName} {userData?.lastName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Department</p>
                    <p className="font-medium">{userData?.department?.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Manager</p>
                    <p className="font-medium">{userData?.managerName}</p>
                  </div>
                </div>
              </div>
              {userData && <BigCalendar userId={userData.matricule} />}
            </>
          )}
        </div>
      </div>
      {/* RIGHT */}
      <div className="w-full xl:w-1/3 flex flex-col gap-8">
        <div className="bg-white p-4 rounded-md">
          <h2 className="text-lg font-medium mb-4">Time Tracking Summary</h2>
          {loading ? (
            <p>Loading time tracking data...</p>
          ) : (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Today</span>
                <span className="text-sm font-medium">8h 15m</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">This Week</span>
                <span className="text-sm font-medium">32h 45m</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">This Month</span>
                <span className="text-sm font-medium">142h 30m</span>
              </div>
              <button className="w-full mt-2 bg-blue-400 text-white p-2 rounded-md">
                View Detailed Report
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

export default UserPage;