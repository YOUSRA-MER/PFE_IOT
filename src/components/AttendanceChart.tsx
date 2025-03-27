"use client";

import Image from "next/image";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useEffect, useState } from "react";

const data = [
  {
    name: "Mon",
    present: 60,
    absent: 40,
  },
  {
    name: "Tue",
    present: 70,
    absent: 60,
  },
  {
    name: "Wed",
    present: 90,
    absent: 75,
  },
  {
    name: "Thu",
    present: 90,
    absent: 75,
  },
  {
    name: "Fri",
    present: 65,
    absent: 55,
  },
];

const AttendanceChart = () => {
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
      attributes: true, // Listen for attribute changes
    });

    return () => observer.disconnect(); // Cleanup observer
  }, []);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 h-full">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold dark:text-white">Attendance</h1>
        <Image
          src="/moreDark.png"
          alt=""
          width={20}
          height={20}
          className="dark:invert"
        />
      </div>
      <ResponsiveContainer width="100%" height="90%">
        <BarChart width={500} height={300} data={data} barSize={20}>
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke={isDarkMode ? "#374151" : "#ddd"} // Dark mode: gray-700, Light mode: gray-200
            strokeOpacity={isDarkMode ? 0.2 : 1} // Adjust opacity for dark mode
          />
          <XAxis
            dataKey="name"
            axisLine={false}
            tick={{ fill: isDarkMode ? "#f3f4f6" : "#374151" }} // Dark mode: gray-100, Light mode: gray-700
            tickLine={false}
          />
          <YAxis
            axisLine={false}
            tick={{ fill: isDarkMode ? "#f3f4f6" : "#374151" }} // Dark mode: gray-100, Light mode: gray-700
            tickLine={false}
          />
          <Tooltip
            contentStyle={{
              borderRadius: "10px",
              borderColor: isDarkMode ? "#374151" : "lightgray", // Dark mode: gray-700, Light mode: lightgray
              backgroundColor: isDarkMode ? "#1f2937" : "#ffffff", // Dark mode: gray-800, Light mode: white
              color: isDarkMode ? "#f3f4f6" : "#374151", // Dark mode: gray-100, Light mode: gray-700
            }}
          />
          <Legend
            align="left"
            verticalAlign="top"
            wrapperStyle={{
              paddingTop: "20px",
              paddingBottom: "40px",
              color: isDarkMode ? "#f3f4f6" : "#374151", // Dark mode: gray-100, Light mode: gray-700
            }}
          />
          <Bar
            dataKey="present"
            fill="#FAE27C"
            legendType="circle"
            radius={[10, 10, 0, 0]}
          />
          <Bar
            dataKey="absent"
            fill="#C3EBFA"
            legendType="circle"
            radius={[10, 10, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AttendanceChart;