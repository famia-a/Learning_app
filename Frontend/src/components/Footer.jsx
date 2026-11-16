import React from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import {HeartIcon,NewTwitterIcon,Linkedin02Icon,GithubIcon} from '@hugeicons/core-free-icons'
import logo from '../assets/logo.png'
import {Link} from 'react-router'
export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-gray-50 border-t border-gray-100 font-sans mt-24">
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
        
        {/* TOP SECTION: Branding & Quick Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 md:gap-12 mb-12">
          
          {/* Logo & Slogan (2 cols on desktop) */}
          <div className="col-span-2 md:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2 group">
              <span className="w-60 h-30 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform">
                <img src={logo} />
              </span>
             
            </Link>
            <p className="text-sm text-gray-600 leading-relaxed max-w-sm">
              AI-powered learning platform turning educational YouTube videos into organized study materials.
            </p>
          </div>

          {/* Product Links */}
          <div className="col-span-1 space-y-3.5">
            <h5 className="text-sm font-bold text-gray-800 tracking-wider uppercase">Product</h5>
            <ul className="space-y-2.5 text-sm text-gray-600 font-medium">
              <li><a href="#features" className="hover:text-[#F43F72] transition-colors">Features</a></li>
              <li><a href="#pricing" className="hover:text-[#F43F72] transition-colors">Pricing</a></li>
              <li><a href="#extension" className="hover:text-[#F43F72] transition-colors">Chrome Extension</a></li>
            </ul>
          </div>

          {/* Company Links */}
          <div className="col-span-1 space-y-3.5">
            <h5 className="text-sm font-bold text-gray-800 tracking-wider uppercase">Company</h5>
            <ul className="space-y-2.5 text-sm text-gray-600 font-medium">
              <li><a href="#about" className="hover:text-[#F43F72] transition-colors">About</a></li>
              <li><a href="#careers" className="hover:text-[#F43F72] transition-colors">Careers</a></li>
              <li><a href="#contact" className="hover:text-[#F43F72] transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Legal Links (New column on desktop) */}
          <div className="col-span-1 space-y-3.5">
            <h5 className="text-sm font-bold text-gray-800 tracking-wider uppercase">Legal</h5>
            <ul className="space-y-2.5 text-sm text-gray-600 font-medium">
              <li><a href="#privacy" className="hover:text-[#F43F72] transition-colors">Privacy Policy</a></li>
              <li><a href="#terms" className="hover:text-[#F43F72] transition-colors">Terms of Service</a></li>
            </ul>
          </div>

        </div>

        {/* BOTTOM SECTION: Copyright & Socials */}
        <div className="pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-5 text-center sm:text-left">
          
          <p className="text-xs md:text-sm text-gray-500 flex font-medium">
            &copy; {currentYear} LearnFlow. All rights reserved. <span className="text-gray-400 flex">| Designed with <span className='text-red-400'><HugeiconsIcon icon={HeartIcon} /></span> for active learners.</span>
          </p>

          {/* Minimal Social Links */}
          <div className="flex items-center gap-5 text-gray-500">
            {[ { icon: <HugeiconsIcon icon={NewTwitterIcon} />, url: '#', alt: 'X (Twitter)' },
               { icon: <HugeiconsIcon icon={Linkedin02Icon} />, url: '#', alt: 'LinkedIn' },
               { icon: <HugeiconsIcon icon={GithubIcon} />, url: '#', alt: 'GitHub' } ].map((social, i) => (
              <a key={i} href={social.url} title={social.alt} className="hover:text-[#F43F72] hover:scale-110 transition-all text-sm">
                {social.icon}
              </a>
            ))}
          </div>

        </div>

      </div>
    </footer>
  );
}