import React from 'react'
import { GoSearch } from "react-icons/go";

const Input = ({input , setinput , onClick}) => {
  return (
    <div className='flex flex-col border-1 gap-2'>
      <div className="input flex gap-3">
        <input
         type="text" 
         placeholder='Enter Location'
         className='w-full px-2 placeholder:text-white' 
         value={input}
         onChange={(e) => setinput(e.target.value)}
         />
        <button className='bg-gray-800 text-gray-400 px-3 py-2 cursor-pointer' onClick={onClick}><GoSearch /></button>
      </div>
    </div>
  )
}

export default Input
