import React from 'react';
import ThemeToggle from './ThemeToggle';

const CompassIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 md:h-16 md:w-16 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m0 13.5V21m-6.364-.636l1.591-1.591M20.728 4.929l-1.591 1.591M4.929 4.929l1.591 1.591M17.121 17.121l1.591 1.591M3 12h2.25m13.5 0H21" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15l-1.5-3 3-1.5-1.5 3-1.5 3z" />
  </svg>
);

interface HeaderProps {
    isDarkMode: boolean;
    onToggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({ isDarkMode, onToggleTheme }) => {
  return (
    <header className="bg-gray-800 dark:bg-gray-900 text-white text-center py-12 md:py-20 px-4 relative">
        <div className="absolute top-4 right-4 md:top-6 md:right-6">
            <ThemeToggle isDarkMode={isDarkMode} onToggle={onToggleTheme} />
        </div>
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-center items-center gap-4 mb-4">
          <CompassIcon />
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">The Hobbyist's Compass</h1>
        </div>
        <p className="text-xl md:text-2xl text-gray-300 dark:text-gray-400 mt-2">
          Calculate the True Cost of Your Next Passion
        </p>
        <p className="text-md md:text-lg text-gray-400 dark:text-gray-500 mt-4 max-w-2xl mx-auto">
          Get realistic startup and ongoing cost estimates for popular hobbies. Plan your budget effectively and start your new passion with confidence.
        </p>
      </div>
    </header>
  );
};

export default Header;
