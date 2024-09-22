import { get_brads_logo } from '@/services/Admin/products'
import { Skeleton } from 'antd'
import React from 'react'
import useSWR from 'swr'

const  fetcher=async(id)=>{
    const res= await get_brads_logo(id)
    return res
}

function BrandIcon({id}) {
        const {data,error}=useSWR(id,fetcher)

        if(!data){
            return <Skeleton.Input block={true} />
        }

        if(error){
            return <div>error fetching data</div>
        }
  return (
    <div>
      {data.Brand_Data}
    </div>
  )
}

export default BrandIcon
