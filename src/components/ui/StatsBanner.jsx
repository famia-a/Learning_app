import React from 'react';

export default function StatsBanner() {
  const stats = [
    {
      id: 1,
      value: '10K+',
      label: 'Videos Processed',
      icon: (
        <svg className="w-5 h-5 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      id: 2,
      value: '2M+',
      label: 'Transcripts Generated',
      icon: (
        <svg className="w-5 h-5 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
    },
    {
      id: 3,
      value: '500K+',
      label: 'Quizzes Taken',
      icon: (
        <svg className="w-5 h-5 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      ),
    },
    {
      id: 4,
      value: '85%',
      label: 'Average Score Improvement',
      icon: (
        <svg className="w-5 h-5 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
    },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-4">
      <div className="bg-white/80 backdrop-blur-sm border border-gray-100 rounded-lg shadow-sm px-6 py-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center">
          {stats.map((stat) => (
            <div key={stat.id} className="flex items-center gap-3.5">
              {/* Pink Icon Container */}
              <div className="shrink-0 w-11 h-11 bg-pink-50 border border-pink-100/60 rounded-xl flex items-center justify-center">
                {stat.icon}
              </div>

              {/* Text Stats */}
              <div className="flex flex-col">
                <span className="text-lg md:text-xl font-bold text-gray-700 leading-tight">
                  {stat.value}
                </span>
                <span className="text-xs text-gray-500 font-medium whitespace-nowrap">
                  {stat.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}