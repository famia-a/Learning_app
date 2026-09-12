import React from 'react';

export default function GotMoreQuestions() {
  return (
    <section className="relative w-full max-w-5xl mx-auto px-6 py-12 font-sans">
      <div className="bg-gradient-to from-rose-50/60 to-white border border-rose-100/80 rounded-3xl p-8 md:p-12 text-center shadow-sm">
        
        {/* Small Badge */}
        <div className="inline-flex items-center gap-1.5 bg-white border border-rose-100 text-[#F43F72] px-3.5 py-1.5 rounded-full text-xs font-semibold shadow-2xs mb-4">
          <span>💬</span> Need Support?
        </div>

        {/* Heading */}
        <h3 className="text-2xl md:text-3xl font-extrabold text-gray-800 tracking-tight mb-3">
          Have more questions?
        </h3>

        {/* Subtitle */}
        <p className="text-sm md:text-base text-gray-600 max-w-lg mx-auto leading-relaxed mb-8">
          We're here to help you get the most out of your learning experience. Reach out anytime!
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          {/* Primary CTA */}
          <a
            href="#contact"
            className="w-full sm:w-auto bg-[#F43F72] hover:bg-[#e03363] text-white font-semibold text-sm px-6 py-3 rounded-2xl shadow-sm transition-all duration-200 hover:shadow-md active:scale-98"
          >
            Contact Us
          </a>

          {/* Secondary Link */}
          <a
            href="#faq"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 bg-white border border-gray-200 hover:border-rose-200 text-gray-700 hover:text-[#F43F72] font-semibold text-sm px-6 py-3 rounded-2xl transition-all duration-200"
          >
            <span>Still curious?</span>
            <span className="text-[#F43F72]">Read our FAQ →</span>
          </a>
        </div>

      </div>
    </section>
  );
}