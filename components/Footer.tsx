import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 dark:bg-gray-900 text-gray-400 dark:text-gray-500 text-center p-8 mt-12">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-center space-x-6 mb-4">
          <a href="#" className="hover:text-white dark:hover:text-indigo-400 transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white dark:hover:text-indigo-400 transition-colors">Terms of Service</a>
        </div>
        <p className="text-sm">
          This site is monetized through Google AdSense. We are not responsible for the content of the ads displayed.
        </p>
        <p className="text-sm mt-2">&copy; {new Date().getFullYear()} The Hobbyist's Compass. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
