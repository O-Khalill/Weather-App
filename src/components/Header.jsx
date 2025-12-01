import React, { useState, useEffect } from 'react'

const Header = () => {
 const [facts, setFacts] = useState([]);
 const [fact, setFact] = useState("");




    useEffect(() => {
    fetch("src/dbs/facts.json")
      .then(res => res.json())
      .then(data => {
        setFacts(data.funFacts);
        const randomFact = Math.floor(Math.random() * data.funFacts.length);
        setFact(data.funFacts[randomFact].text);
      });
      
     

  }, []);



  const getRandomFact = () => {
    if (facts.length === 0) return;
    const randomIndex = Math.floor(Math.random() * facts.length);
    setFact(facts[randomIndex].text);
  };

 
  return (
    <>
     <div className="flex items-center bg-gray-600 text-white mx-2 my-1 p-2 rounded-xl w-full overflow-hidden min-h-[50px]">

     
      <div className='bg-[url("./src/images/logo.png")] bg-cover bg-center w-8 h-8 sm:w-10 sm:h-10 lg:w-16 lg:h-16 shrink-0'></div>

    
      <div className="flex-1 px-2 min-w-0 text-center">
        <p className="text-xs sm:text-sm lg:text-base font-semibold break-words">
          {fact || "Loading fact..."}
        </p>
      </div>

    </div>

    </>
  )
}

export default Header