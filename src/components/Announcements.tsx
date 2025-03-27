"use client";
import { useState, useEffect } from "react";

const Announcements = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Listen for dark mode changes
  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "class") {
          const isDark = document.documentElement.classList.contains("dark");
          setIsDarkMode(isDark);
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className={`p-4 rounded-md ${isDarkMode ? "bg-gray-800" : "bg-white"}`}>
      <div className="flex items-center justify-between">
        <h1 className={`text-xl font-semibold ${isDarkMode ? "text-gray-100" : "text-gray-800"}`}>
          Announcements
        </h1>
        <span className={`text-xs ${isDarkMode ? "text-gray-300" : "text-gray-400"}`}>
          View All
        </span>
      </div>
      <div className="flex flex-col gap-4 mt-4">
        {/* Announcement 1 */}
        <div className={`rounded-md p-4 ${isDarkMode ? "bg-gray-700" : "bg-lamaSkyLight"}`}>
          <div className="flex items-center justify-between">
            <h2 className={`font-medium ${isDarkMode ? "text-gray-100" : "text-gray-800"}`}>
              Team Meeting Scheduled for Next Week
            </h2>
            <span className={`text-xs rounded-md px-1 py-1 ${isDarkMode ? "bg-gray-600 text-gray-200" : "bg-white text-gray-400"}`}>
              2025-01-01
            </span>
          </div>
          <p className={`text-sm mt-1 ${isDarkMode ? "text-gray-300" : "text-gray-400"}`}>
            The next team meeting is scheduled for next week, where we will discuss the project updates and deadlines. Please make sure to attend.
          </p>
        </div>

        {/* Announcement 2 */}
        <div className={`rounded-md p-4 ${isDarkMode ? "bg-gray-700" : "bg-lamaPurpleLight"}`}>
          <div className="flex items-center justify-between">
            <h2 className={`font-medium ${isDarkMode ? "text-gray-100" : "text-gray-800"}`}>
              Holiday Notice: Office Closed
            </h2>
            <span className={`text-xs rounded-md px-1 py-1 ${isDarkMode ? "bg-gray-600 text-gray-200" : "bg-white text-gray-400"}`}>
              2025-01-05
            </span>
          </div>
          <p className={`text-sm mt-1 ${isDarkMode ? "text-gray-300" : "text-gray-400"}`}>
            The office will be closed from January 5th to 7th in observance of the national holiday. All operations will resume on January 8th.
          </p>
        </div>

        {/* Announcement 3 */}
        <div className={`rounded-md p-4 ${isDarkMode ? "bg-gray-700" : "bg-lamaYellowLight"}`}>
          <div className="flex items-center justify-between">
            <h2 className={`font-medium ${isDarkMode ? "text-gray-100" : "text-gray-800"}`}>
              New Policies Update
            </h2>
            <span className={`text-xs rounded-md px-1 py-1 ${isDarkMode ? "bg-gray-600 text-gray-200" : "bg-white text-gray-400"}`}>
              2025-01-10
            </span>
          </div>
          <p className={`text-sm mt-1 ${isDarkMode ? "text-gray-300" : "text-gray-400"}`}>
            We have updated the company policies regarding remote work and work-life balance. Please review the new policies in your email.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Announcements;