"use client";
import React, { useState } from 'react';
import { Table, Button, Divider, Space, Row, Col, Switch } from 'antd';
import Card1 from '@/components/admin/Card';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
const columns = [
  {
    title: 'Page Name',
    dataIndex: 'name',
    width:'10%',
    render: (text) => <Link href='#'>{text}</Link>,
  },
  {
    title: 'Category',
    dataIndex: 'age',
  },
  {
    title: 'State',
    dataIndex: 'address',
  },
  {
    title: 'City',
    dataIndex: 'name',
  },
  {
    title: 'Pin',
    dataIndex: 'age',
  },
  {
    title: 'Mobile',
    dataIndex: 'address',
  },
  {
    title: 'Email',
    dataIndex: 'name',
  },
  {
    title: 'Website',
    dataIndex: 'age',
  },
  {
    title: 'Whatsapp',
    dataIndex: 'address',
  },
  {
    title: 'Business Info',
    dataIndex: 'name',
    width:'10%'
  },
  {
    title: 'Premium Plan',
    dataIndex: 'age',
    width:'10%'
  },
  {
    title: 'Action',
    dataIndex: 'operation',
    render: () => <Switch
    checkedChildren={<CheckOutlined />}
    unCheckedChildren={<CloseOutlined />}
    defaultChecked
  />
  }
];
const data = [];
for (let i = 0; i < 46; i++) {
  data.push({
    key: i,
    name: `Edward King ${i}`,
    age: 32,
    address: `London, Park Lane no. ${i}`,
  });
}
const ListManage = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const router = useRouter();
  const onSelectChange = (newSelectedRowKeys) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const customCellStyle = {
    border: '0.5px solid blue',
  };
  const rowSelection = {
    
    selectedRowKeys,
    onChange: onSelectChange,
    // onCell: (records) => ({
    //   style: customCellStyle, // Apply the custom CSS class
    // }),
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
      {
        key: 'odd',
        text: 'Select Odd Row',
        onSelect: (changeableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return false;
            }
            return true;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
      {
        key: 'even',
        text: 'Select Even Row',
        onSelect: (changeableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return true;
            }
            return false;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
    ],
  };
  return (
  <div style={{ padding: 20 }}>
      <Row style={{ marginBottom: 10 }} gutter={[16, 16]}>
        <Col span={24}>
          <Row justify='end' align='middle' gutter={16}>
            <Col><Button size='large' type='primary'>Category</Button></Col>
            <Col><Button size='large' onClick={()=>router.push('/admin/listing/listmanagement/bulkupload')} style={{ backgroundColor: 'purple', color: 'white' }} >Bulk upload Listing</Button></Col>
            <Col><Button size='large' onClick={()=>router.push('/admin/listing/listmanagement/addnewlist')} style={{ backgroundColor: 'purple', color: 'white' }}>Add new list</Button></Col>
          </Row>
        </Col>
        <Col span={8}><Card1 /></Col>
        <Col span={8}><Card1 /></Col>
        <Col span={8}><Card1 /></Col>
      </Row>
      <Table scroll={{
      x: 1300,
    }}
    bordered={true}
    columns={columns.map((column) => ({
      ...column,
      onCell: (record) => ({
       // Apply the custom CSS class
      }),
    }))}
    rowSelection={rowSelection}  dataSource={data} />
      <Row>
        <Col span={21}>

          <Space size={5}>
            <Button size='large'>Text Button</Button>
            <Divider type='vertical' />
            <Button type='link' size='large' >Text Button</Button>
            <Divider type='vertical' />
            <Button type='link' size='large' >Delete</Button>
          </Space>

        </Col>
        <Col span={2}>

        </Col>
      </Row>
    </div>);
};
export default ListManage;