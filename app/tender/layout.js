"use client";
import Back from '@/components/admin/CommonBackHeader/Back'
import Image from 'next/image';
import React from 'react'

function Layout({children}) {
  const maintnance=true;
  return (<>
    {maintnance?<div>
    <Back/>
        {children}
    </div>:
    <div className=' min-h-screen flex justify-center items-center'>
    <Image src={'/coming-soon.svg'} width={500} height={500} alt='' />
    </div>}
    </>
  )
}

export default Layout