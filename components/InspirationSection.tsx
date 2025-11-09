import React from 'react';
import InspirationCard from './InspirationCard';

interface InspirationSectionProps {
  onGenerate: (query: string) => void;
}

const CoffeeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor"><path d="M18.5 3H6c-1.1 0-2 .9-2 2v5.71c0 3.83 2.95 7.18 6.78 7.29 4.26.12 7.72-3.34 7.72-7.5V5c0-1.1-.9-2-2-2zM12 14c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm6.5-9v2h-2V5h2zM4 21h16v2H4v-2z"/></svg>;
const PcIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>;
const CameraIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;

const inspirations = [
  {
    title: 'Home Barista Setup',
    description: 'Calculate the cost of espresso machines, grinders, and beans.',
    icon: <CoffeeIcon />,
    query: 'Home Barista Setup'
  },
  {
    title: 'PC Gaming Rig',
    description: 'Budget for a GPU, CPU, motherboard, RAM, and peripherals.',
    icon: <PcIcon />,
    query: 'Building a high-end PC Gaming Rig'
  },
  {
    title: 'Photography Hobby',
    description: 'Estimate costs for a new camera body, lenses, and accessories.',
    icon: <CameraIcon />,
    query: 'Starting photography as a hobby'
  },
];

const InspirationSection: React.FC<InspirationSectionProps> = ({ onGenerate }) => {
  return (
    <div className="bg-indigo-50 dark:bg-gray-800/70 rounded-xl shadow-lg p-6 border-2 border-dashed border-indigo-200 dark:border-gray-700">
      <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 text-center mb-4">Need Inspiration?</h3>
      <p className="text-gray-600 dark:text-gray-400 text-center mb-6 max-w-sm mx-auto">Click an example below to instantly generate a custom calculator.</p>
      <div className="space-y-4">
        {inspirations.map((item) => (
          <InspirationCard
            key={item.title}
            title={item.title}
            description={item.description}
            icon={item.icon}
            onClick={() => onGenerate(item.query)}
          />
        ))}
      </div>
    </div>
  );
};

export default InspirationSection;
