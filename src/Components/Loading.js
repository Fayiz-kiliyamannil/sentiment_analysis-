import React from 'react'

function Loading() {
  return (
    <div>
      <div id='spinner' >
    <div className="absolute right-1/2 bottom-1/2 h-screen w-screen bg-white bg-opacity-10 flex justify-center items-center transform translate-x-1/2 translate-y-1/2">
      <div className="border-t-transparent border-solid animate-spin rounded-full border-purple-700 border-4 w-[40px] h-[40px]"></div>
    </div>

</div>
    </div>
  )
}

export default Loading
