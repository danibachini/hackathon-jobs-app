import React from 'react'
import Navbar from "./components/Navbar/Navbar.jsx"
import Footer from './components/Footer/Footer.jsx'

export default function Layout({children}) {
  return (
    <>
        <Navbar/>
        {children}
        <Footer/>
    </>
  )
}
