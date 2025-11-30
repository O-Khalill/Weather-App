import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Toaster } from 'react-hot-toast'


import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <Toaster 
        position="top-center"
        toastOptions={{
          duration: 1250,
          style: {
            background: '#363636',
            color: '#fff',
          }, 
        }}
      />
    <App />
  </StrictMode>,
)
