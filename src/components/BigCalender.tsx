"use client";

import { Calendar, momentLocalizer, View, Views } from "react-big-calendar";
import moment from "moment";
import { calendarEvents } from "@/lib/data";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useState, useEffect } from "react";

const localizer = momentLocalizer(moment);

const BigCalendar = () => {
  const [view, setView] = useState<View>(Views.WORK_WEEK);

  const handleOnChangeView = (selectedView: View) => {
    setView(selectedView);
  };

  // Add dark mode styles to the calendar
  useEffect(() => {
    const calendarWrapper = document.querySelector(".rbc-calendar") as HTMLElement;
    if (calendarWrapper) {
      if (document.documentElement.classList.contains("dark")) {
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
  }, []);

  return (
    <div className="h-full dark:bg-gray-800 dark:text-gray-100">
      <Calendar
        localizer={localizer}
        events={calendarEvents}
        startAccessor="start"
        endAccessor="end"
        views={["work_week", "day"]}
        view={view}
        style={{ height: "98%" }}
        onView={handleOnChangeView}
        min={new Date(2025, 1, 0, 8, 0, 0)}
        max={new Date(2025, 1, 0, 17, 0, 0)}
        className="dark:bg-gray-800 dark:text-gray-100"
      />
    </div>
  );
};

export default BigCalendar;