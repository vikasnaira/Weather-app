import React from 'react'
import { GoSearch } from "react-icons/go";

const Input = ({input , setinput , onClick}) => {
  return (
      <div className="input flex gap-3">
        <input
         type="text" 
         placeholder='Enter Location'
         className='w-full px-2 placeholder:text-white text-white rounded-2xl bg-white/20 backdrop-blur-sm border border-gray-400 shadow shadow-black' 
         value={input}
         onChange={(e) => setinput(e.target.value)}
         />
        <button className='bg-white/40 text-white rounded-full text-2xl p-2 shadow shadow-black border border-gray-300 cursor-pointer' onClick={onClick}><GoSearch /></button>
      </div>
  )
}

export default Input
