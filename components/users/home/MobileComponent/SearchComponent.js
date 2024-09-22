import { SearchOutlined } from '@ant-design/icons'
import { Drawer } from 'antd'
import { usePathname } from 'next/navigation'
import React, { useState } from 'react'
import AutoCom from '../../AutoComplete'

function SearchComponent() {
    const [open, setOpen] = useState(false)
    const pathname = usePathname()
    return (
        <>
            <button onClick={() => setOpen(true)} type="button" className={`inline-flex ${pathname === '/search' && 'bg-orange-100'} rounded-md flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group`}>
                <SearchOutlined className=' text-xl text-green-500' />
                <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">Search</span>
            </button>
            <Drawer onClose={() => setOpen(false)} open={open} width='100%' placement='right'>
                <AutoCom />
            </Drawer>
        </>
    )
}

export default SearchComponent