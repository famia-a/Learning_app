import React from 'react';

export default function HowItWorks() {
  const steps = [
    {
      number: '01',
      title: 'Paste Your Video',
      subtitle: 'Start with any YouTube video',
      description:
        'Paste the URL of an educational YouTube video and let LearnFlow prepare your learning space.',
      icon: (
        <svg className="w-6 h-6 text-[#F43F72]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
        </svg>
      ),
    },
    {
      number: '02',
      title: 'Understand the Content',
      subtitle: 'Get the knowledge, not just the transcript',
      description:
        'Read the transcript, explore an AI-generated summary, and discover the key concepts and takeaways from the video.',
      icon: (
        <svg className="w-6 h-6 text-[#F43F72]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
    },
    {
      number: '03',
      title: 'Test Yourself',
      subtitle: 'Turn knowledge into progress',
      description:
        'Generate an AI-powered quiz from the video and test how well you actually understood what you watched.',
      icon: (
        <svg className="w-6 h-6 text-[#F43F72]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
  ];

  return (
    <section className="relative w-full max-w-7xl mx-auto px-6 py-16 md:py-24 font-sans">
      
      {/* SECTION HEADER */}
      <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
        {/* Small Label Pill */}
        <div className="inline-flex items-center  text-[#F43F72] px-3.5 py-6 text-4xl font-bold tracking-wide ">
          <span></span> How It Works
        </div>

        {/* Main Heading */}
        <h2 className="text-xl md:text-2xl font-bold text-gray-800 ">
          From YouTube Video to Learning Experience in{' '}
          <span className="text-[#F43F72]">Seconds</span>
        </h2>

        {/* Description */}
        <p className="text-gray-600 text-base  md:text-m leading-relaxed">
          Stop pausing, rewinding, and taking endless notes. LearnFlow uses AI to transform educational videos into organized learning materials you can understand, review, and test yourself on.
        </p>
      </div>

      {/* 3 STEPS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
        
        {steps.map((step, idx) => (
          <div
            key={step.number}
            className="group relative bg-white border border-gray-100 rounded-3xl p-8 shadow-sm hover:shadow-xl hover:border-pink-200 transition-all duration-300 flex flex-col justify-between"
          >
            {/* Step Number & Icon Header */}
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                {/* Step Icon */}
                <div className="w-12 h-12 bg-pink-50 border border-pink-100/80 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  {step.icon}
                </div>

                {/* Big Step Number */}
                <span className="text-3xl font-black text-gray-400  transition-colors duration-300">
                  {step.number}
                </span>
              </div>

              {/* Title & Subtitle */}
              <div className="space-y-1">
                <span className="text-xs uppercase tracking-wider text-[#F43F72]">
                  Step {step.number}
                </span>
                <h3 className="text-xl font-bold text-[#F43F72]/80 group-hover:text-[#F43F72] transition-colors">
                  {step.title}
                </h3>
                <p className="text-sm font-semibold text-gray-400">
                  {step.subtitle}
                </p>
              </div>

              {/* Description Body */}
              <p className="text-m text-gray-600 leading-relaxed pt-2">
                {step.description}
              </p>
            </div>

            {/* Bottom Accent Bar */}
            <div className="mt-3 pt-4 border-t border-gray-50 flex items-center justify-between text-xs font-medium text-[#F43F72] opacity-0 group-hover:opacity-100 transition-opacity">
              <span>Learn more</span>
              <span>→</span>
            </div>
          </div>
        ))}

      </div>

    </section>
  );
}