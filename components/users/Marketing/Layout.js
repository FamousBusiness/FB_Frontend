import React from 'react'
import { PlusOutlined } from '@ant-design/icons';
import { Layout, Row, Col, Button } from 'antd';
import { useRouter, useSearchParams } from 'next/navigation';
const { Header, Content } = Layout;


function LayoutMarket({ children }) {
    const router = useRouter();
    const Search = useSearchParams();
    const value = Search.get('search');
    console.log(value);
    return (
        <Layout
            style={{ background: '#FFF8F2', }}>
            <Layout>
                <Header style={{ background: '#FFF8F2', padding: 5 }}>
                    <Row justify='space-between' align='middle'>
                        <Col xs={8} sm={8} xxl={0} md={8} ><p className=' text-sm font-bold font-serif '>Marketing Dashboard</p></Col>
                        <Col xs={0} sm={0} xxl={8} md={0} ><p className=' text-xl font-bold font-serif '>Marketing Dashboard</p></Col>
                        <Col><Button style={{ background: 'green', color: 'white' }} onClick={() => router.push('/ads')} icon={<PlusOutlined />} size='large'>{value == 'bulkmsg' ? "Bulk Messenger" : `Post ${value}`}</Button></Col>
                    </Row>
                </Header>
                <Content style={{ margin: '24px 16px 0', }}>
                    <div style={{ padding: 2, minHeight: 100, }}>
                        {children}
                    </div>
                </Content>
            </Layout>
        </Layout>
    )
}

export default LayoutMarket