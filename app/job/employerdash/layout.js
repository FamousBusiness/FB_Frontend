"use client";
import Layout1 from '@/components/users/Jobs/Layoutof'
import { useAuth } from '@/context/AuthContext';
import { redirect } from 'next/navigation';
import React from 'react'

function Layout({ children }) {
    const { authTokens } = useAuth()

    if (!authTokens) {
        redirect('/login');
    }

    return (
        <Layout1>{children}</Layout1>
    )
}

export default Layout;
