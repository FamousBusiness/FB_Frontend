import { Badge } from 'antd'
import React from 'react'

function StepsCard({ step, title, description }) {
    return (
        <Badge.Ribbon text={step} color='orange' style={{ padding: '10px 20px' }} className='text-lg font-bold'>
            <div className=' w-full border border-1 py-12 px-8 bg-green-600 rounded-md h-full'>
                <div className=' text-2xl font-semibold flex flex-row text-white text-center items-center'>
                    {title}
                </div>
                <div className=' text-lg text-white'>
                    {description}
                </div>

            </div>
        </Badge.Ribbon>
    )
}

export default StepsCard