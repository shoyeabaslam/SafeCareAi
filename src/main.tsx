import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import Navbar from './components/Navbar'
import { Toaster } from 'react-hot-toast'
import Footer from './components/Footer'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Navbar/>
    <App/>
    <Toaster
     position="top-right"
     toastOptions={{
      className: '',
      style: {
        border: '1px solid #713200',
        color: '#713200',
      },
    }}
    />
    <Footer/>
  </React.StrictMode>,
)
