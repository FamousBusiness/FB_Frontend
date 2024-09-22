"use client";
import { ArrowLeftOutlined } from '@ant-design/icons'
import { Button, Modal, Result } from 'antd'
import { useRouter } from 'next/navigation';
import React from 'react'

function ResultModal({ icon, title, open }) {
    const router = useRouter()
    return (
        <Modal footer={null} cancelButtonProps={null} open={open} centered >

            <Result
                icon={icon}
                title={title}
                extra={<Button onClick={() => router.back()} type="primary" icon={<ArrowLeftOutlined />}>Back</Button>}
            />
        </Modal>
    )
}

export default ResultModal