import React from 'react';

interface AiSuggestionBoxProps {
  isLoading: boolean;
  suggestion: string | null;
  error: string | null;
  onGenerate: () => void;
  isButtonDisabled: boolean;
}

const AiIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zM5.5 8.5a.5.5 0 011 0V12a.5.5 0 01-1 0V8.5zM7.5 6.5a.5.5 0 011 0v6a.5.5 0 01-1 0v-6zm3-2a.5.5 0 011 0v10a.5.5 0 01-1 0V4.5zm2 3a.5.5 0 011 0v4a.5.5 0 01-1 0v-4z" clipRule="evenodd" />
  </svg>
);

const LoadingSpinner = () => (
    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
);

const AiSuggestionBox: React.FC<AiSuggestionBoxProps> = ({ isLoading, suggestion, error, onGenerate, isButtonDisabled }) => {
  return (
    <div className="mt-4">
      <button
        onClick={onGenerate}
        disabled={isLoading || isButtonDisabled}
        className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors dark:bg-indigo-500 dark:hover:bg-indigo-600 dark:disabled:bg-indigo-400/50"
      >
        {isLoading ? <><LoadingSpinner /> <span className="ml-2">Generating...</span></> : <><AiIcon /><span>Get AI Suggestions</span></>}
      </button>

      {error && !isLoading && (
          <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/50 border border-red-200 dark:border-red-500/30 rounded-md text-sm text-red-700 dark:text-red-300">
              {error}
          </div>
      )}

      {suggestion && !isLoading && (
        <div className="mt-4 p-4 bg-indigo-50 dark:bg-gray-700/60 border-l-4 border-indigo-400 dark:border-indigo-500 rounded-r-lg shadow-sm">
          <h4 className="text-sm font-bold text-indigo-800 dark:text-indigo-300 mb-2">AI Suggestion ✨</h4>
          <p className="text-sm text-indigo-700 dark:text-indigo-400 whitespace-pre-wrap">{suggestion}</p>
        </div>
      )}
    </div>
  );
};

export default AiSuggestionBox;
