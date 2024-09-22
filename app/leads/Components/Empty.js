import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function EmptyLeads() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
    <div className="h-60 w-60 relative">
        <Image src='/error/empty-file.svg' fill sizes='100%' alt='emplty' className='object-contain w-full' />
    </div>
    <Link href="/">Return Home</Link>
</div>
  )
}

export default EmptyLeads