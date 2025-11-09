import React from 'react';

interface SaveOptionsProps {
  onSavePDF: () => void;
  onSaveCSV: () => void;
  onEmail: () => void;
  isButtonDisabled: boolean;
}

const PDFIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4 2a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V4a2 2 0 00-2-2H4zm6 2a1 1 0 00-1 1v2a1 1 0 102 0V5a1 1 0 00-1-1zM5 8a1 1 0 000 2h10a1 1 0 100-2H5zm1 3a1 1 0 100 2h8a1 1 0 100-2H6z" clipRule="evenodd" /></svg>;
const CSVIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor"><path d="M2 3a1 1 0 011-1h14a1 1 0 011 1v14a1 1 0 01-1 1H3a1 1 0 01-1-1V3zm2 2v2h12V5H4zm0 4v2h12V9H4zm0 4v2h12v-2H4z" /></svg>;
const EmailIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" /><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" /></svg>;


const SaveOptions: React.FC<SaveOptionsProps> = ({ onSavePDF, onSaveCSV, onEmail, isButtonDisabled }) => {
  const buttonClasses = "inline-flex items-center justify-center px-3 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md shadow-sm text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:bg-gray-100 dark:disabled:bg-gray-800 dark:disabled:text-gray-500 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors";
  return (
    <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
      <h4 className="text-sm font-bold text-gray-600 dark:text-gray-400 mb-3 text-center">Save & Export</h4>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <button onClick={onSavePDF} disabled={isButtonDisabled} className={buttonClasses}>
            <PDFIcon /> Save as PDF
        </button>
        <button onClick={onSaveCSV} disabled={isButtonDisabled} className={buttonClasses}>
            <CSVIcon /> Export to CSV
        </button>
        <button onClick={onEmail} disabled={isButtonDisabled} className={buttonClasses}>
            <EmailIcon /> Email Results
        </button>
      </div>
    </div>
  );
};

export default SaveOptions;
