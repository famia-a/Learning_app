import React, { useState, useEffect } from 'react';

export default function Testimonials() {
  const reviews = [
    {
      id: 1,
      name: 'Sarah M.',
      role: 'Computer Science Student',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
      quote:
        '"Instead of watching the same tutorial three times, I can read the transcript, review the summary, and test myself with a quiz. It completely changed how I study."',
    },
    {
      id: 2,
      name: 'Michael R.',
      role: 'Software Developer',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      quote:
        '"The quiz feature is my favorite. It makes me realize which parts of the video I actually understood and which ones I need to review."',
    },
    {
      id: 3,
      name: 'Ayesha K.',
      role: 'Self-Learner',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      quote:
        '"I use it for long technical tutorials. The summary and key takeaways save me so much time."',
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-scroll every 4 seconds (4000ms)
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isPaused, reviews.length]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + reviews.length) % reviews.length);
  };

  return (
    <section className="relative w-full max-w-5xl mx-auto px-6 py-16 md:py-24 font-sans overflow-hidden">
      
      {/* SECTION HEADER */}
      <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
        {/* Label Pill */}
        <div className="inline-flex items-center gap-1.5 bg-rose-50 text-[#F43F72] px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide border border-rose-100">
          <span>💬</span> Testimonials
        </div>

        {/* Main Heading */}
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 tracking-tight leading-tight">
          Don't Just Take Our <span className="text-[#F43F72]">Word For It</span>
        </h2>

        {/* Subtitle */}
        <p className="text-gray-600 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
          See how learners are turning videos into better study sessions.
        </p>
      </div>

      {/* CAROUSEL CONTAINER */}
      <div 
        className="relative max-w-2xl mx-auto"
        onMouseEnter={() => setIsPaused(true)}  // Pause auto-scroll on hover
        onMouseLeave={() => setIsPaused(false)} // Resume auto-scroll on leave
      >
        {/* CARD WRAPPER WITH SMOOTH SLIDE ANIMATION */}
        <div className="overflow-hidden rounded-3xl p-2">
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {reviews.map((review) => (
              <div
                key={review.id}
                className="w-full shrink-0 px-2"
              >
                <div className="group bg-white border border-gray-100 rounded-3xl p-8 md:p-10 shadow-md hover:shadow-xl hover:border-rose-200 transition-all duration-300 flex flex-col justify-between relative overflow-hidden min-h-[260px] ">
                  
                  {/* Subtle decorative background glow */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-black from-rose-50/60 to-transparent rounded-bl-full pointer-events-none" />

                  <div className="space-y-6 relative z-10">
                    {/* Header: Avatar + Star Rating */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img
                          src={review.avatar}
                          alt={review.name}
                          className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-xs"
                        />
                        <div>
                          <h4 className="text-base font-bold text-gray-800 group-hover:text-[#F43F72] transition-colors">
                            {review.name}
                          </h4>
                          <p className="text-xs font-medium text-gray-500">
                            {review.role}
                          </p>
                        </div>
                      </div>

                      {/* 5 Stars */}
                      <div className="flex items-center gap-1 text-amber-400">
                        {[...Array(review.rating)].map((_, i) => (
                          <svg
                            key={i}
                            className="w-4 h-4 fill-amber-400"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </div>

                    {/* Quote */}
                    <p className="text-base md:text-lg text-gray-700 leading-relaxed italic pt-2">
                      {review.quote}
                    </p>
                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>

        {/* NAVIGATION CONTROLS (Prev / Next Buttons) */}
        <button
          onClick={handlePrev}
          className="absolute left-[-20px] md:left-[-24px] top-1/2 -translate-y-1/2 w-10 h-10 bg-white border border-gray-100 hover:border-rose-200 text-gray-700 hover:text-[#F43F72] rounded-full shadow-md flex items-center justify-center transition-all duration-200 z-20 focus:outline-none"
          aria-label="Previous review"
        >
          ‹
        </button>

        <button
          onClick={handleNext}
          className="absolute right-[-20px] md:right-[-24px] top-1/2 -translate-y-1/2 w-10 h-10 bg-white border border-gray-100 hover:border-rose-200 text-gray-700 hover:text-[#F43F72] rounded-full shadow-md flex items-center justify-center transition-all duration-200 z-20 focus:outline-none"
          aria-label="Next review"
        >
          ›
        </button>

        {/* PAGINATION DOTS */}
        <div className="flex items-center justify-center gap-2 mt-6">
          {reviews.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                currentIndex === idx
                  ? 'w-8 bg-[#F43F72]'
                  : 'w-2.5 bg-rose-100 hover:bg-rose-200'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

      </div>

    </section>
  );
}