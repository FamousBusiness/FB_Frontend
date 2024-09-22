import { Spin } from 'antd'
import React from 'react'

function loading() {
  return (
    <div className='p-80 flex-1 text-center'>
    <Spin size='large'/>
    </div>
  )
}

export default loading