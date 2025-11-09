import React from 'react';

interface CalculatorCardProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  onReset: () => void;
  isEditable?: boolean;
  onTitleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  imageUrl?: string | null;
}

const CalculatorCard: React.FC<CalculatorCardProps> = ({ title, icon, children, onReset, isEditable, onTitleChange, imageUrl }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3 w-full mr-4">
                {imageUrl ? (
                    <img src={imageUrl} alt={`${title} icon`} className="h-8 w-8 rounded-md object-cover bg-gray-200 dark:bg-gray-700" />
                ) : (
                    icon
                )}
                {isEditable && onTitleChange ? (
                  <input
                    type="text"
                    value={title}
                    onChange={onTitleChange}
                    className="text-2xl font-bold text-gray-800 dark:text-gray-200 bg-transparent border-b-2 border-transparent focus:border-indigo-500 dark:focus:border-indigo-400 outline-none w-full transition-colors"
                    aria-label="Calculator Title"
                  />
                ) : (
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200">{title}</h3>
                )}
            </div>
            <button
                onClick={onReset}
                className="text-sm font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors flex-shrink-0"
            >
                Reset
            </button>
        </div>
        <div className="space-y-4">
            {children}
        </div>
      </div>
    </div>
  );
};

export default CalculatorCard;
