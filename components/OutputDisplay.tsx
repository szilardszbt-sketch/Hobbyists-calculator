import React from 'react';

interface OutputDisplayProps {
  label: string;
  value: number;
  description: string;
  currency: string;
}

const formatCurrency = (value: number, currency: string) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(value);
};

const OutputDisplay: React.FC<OutputDisplayProps> = ({ label, value, description, currency }) => {
  return (
    <div className="bg-indigo-50 dark:bg-gray-700/50 rounded-lg p-4">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm font-medium text-indigo-800 dark:text-indigo-300">{label}</p>
          <p className="text-xs text-indigo-600 dark:text-indigo-400">{description}</p>
        </div>
        <p className="text-2xl font-bold text-indigo-900 dark:text-indigo-200">{formatCurrency(value, currency)}</p>
      </div>
    </div>
  );
};

export default OutputDisplay;
