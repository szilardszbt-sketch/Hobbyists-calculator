import React, { useEffect, useState, useMemo } from 'react';
import { marked } from 'marked';

interface HobbyGuideProps {
  title: string;
  content: string | null;
  isLoading: boolean;
  isDefault: boolean;
}

const HobbyGuide: React.FC<HobbyGuideProps> = ({ title, content, isLoading, isDefault }) => {
  const [parsedContent, setParsedContent] = useState('');

  useEffect(() => {
    if (content) {
      // The `marked` library is now async by default.
      marked.parse(content, (err, result) => {
        if (!err) {
          setParsedContent(result);
        } else {
            setParsedContent("Error loading content.")
        }
      });
    } else {
      setParsedContent('');
    }
  }, [content]);
  
  const hobbyTitle = useMemo(() => isDefault ? "Drone Flying" : title, [isDefault, title]);

  if (isLoading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 md:p-8">
        <div className="animate-pulse">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mx-auto mb-4"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mx-auto mb-8"></div>
            <div className="space-y-4">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                <div className="mt-6 h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
            </div>
        </div>
      </div>
    );
  }

  if (!content) return null;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 md:p-8">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-200 mb-2 text-center">
        Your Guide to Getting Started with {hobbyTitle}
      </h2>
      <p className="text-center text-gray-500 dark:text-gray-400 mb-6">An AI-powered overview to help you plan your new passion.</p>
      <div
        className="prose prose-indigo dark:prose-invert max-w-none prose-h3:text-indigo-700 dark:prose-h3:text-indigo-400 prose-a:text-indigo-600 hover:prose-a:text-indigo-500 dark:prose-a:text-indigo-400"
        dangerouslySetInnerHTML={{ __html: parsedContent }}
      />
    </div>
  );
};

export default HobbyGuide;