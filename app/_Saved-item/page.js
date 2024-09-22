"use client";
import PrivateRoute from '@/utils/PrivateRoute';
import React from 'react'

function Page() {
  return PrivateRoute(
    <div>Saved</div>
  )
}

export default Page