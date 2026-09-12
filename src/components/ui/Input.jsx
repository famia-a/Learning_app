import Button from './Button'
export default function Input(){
    return(
        <form className='mx-4 '>
        <h2 className='text-m pt-2'>What do you want to learn today?</h2>
        <input className='w-[60%] mr-2 px-6 py-2.5 border rounded-lg border-[#F43F72] outline-none' type='text' placeholder='Paste a YouTube video URL...' />
        <Button name='Start Learning' style='shadow-none text-lg'/>
        </form>
    )
}