import React from "react";

import girl from '/src/assets/girl-studying.png';
import guy from '/src/assets/guy-studying.png';
import laptop from '/src/assets/laptop-dashboard.png';
import OverlyMenu from "./OverlyMenu";

export default function(){
    return(
        <div className="lg:col-span-7 relative min-h-130 flex items-center justify-center">
          
          {/* 1. TOP LEFT CARD (Girl Studying) */}
          <div className="absolute -top-20 md:left-15  sm:left-12  sm:w-64 rounded-2xl overflow-hidden shadow-xl border border-gray-100 z-10 shadow-gray-300 transition hover:scale-[1.02]">
            <img 
              src={girl} alt="Student studying with laptop" className="w-full h-auto object-cover" 
            />
          </div>

          {/* Annotation 1: Watch */}
          <div className="absolute top-2 left-0 z-30 hidden sm:block text-pink-600 font-serif italic text-xs">
            <span>Watch</span>
            <p className="not-italic text-[10px] text-gray-500">any YouTube video</p>
          </div>

          {/* 2. TOP RIGHT CARD (Laptop Dashboard) */}
          <div className="absolute top-25 right-0 w-44 sm:w-96 rounded-2xl overflow-hidden shadow-pink-300 shadow-2xl border border-gray-100 z-20 transition hover:scale-[1.02]">
            <img 
              src={laptop} 
              alt="AI Transcript Dashboard" 
              className="w-full h-auto object-cover" 
            />
          </div>

          {/* Annotation 2: Understand */}
          <div className="absolute top-0 right-12 z-30 hidden sm:block text-pink-600 font-serif italic text-xs text-right">
            <span>Understand</span>
            <p className="not-italic text-[10px] text-gray-500">with AI-powered transcripts</p>
          </div>

          {/* 3. FLOATING MENU CARD (AI Transcript, Smart Summary) */}
          <OverlyMenu/>

          {/* 4. BOTTOM RIGHT CARD (Guy Studying) */}
          <div className="absolute -bottom-10 left-30 sm:right-12 w-40 h-60 sm:w-80 rounded-xl overflow-hidden shadow-xl border border-gray-100 shadow-blue-300 z-20 transition hover:scale-[1.02]">
            <img 
              src={guy}
              alt="Student wearing headphones taking notes" 
              className="w-full h-auto object-cover" 
            />
          </div>

          {/* Annotation 3: Test & Improve */}
          <div className="absolute bottom-4 right-0 z-30 hidden sm:block text-pink-600 font-serif italic text-xs">
            <span>Test & Improve</span>
            {/* <img src='./src/assets/images.png'/> */}
            <p className="not-italic text-[10px] text-gray-500">track your progress</p>
          </div>

        </div>
    )
}