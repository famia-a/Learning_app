import React from 'react';

export default function SocialReview() {
  const users = [
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
      alt: "Learner 1"
    },
    {
      id: 2,
      src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
      alt: "Learner 2"
    },
    {
      id: 3,
      src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
      alt: "Learner 3"
    },
    {
      id: 4,
      src: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80",
      alt: "Learner 4"
    }
  ];

  return (
    <div className="flex items-center gap-4 mt-8 mx-4 border-t border-gray-100">
      {/* Avatar Stack */}
      <div className="flex -space-x-2.5 overflow-hidden">
        {users.map((user) => (
          <img
            key={user.id}
            className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover"
            src={user.src}
            alt={user.alt}
          />
        ))}
      </div>

      {/* Rating & Social Proof */}
      <div className="flex flex-col justify-center">
        <div className="flex items-center gap-1 text-amber-400 text-xs">
          {/* Star SVG icons for crisp look across devices */}
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              className="w-3.5 h-3.5 fill-amber-400 text-amber-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
          ))}
        </div>
        <p className="text-xs text-gray-600 font-medium mt-0.5">
          Loved by <span className="font-semibold text-gray-900">20,000+</span> learners worldwide
        </p>
      </div>
    </div>
  );
}