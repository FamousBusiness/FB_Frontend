"use client"
import { useAuth } from '@/context/AuthContext'
import { redirect } from 'next/navigation'
import React from 'react'

function Layout({ children }) {

    const { authTokens } = useAuth()
    if (!authTokens) {
        redirect('/login')
    }
    return (
        <div>
            {children}
        </div>
    )
}

export default Layout