import React from 'react'
export default function Button({action, style, name}){
    return(
        <button onClick={action} className={`px-4 py-2 cursor-pointer bg-[#F43F72] rounded-lg text-white shadow-lg shadow-pink-700 outline-none ${style}`}>{name}</button>
    )
}