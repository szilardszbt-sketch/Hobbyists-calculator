import React from 'react';

interface ThemeToggleProps {
  isDarkMode: boolean;
  onToggle: () => void;
}

const SunIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
);

const MoonIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
    </svg>
);


const ThemeToggle: React.FC<ThemeToggleProps> = ({ isDarkMode, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className="relative inline-flex items-center h-8 w-16 rounded-full bg-gray-600 dark:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 dark:focus:ring-offset-gray-900 focus:ring-indigo-500"
      aria-label={isDarkMode ? 'Activate light mode' : 'Activate dark mode'}
    >
      <span className="sr-only">Toggle dark mode</span>
      <span
        className={`${
          isDarkMode ? 'translate-x-9' : 'translate-x-1'
        } inline-flex items-center justify-center h-6 w-6 transform rounded-full bg-white dark:bg-gray-800 shadow-lg transition-transform`}
      >
        {isDarkMode ? <MoonIcon /> : <SunIcon />}
      </span>
    </button>
  );
};

export default ThemeToggle;
