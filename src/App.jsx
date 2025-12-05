import { useState } from 'react'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import  Middle  from './components/Middle.jsx'
import './App.css'




function App() {



  return (
<div className="flex flex-col h-screen m-0 p-2 overflow-hidden justify-center " >
  <Header />


  <div className="flex-1 overflow-hidden  m-0 p-0  " >
    <Middle />
  </div>

  <Footer />
</div>

  )
}

export default App
