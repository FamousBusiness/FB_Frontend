

import { get_category_by_id } from '@/services/Admin/category'
import { Skeleton } from 'antd'
import React from 'react'
import useSWR from 'swr'

function GetCategory({ business }) {
  // console.log(business);

  const { data, error } = useSWR(business.category, get_category_by_id)
  if (!data) {
    return <><Skeleton.Button active block/></>
  }

  if (error) return <div >Fetching data error</div>
  return (
    <div className=' text-base font-semibold'>
      {data}
    </div>
  )
}

export default GetCategory