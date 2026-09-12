import { useState } from 'react'
import Navbar from './components/Navbar'
import StatsBanner from './components/ui/StatsBanner.jsx'
import Hero from './components/Hero.jsx'
import HowItWorks from './components/HowItWorks.jsx'
import Features from './components/Features.jsx'
import FAQ from './components/FAQ.jsx'
import GotMoreQuestions from './components/GotMoreQuestions.jsx'
import Testimonials from './components/Testimonials.jsx'

export default function App() {
 
  return (
    <div className='overflow-x-hidden'> 
    <Navbar/>
    <Hero/>
    <StatsBanner/>
    <HowItWorks/>
    <Features/>
    <Testimonials/>
    <FAQ/>
    <GotMoreQuestions/>
    </div>
  )
}
