import React from 'react'
import Navbar from '../components/Navbar.jsx'
import StatsBanner from '../components/ui/StatsBanner.jsx'
import Hero from '../components/Hero.jsx'
import HowItWorks from '../components/HowItWorks.jsx'
import Features from '../components/Features.jsx'
import FAQ from '../components/FAQ.jsx'
import GotMoreQuestions from '../components/GotMoreQuestions.jsx'
import Footer from '../components/Footer.jsx'
import Testimonials from '../components/Testimonials.jsx'
import Sidebar from '../components/Sidebar.jsx'

function Main() {
  return (
    <div className='overflow-x-hidden'> 
    <Navbar/>
    <Hero/>
    <StatsBanner/>
    <section id="howitworks">
      <HowItWorks/>
    </section>
    <div id="features"><Features /></div>
    <div id="testimonials"><Testimonials/></div>
    <div id="faq"><FAQ/></div>
    <GotMoreQuestions/>
    <Footer/>
    <Sidebar/>
    </div>
  )
}

export default Main