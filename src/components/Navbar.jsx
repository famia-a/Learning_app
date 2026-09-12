import react from 'react' 
import { HugeiconsIcon } from '@hugeicons/react';
import { UserCircleIcon } from '@hugeicons/core-free-icons';

export default function Navbar(){
    return(
        <nav className='bg-[#F8FAFC] py-4 px-4  flex justify-between items-center '>
            <div className='text-2xl text-[#F43F72] font-bold'>LearnFlow</div>
            <div className="flex justify-evenly  px-4 gap-2 py-2">
            <button className='rounded-lg hover:bg-gray-100 px-3 py-2'>Features</button>
            <button className='rounded-lg hover:bg-gray-100 px-3 py-2 '>How It Works</button>
            <button className='rounded-lg hover:bg-gray-100 px-3 py-2'>Quizzes</button>
            <button className='rounded-lg hover:bg-gray-100 px-3 py-2'>FAQ's</button>
            <button className='rounded-lg hover:bg-gray-100 px-3 text-[#F43F72] flex gap-2 items-center py-2'> <HugeiconsIcon icon={UserCircleIcon} />Log in</button>
            <button className='rounded-lg hover:bg-gray-200 border border-[#F43F72] px-3 py-2 text-[#F43F72]' >Start Learning</button>
            </div>
        </nav>
    )
}