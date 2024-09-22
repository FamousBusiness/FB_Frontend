import Back from '@/components/admin/CommonBackHeader/Back'
import React from 'react'

function layout({children}) {
  return (
    <div>
        <Back/>
        {children}
       
        </div>
  )
}

export default layout