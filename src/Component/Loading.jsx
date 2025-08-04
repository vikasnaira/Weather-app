import React from 'react'

const Loading = () => {
  return (
    <div className='absolute h-full w-full top-0  '>
<div
  class="h-[86vh] w-[70%] overflow-hidden drop-shadow-2xl"
>
  <div
    class="bg-[#202020]/80 flex items-center p-[20px] text-white relative r"
  >
   
    <div
      class="flex-1 text-center text-white font-semibold text-lg relative animate-pulse"
    >
     
    </div>

    <div class="absolute w-full bottom-0 left-0  h-1 rounded-t-xl">
      <div class="w-[30%] bg-[#00e600] h-full animate-progressBar"></div>
    </div>
  </div>

  <div class="flex bg-[#121212]/50 p-8 justify-center items-center h-[450px]">
    <div class="text-center space-y-6">
      <div
        class="w-24 h-24 border-4 border-t-[#00e600] border-gray-700 rounded-full animate-spin mx-auto"
      ></div>
      <div
        class="text-[#00e600] font-semibold text-4xl opacity-90 animate-fadeIn"
      >
        Almost There...
      </div>
      <div class="text-[#9e9e9e] text-sm opacity-80 animate-fadeIn">
        <p>We're getting everything ready for you...</p>
        <p>Sit tight for just a moment....</p>
      </div>
    </div>
  </div>
</div>

    </div>
  )
}

export default Loading
