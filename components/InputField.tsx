import React from 'react';

interface InputFieldProps {
  id: string;
  name:string;
  label: string;
  value: number | boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: 'number' | 'checkbox';
  disabled?: boolean;
  symbol?: string;
}

const InputField: React.FC<InputFieldProps> = ({ id, name, label, value, onChange, type = 'number', disabled = false, symbol = '$' }) => {
  if (type === 'checkbox') {
    return (
      <div className="flex items-center justify-between">
        <label htmlFor={id} className="text-gray-600 dark:text-gray-300 font-medium">
          {label}
        </label>
        <input
          id={id}
          name={name}
          type="checkbox"
          checked={!!value}
          onChange={onChange}
          className="h-5 w-5 rounded border-gray-300 dark:border-gray-500 text-indigo-600 bg-gray-100 dark:bg-gray-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 dark:ring-offset-gray-800"
        />
      </div>
    );
  }

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        {label}
      </label>
      <div className="relative rounded-md shadow-sm">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <span className="text-gray-500 dark:text-gray-400 sm:text-sm">{symbol}</span>
        </div>
        <input
          type="number"
          id={id}
          name={name}
          // FIX: An input of type 'number' cannot have a boolean value. This handles the boolean case by returning an empty string.
          value={typeof value === 'boolean' ? '' : (value === 0 ? '' : value)}
          onChange={onChange}
          disabled={disabled}
          className="block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white pl-7 pr-3 py-2 focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-indigo-500 dark:focus:ring-indigo-400 sm:text-sm disabled:bg-gray-100 dark:disabled:bg-gray-600 disabled:cursor-not-allowed"
          placeholder="0.00"
          min="0"
        />
      </div>
    </div>
  );
};

export default InputField;
