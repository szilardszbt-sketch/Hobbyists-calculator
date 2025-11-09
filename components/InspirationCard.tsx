import React from 'react';

interface InspirationCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick: () => void;
}

const InspirationCard: React.FC<InspirationCardProps> = ({ title, icon, description, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-full text-left p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl hover:bg-indigo-50 dark:hover:bg-gray-700/80 transform hover:-translate-y-1 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
      aria-label={`Generate calculator for ${title}`}
    >
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 text-indigo-500 dark:text-indigo-400 mt-1">
          {icon}
        </div>
        <div>
          <h4 className="font-bold text-gray-800 dark:text-gray-200">{title}</h4>
          <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
        </div>
      </div>
    </button>
  );
};

export default InspirationCard;
