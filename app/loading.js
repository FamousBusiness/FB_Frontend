"use client"
import { LoadingOutlined } from '@ant-design/icons'
import { Spin } from 'antd'
import React from 'react'




function Loading() {
    return (
        <div className=' flex justify-center min-h-screen items-center'>
            <Spin indicator={<LoadingOutlined spin className=' text-xl bg-white rounded-full shadow-md' />} />
        </div>
    )



}

export default Loading