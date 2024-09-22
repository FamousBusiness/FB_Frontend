import { Button, Result } from 'antd'
import Link from 'next/link'
import React from 'react'

const page = () => {
  
  return (
    <div className='flex flex-col min-h-screen justify-between  text-center'>
      <div className=' py-4 bg-white text-start pl-8'>
        <Link className="text-lg sm:text-3xl font-bold" href="/" prefetch scroll={false}>
          <span className=' text-blue-600 dark:text-blue-600'>Famous </span>
          <span className='text-green-700 dark:text-green-700'>Business</span>
        </Link>
      </div>


      <Result status={'success'} title='  You payment has been successfully' extra={<Button type='primary' href='/'>Back To Home</Button>} />

      <div className=' text-center text-lg py-6 bg-slate-200'>
        All rights reserved By Webzotica Business Famous Software Private Limited.
      </div>


    </div>
  )
}

export default page