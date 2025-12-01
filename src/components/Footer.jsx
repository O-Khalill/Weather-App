import React, { useState,useEffect } from 'react'

const Footer = () => {

  const [quotes, setQuotes] = useState([]);
 const [quote, setQuote] = useState("");
 

useEffect(() => {
    fetch("src/dbs/quotes.json")
      .then(res => res.json())
      .then(data => {
        setQuotes(data.quotes);
        const randomQuote = Math.floor(Math.random() * data.quotes.length);
        setQuote(data.quotes[randomQuote].text);
      });
    },[]);


const getRandomQuote = () => {
    if (quotes.length === 0) return;
    const randomQuote = Math.floor(Math.random() * quotes.length);
    setQuote(quotes[randomQuote].text);
  };

  return (
   <>


    
  <div className="flex items-center justify-center bg-gray-600 text-white mx-2 my-1 p-3 rounded-xl overflow-hidden w-full min-h-[50px]">
  <p className="text-center text-xs sm:text-sm lg:text-base font-semibold px-2 break-words">
    {quote || "Loading quote..."}
  </p>

    </div>


   </>
  )
}

export default Footer