"use client"
import React from 'react'
import Navbar from './Components/Navbar'

function Layout({ children }) {
    return (
        <div>
            {/* <Navbar /> */}
            {children}
        </div>
    )
}

export default Layout