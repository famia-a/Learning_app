import React from 'react'
import SocialReview from './ui/SocialReview.jsx'
import QuickFea from './ui/QuickFea.jsx'
import HeroText from './ui/HeroText.jsx'
import Input from './ui/Input.jsx'
import HeroHeading from './ui/HeroHeading.jsx'
import HeaderImg from './ui/HeaderImg.jsx'

export default function Hero() {
  return (
    <div className='w-screen h-screen flex justify-center items-center bg-[#F8FAFC]'>
        <div className='container '>
    <div className='flex'>
        <div className='w-[50%] h-auto'>
            <HeroText/>
            <HeroHeading/>
            <Input/>
            <QuickFea/>
            <SocialReview/>
        </div>
       

    <div className='w-[50%]'>
    <HeaderImg/>
    </div>
   </div>
   
   
    </div>
    </div>
  )
}

