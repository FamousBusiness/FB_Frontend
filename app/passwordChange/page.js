"use client"
import React, { useEffect } from 'react'
import ChangePass from './component/passwordChange'
import { Col, Row } from 'antd'
import Back from '@/components/admin/CommonBackHeader/Back'
import { useRouter } from 'next/navigation'
import { IoIosArrowBack } from 'react-icons/io'
import { useAuth } from '@/context/AuthContext'

function Page() {
    const router = useRouter()
    const { user } = useAuth()


    useEffect(() => {
        if (!user) {
            router.push('/')
        }
    }, [user, router])

    return (
        <div className=' sm:p-10'>
            {user ? <Row justify='center' gutter={[0, 32]} align='middle'>
                <Col span={24}>
                    <Row gutter={8} align='middle'>
                        <Col >
                            <IoIosArrowBack onClick={() => router.back()} className='text-2xl sm:text-4xl hover:-translate-x-1 duration-100 cursor-pointer hover:bg-white hover:rounded-full hover:p-1 ' />
                        </Col>
                        <Col>

                        </Col>
                    </Row>
                </Col>
                <Col sm={24} xs={24} lg={12} xxl={12} md={12} xl={12}>
                    <ChangePass />
                </Col>
            </Row> : null}
        </div>
    )
}

export default Page