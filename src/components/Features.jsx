import React from 'react';

export default function FeaturesSection() {
  const features = [
    {
      id: 1,
      title: 'AI-Powered Transcripts',
      description:
        'Get a clean, readable transcript of your YouTube video so you can review important information at your own pace.',
      icon: (
        <svg className="w-6 h-6 text-[#F43F72]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
    },
    {
      id: 2,
      title: 'Smart Summaries',
      description:
        'Quickly understand the main ideas with AI-generated summaries that turn long videos into easy-to-digest information.',
      icon: (
        <svg className="w-6 h-6 text-[#F43F72]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
    },
    {
      id: 3,
      title: 'AI-Generated Quizzes',
      description:
        'Test your understanding with quizzes generated directly from the video\'s content.',
      icon: (
        <svg className="w-6 h-6 text-[#F43F72]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      ),
    },
    {
      id: 4,
      title: 'Personalized Learning Space',
      description:
        'Keep your transcripts, summaries, quizzes, and learning materials organized in one place.',
      icon: (
        <svg className="w-6 h-6 text-[#F43F72]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
    },
    {
      id: 5,
      title: 'Track Your Progress',
      description:
        'Keep track of your quiz scores and see how your learning improves over time.',
      icon: (
        <svg className="w-6 h-6 text-[#F43F72]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      id: 6,
      title: 'Ask AI About the Video',
      description:
        'Ask questions about the video and get simple explanations based on the content you just studied.',
      icon: (
        <svg className="w-6 h-6 text-[#F43F72]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      ),
    },
  ];

  return (
    <section className="relative w-full max-w-7xl mx-auto px-6 py-16 md:py-24 font-sans">
      
      {/* HEADER */}
      <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
        {/* Label Pill */}
        <div className="inline-flex items-center gap-1.5 bg-rose-50 text-[#F43F72] px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide border border-rose-100">
          <span>⭐</span> Features
        </div>

        {/* Main Heading */}
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 tracking-tight leading-tight">
          Everything You Need to Turn Videos Into{' '}
          <span className="text-[#F43F72]">Knowledge</span>
        </h2>
      </div>

      {/* 6 FEATURE CARDS GRID (3x2 Layout) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature) => (
          <div
            key={feature.id}
            className="group bg-white border border-gray-100 rounded-3xl p-7 shadow-sm hover:shadow-xl hover:border-rose-200 transition-all duration-300 flex flex-col justify-between"
          >
            <div className="space-y-5">
              {/* Icon Container with #F43F72 Tint */}
              <div className="w-12 h-12 bg-rose-50 border border-rose-100/70 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>

              {/* Title & Description */}
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-gray-800 group-hover:text-[#F43F72] transition-colors">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}