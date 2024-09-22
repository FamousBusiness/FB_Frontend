"use client"
import Address from '@/components/users/editpage/Address'
// import Banner from '@/components/users/home/leads/Banner'
import { Col, Row } from 'antd'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'
import { AiFillEdit } from 'react-icons/ai'
import { BiPlusCircle, BiPlusMedical } from 'react-icons/bi'
import { CiShop } from "react-icons/ci";

function Page() {

    const router=useRouter();
    return (
        <div className=' min-h-screen relative bg-slate-200'>
            <Address/>
        </div>
    )
}

export default Page