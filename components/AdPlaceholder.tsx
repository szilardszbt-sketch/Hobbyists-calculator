import React from 'react';

interface AdPlaceholderProps {
  type: 'banner' | 'in-content' | 'sidebar';
}

const AdPlaceholder: React.FC<AdPlaceholderProps> = ({ type }) => {
  const getAdDimensions = () => {
    switch (type) {
      case 'banner':
        return 'h-32 w-full max-w-5xl';
      case 'in-content':
        return 'h-72 w-full max-w-2xl';
      case 'sidebar':
        return 'h-[500px] w-56';
      default:
        return 'h-32 w-full';
    }
  };

  const adText = () => {
    switch(type) {
        case 'banner': return "Top Banner Ad";
        case 'in-content': return "In-Content Ad";
        case 'sidebar': return "Sidebar Ad";
    }
  }

  return (
    <div className={`flex items-center justify-center bg-gray-200 dark:bg-gray-700 border-2 border-dashed border-gray-400 dark:border-gray-600 rounded-lg mx-auto ${getAdDimensions()}`}>
      <span className="text-gray-500 dark:text-gray-400 font-semibold">{adText()}</span>
    </div>
  );
};

export default AdPlaceholder;
