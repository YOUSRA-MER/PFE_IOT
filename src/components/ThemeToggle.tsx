"use client"; // Ensure this is a client component

import { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react'; // Import icons for dark and light mode

const ThemeToggle = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Check localStorage for dark mode preference
    const isDark = localStorage.getItem('darkMode') === 'true';
    setDarkMode(isDark);
    document.documentElement.classList.toggle('dark', isDark);
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode.toString());
    document.documentElement.classList.toggle('dark', newDarkMode);
  };

  return (
    <button
      onClick={toggleDarkMode}
      className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
      aria-label="Toggle dark mode"
    >
      {darkMode ? (
        <Sun className="w-5 h-5 text-yellow-500" /> // Sun icon for light mode
      ) : (
        <Moon className="w-5 h-5 text-gray-700 dark:text-gray-300" /> // Moon icon for dark mode
      )}
    </button>
  );
};

export default ThemeToggle;