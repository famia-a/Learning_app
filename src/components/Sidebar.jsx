import react from 'react'
export default function Sidebar(){
    return(
<div className='flex flex-col justify-evenly w-50 h-full'>
    <div className='text-2xl text-[#F43F72] font-bold'>LearnFlow</div>
    <div className='flex flex-col'>
    <button className='rounded-lg hover:bg-gray-100 px-3 '>Your History</button>
    <button className='rounded-lg hover:bg-gray-100 px-3 '>Channels info</button>
    <button className='rounded-lg hover:bg-gray-100 px-3 '>Export into CVC</button>
    <button className='rounded-lg hover:bg-gray-100 px-3 '>FAQ's</button>
    </div>
    <div className='flex flex-col'>
    <button className='rounded-lg hover:bg-gray-100 px-3 '>Theme</button>
    <button className='rounded-lg hover:bg-gray-100 px-3 '>Account</button>  
    </div>
</div>
    )
}