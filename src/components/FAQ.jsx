import React, { useState } from 'react';

export default function FAQSection() {
  const faqs = [
    {
      id: 1,
      question: 'Can I generate a transcript from any YouTube video?',
      answer:
        "Paste the YouTube video URL into LearnFlow and, when a usable transcript is available, we'll turn it into a clean learning resource.",
    },
    {
      id: 2,
      question: 'What can I do with the transcript?',
      answer:
        'You can read, search, review, and use the transcript to generate summaries, key takeaways, and quizzes.',
    },
    {
      id: 3,
      question: 'Can I generate a quiz from the video?',
      answer:
        "Yes. LearnFlow analyzes the video's learning content and generates questions designed to test your understanding.",
    },
    {
      id: 4,
      question: 'Can I choose the difficulty of my quiz?',
      answer:
        'Yes. You can choose between different difficulty levels and configure the number of questions.',
    },
    {
      id: 5,
      question: 'Will my quizzes and scores be saved?',
      answer:
        'Yes. Your completed quizzes and scores are saved to your account so you can review your previous performance.',
    },
    {
      id: 6,
      question: 'Can I come back to a video later?',
      answer:
        'Yes. Your processed videos are stored in your personal learning library so you can return to them whenever you want.',
    },
    {
      id: 7,
      question: 'Can I ask questions about the video?',
      answer:
        "Yes. You can use the AI tutor to ask questions based on the video's content and get explanations while you learn.",
    },
  ];

  const [openId, setOpenId] = useState(1);

  const toggleFAQ = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="relative w-full max-w-4xl mx-auto px-6 py-16 md:py-24 font-sans">
      
      {/* SECTION HEADER */}
      <div className="text-center space-y-4 mb-14">
        {/* Small Label Pill */}
        <div className="inline-flex items-center gap-1.5 bg-rose-50 text-[#F43F72] px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide border border-rose-100">
          <span>❓</span> Frequently Asked Questions
        </div>

        {/* Main Heading */}
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 tracking-tight leading-tight">
          Everything You Need to <span className="text-[#F43F72]">Know</span>
        </h2>
      </div>

      {/* ACCORDION CONTAINER */}
      <div className="space-y-4">
        {faqs.map((faq) => {
          const isOpen = openId === faq.id;

          return (
            <div
              key={faq.id}
              className={`border rounded-2xl transition-all duration-200 overflow-hidden ${
                isOpen
                  ? 'bg-white border-rose-200 shadow-sm'
                  : 'bg-white border-gray-100 hover:border-rose-100'
              }`}
            >
              {/* Question Toggle Button */}
              <button
                onClick={() => toggleFAQ(faq.id)}
                className="w-full flex items-center justify-between p-5 md:p-6 text-left focus:outline-none"
              >
                <span className="text-base md:text-lg font-bold text-gray-800 pr-4">
                  {faq.question}
                </span>

                {/* Plus / Minus Icon Badge */}
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors duration-200 ${
                    isOpen
                      ? 'bg-[#F43F72] text-white'
                      : 'bg-rose-50 text-[#F43F72]'
                  }`}
                >
                  <svg
                    className={`w-4 h-4 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {isOpen ? (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2.5"
                        d="M20 12H4"
                      />
                    ) : (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2.5"
                        d="M12 4v16m8-8H4"
                      />
                    )}
                  </svg>
                </div>
              </button>

              {/* Answer Body */}
              {isOpen && (
                <div className="px-5 pb-6 md:px-6 md:pb-6 text-sm text-gray-600 leading-relaxed border-t border-rose-50/60 pt-4">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>

    </section>
  );
}