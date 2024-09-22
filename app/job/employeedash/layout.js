"use client";
import Employeelay from '@/components/users/Jobs/EmployeeDash';
import { useAuth } from '@/context/AuthContext';
import { redirect } from 'next/navigation';
import React from 'react'

function Layout({ children }) {
    const { authTokens } = useAuth()
    if (!authTokens) {
       redirect('/login');
    }

    return (
        <Employeelay>{children}</Employeelay>
    )
}

export default Layout;
