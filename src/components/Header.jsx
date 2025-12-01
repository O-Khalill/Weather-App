import React, { useState, useEffect } from 'react'

const Header = () => {
  const [currentFact, setCurrentFact] = useState(0);



  useEffect(()=>{
    
  })
  return (
    <>
      <div className='text-center flex flex-row justify-between items-center gap-2 text-white text-sm font-bold bg-gray-600 mx-2 my-1 p-2 rounded-xl'>
        
     
        <div className='bg-[url("./src/images/logo.png")] bg-cover bg-center w-8 h-8 sm:w-10 sm:h-10 lg:w-16 lg:h-16 shrink-0'>
        </div>

     
        <p className='text-center text-xs sm:text-sm lg:text-base px-1 max-w-xs sm:max-w-2xl truncate'>
          <span>Fun fact here</span>
        </p>

       
       
        
      </div>
    </>
  )
}

export default Header