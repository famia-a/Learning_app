import React from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { UserCircleIcon } from '@hugeicons/core-free-icons';
import { Link } from 'react-router-dom';
import icon from '../assets/icon.png';

export default function Navbar() {
  // Reusable styling class for all nav links
  const navLinkClass = 'rounded-lg hover:bg-gray-100 text-gray-700 px-3 py-2 text-sm transition-colors';

  return (
    <nav className="bg-[#F8FAFC] py-4 px-4 sticky top-0 z-50 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Brand Logo & Name */}
        <div className="flex text-[#F43F72] text-xl font-bold items-center gap-2">
          <img src={icon} alt="LearnFlow Icon" className="w-8 h-8 object-contain" />
          <span>LearnFlow</span>
        </div>
        
        {/* Navigation Links */}
        <div className="flex gap-1 items-center">
          <a href="/#features" className={navLinkClass}>
            Features
          </a>
          <a href="/#howitworks" className={navLinkClass}>
            How It Works
          </a>
          <a href="/#quizzes" className={navLinkClass}>
            Quizzes
          </a>
          <a href="/#faq" className={navLinkClass}>
            FAQ's
          </a>
          <a href="/#testimonials" className={navLinkClass}>
            Testimonials
          </a>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button className="rounded-lg hover:bg-gray-100 px-3 py-2 text-[#F43F72] flex gap-2 items-center text-sm font-medium transition-colors">
            <HugeiconsIcon icon={UserCircleIcon} size={20} /><Link to="/login">Log in</Link>
          </button>
          <button className="rounded-lg hover:bg-[#F43F72] hover:text-white border border-[#F43F72] px-3 py-2 text-[#F43F72] text-sm font-medium transition-colors"><Link to="/register">Get Started</Link>
          </button>
        </div>
      </div>
    </nav>
  );
}