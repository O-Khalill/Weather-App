import { useState } from 'react'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import  Middle  from './components/Middle.jsx'
import './App.css'




function App() {



  return (
<div className="flex flex-col h-screen">
  <Header />


  <div className="flex-1 overflow-hidden">
    <Middle />
  </div>

  <Footer />
</div>

  )
}

export default App
