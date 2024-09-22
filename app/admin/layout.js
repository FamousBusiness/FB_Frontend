"use client";
import AdminLayout from '@/components/admin/AdminLayout'
import { useAuth } from '@/context/AuthContext';
import { redirect } from 'next/navigation';
import React from 'react'

function Layout({ children }) {
  const { authTokens, user } = useAuth()
  // Check if user is logged in and has the required user_id
  if (!authTokens || !user || ![1, 2].includes(user.user_id)) {
    // Redirect to login page
    redirect('/');
  }

  // Render the layout with children components if the user is authenticated
  return (
    <AdminLayout>
      {children}
    </AdminLayout>
  );
}

export default Layout;
