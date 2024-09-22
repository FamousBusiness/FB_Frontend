"use client";
import { Card, Row, Col, Space, Rate, Flex, Button, Typography } from 'antd';
import React from 'react';
import { FaRupeeSign } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const { Text, Paragraph } = Typography;

const Software = ({ item }) => {
  const router = useRouter();
  return (
    <Card hoverable onClick={() => router.push(`/payment/checkout/${item.product_id}`)} style={{ borderWidth: 0.5, borderColor: "gray" }}>
      <Row justify='center' gutter={[0, 8]}>
        <Col>
          <Image width={220} height={220} src={item.image_url} alt={item.name} />
        </Col>
        <Col span={24}>
          <Text className="text-base font-bold text-black uppercase" ellipsis={{ tooltip: item.product_name }}>
            {item.product_name}
          </Text>
        </Col>
        <Col span={24}>
          <Space size={5} direction='horizontal' align='center'>
            <Rate
              className='text-green-600 text-2xl'// Apply inline styles
              style={{ color: 'green' }}
              character="★"
              value={4}
              disabled />
            {/* <Paragraph className="font-light">(10088) Rating</Paragraph> */}
          </Space>
        </Col>
        <Col span={24}>
          <Flex justify='flex-end' align='center' gap={5} >
            <FaRupeeSign className="text-sm text-zinc-800" />
            {item.price}
            <Text delete> M.R.P: ₹ {(item.price + (item.price / item.offer)).toFixed()}</Text>
          </Flex>
        </Col>
        <Col span={16}>
          <Button onClick={() => router.push(`/payment/checkout/${item.product_id}`)} size='large' shape='round' style={{ background: "green", color: 'white', fontWeight: 600 }} className=' text-white font-semibold bg-green-400' block>Buy Now</Button>
        </Col>
      </Row>
    </Card>

  );
};

export default Software;
