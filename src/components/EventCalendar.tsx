"use client";

import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "moment/locale/fr"; // Importez la locale française si vous souhaitez utiliser le français

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const EventCalendar = () => {
  const [value, onChange] = useState<Value>(new Date());
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

  // Apply dark mode styles to the calendar
  useEffect(() => {
    const calendarWrapper = document.querySelector(".react-calendar") as HTMLElement;
    if (calendarWrapper) {
      if (isDarkMode) {
        // Dark mode styles
        calendarWrapper.classList.add("dark");
        calendarWrapper.style.backgroundColor = "#1f2937"; // bg-gray-800
        calendarWrapper.style.color = "#f3f4f6"; // text-gray-100
      } else {
        // Light mode styles
        calendarWrapper.classList.remove("dark");
        calendarWrapper.style.backgroundColor = "#ffffff"; // bg-white
        calendarWrapper.style.color = "#374151"; // text-gray-700
      }
    }
  }, [isDarkMode]);

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-md">
      <Calendar
        onChange={onChange}
        value={value}
        locale="fr" // Ou 'en-US' si vous préférez l'anglais
        className="react-calendar dark:bg-gray-800 dark:text-gray-100"
      />
    </div>
  );
};

export default EventCalendar;