import React from 'react';

const IntroContent: React.FC = () => {
  return (
    <section className="bg-white dark:bg-gray-900/50 py-12 px-4 rounded-xl shadow-md">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200 text-center mb-6">Planning Your Hobby Budget</h2>
        <div className="space-y-4 text-gray-600 dark:text-gray-400 leading-relaxed">
          <p>
            Starting a new hobby is an exciting journey, but it often comes with hidden costs that can catch you by surprise. Whether you're dreaming of soaring through the skies with a drone, brewing the perfect shot of espresso, or building a high-performance gaming PC, understanding the full financial commitment is the first step towards success. The Hobbyist's Compass is designed to demystify these costs, giving you a clear and comprehensive breakdown of both the initial investment and the recurring expenses you can expect.
          </p>
          <p>
            Our easy-to-use calculators provide instant, accurate estimates based on your specific needs and preferences. By breaking down costs for essential gear, accessories, and ongoing supplies, we empower you to make informed decisions. This allows you to budget effectively, avoid unexpected financial strain, and focus on what truly matters: enjoying your new passion to the fullest. Use our tools to plan your budget, compare different setups, and start your hobby journey with financial confidence.
          </p>
        </div>
      </div>
    </section>
  );
};

export default IntroContent;