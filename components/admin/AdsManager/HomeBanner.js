// pages/admin/banners.js
"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Carousel, Row, Col, Input, Upload, Button, List, Table, Space, Popconfirm } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import Link from 'next/link';

function BannerManagement() {
    const [newCateBanner, setNewCateBanner] = useState({
        title: '',
        location: '',
        category: '',
        file: [],
    });
    const [catBanner, setCateBanner] = useState([]);
    const [banners, setBanners] = useState([]);
    const [newBanner, setNewBanner] = useState({
        title: '',
        location: '',
        file: null,
    });

    const fetchBanners = async () => {
        try {
            const response = await axios.get('/api/banners');
            setBanners(response.data);
        } catch (error) {
            console.error('Error fetching banners', error);
        }
    };

    // useEffect(() => {
    //     fetchBanners();
    // }, []);

    const handleFileChange = (file) => {
        setNewBanner({ ...newBanner, file });
    };

    const handleInputChange = (e) => {
        setNewBanner({ ...newBanner, [e.target.name]: e.target.value });
    };

    const handleOnChangeBanner = (e) => {
        setNewCateBanner({ ...newCateBanner, [e.target.name]: e.target.value });
    };

    const handleUpload = async () => {
        const formData = new FormData();
        formData.append('title', newBanner.title);
        formData.append('location', newBanner.location);
        formData.append('file', newBanner.file);

        // try {
        //     await axios.post('/api/banners', formData, {
        //         headers: {
        //             'Content-Type': 'multipart/form-data',
        //         },
        //     });
        //     fetchBanners();
        //     setNewBanner({ title: '', location: '', file: null });
        // } catch (error) {
        //     console.error('Error uploading banner', error);
        // }
    };



    const columns = [
        {
            title: 'Business Name',
            dataIndex: 'name',
            width: 150,
        },
        {
            title: 'Posted On',
            dataIndex: 'posted_on',
            width: 150,
        },
        {
            title: 'Valid Till',
            dataIndex: 'valid_till',

        },
        {
            title: 'Category',
            dataIndex: 'category',
        },
        {
            title: 'Location',
            dataIndex: 'address',
        },
        {
            title: 'Action',
            key: 'operation',
            fixed: 'right',
            width: 160,
            render: () => <>
                <Space size={10} direction='horizontal'>
                    <Popconfirm title="Sure to Pause Banner" onConfirm={() => console.log('Pause')}>
                        <a>Pause</a>
                    </Popconfirm>
                    <Popconfirm title='Sure to publish' onConfirm={() => console.log('Publish')}>
                        <a>Publish</a>
                    </Popconfirm>
                    <Popconfirm title='Sure to Delete' onConfirm={() => console.log('Delete')}>
                        <a>Delete</a>
                    </Popconfirm>
                </Space></>,

        }

    ];
    const data = [];
    const today = new Date();
    const istOffset = 330; // IST offset in minutes (Indian Standard Time is UTC+5:30)

    for (let i = 1; i <= 10; i++) {
        const validTill = new Date(today);
        validTill.setMinutes(today.getMinutes() + istOffset + 10 * 24 * 60); // Add 10 days in minutes

        data.push({
            key: i,
            name: (
                <Link href={`/user/${i}`}>{`Edward King ${i}`}</Link> // Replace with the actual user link
            ),
            posted_on: today.toISOString(),
            valid_till: validTill.toISOString(),
            category: 'Real Estate',
            address: `London, Park Lane no. ${i}`,
        });
    }




    const expectedWidth = 570;
  const expectedHeight = 290;

  const handleBeforeUpload = (file) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = URL.createObjectURL(file);

      img.onload = () => {
        if (img.width === expectedWidth && img.height === expectedHeight) {
          resolve(file); // File has the expected dimensions, allow upload
        } else {
          message.error('Image dimensions must be 570px x 290px.');
          reject(); // File doesn't have the expected dimensions, reject upload
        }
      };
    });
  };

    return (
        <div>
            <div className=' text-2xl '>Home Page Banner</div>
            <hr className=' my-2 w-1/3' />
            <h1 className=' my-3'>Banner Management</h1>
            <Row gutter={[16, 16]}>
                <Col span={6}>
                    <Input
                        type="text"
                        name="title"
                        placeholder="Banner Title"
                        value={newBanner.title}
                        onChange={handleInputChange}
                    />
                </Col>
                <Col span={6}>
                    <Input
                        type="text"
                        name="location"
                        placeholder="Location"
                        value={newBanner.location}
                        onChange={handleInputChange}
                    />
                </Col>
                <Col span={6}>
                    <Upload
                        multiple
                        maxCount={10}
                        action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                        customRequest={({ onSuccess }) => onSuccess('ok', newBanner.file)}
                        showUploadList={false}
                        beforeUpload={handleBeforeUpload}
                        onChange={(info) => handleFileChange(info.file)}
                    >
                        <Button icon={<UploadOutlined />}>Upload Banner</Button>
                    </Upload>
                    <h4 className=' py-2 text-gray-400'>must size : 570px*290px</h4>
                </Col>
                <Col span={6}>
                    <Button type="primary" onClick={handleUpload}>
                        Submit
                    </Button>
                </Col>
            </Row>

            <h2 className=' my-3'>Current Banners:</h2>
            <Carousel autoplay>
                {/* {banners.map((banner) => (
                    <div key={banner.id}>
                        <img src={banner.file} alt={banner.title} style={{ width: '100%' }} />
                    </div>
                ))} */}
            </Carousel>
            <List
                itemLayout="horizontal"
                dataSource={banners}
                renderItem={(banner) => (
                    <List.Item>
                        <List.Item.Meta
                            title={banner.title}
                            description={banner.location}
                        />
                    </List.Item>
                )}
            />

            <div className=' text-2xl my-3'>Category Page Banner</div>
            <h1 className=' my-3'>Main Banner</h1>

            <Row gutter={[16, 16]}>
                <Col span={6}>
                    <Input placeholder='Title'
                        value={newCateBanner.title}
                        name='title'
                        type='text'
                        onChange={handleOnChangeBanner} />
                </Col>
                <Col span={6}>
                    <Input placeholder='Category'
                        value={newCateBanner.category}
                        name='category'
                        type='text'
                        onChange={handleOnChangeBanner} />
                </Col>
                <Col span={6}>
                    <Input placeholder='Location'
                        value={newCateBanner.location}
                        name='location'
                        type='text'
                        onChange={handleOnChangeBanner} />
                </Col>
                <Col>
                    <Upload
                    
                        multiple
                        maxCount={1}
                        action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                        customRequest={({ onSuccess }) => onSuccess('ok', newCateBanner.file)}
                        showUploadList={false}
                    // onChange={(info) => handleFileChange(info.file)}
                    >
                        <Button icon={<UploadOutlined />}>Upload Banner</Button>
                    </Upload>
                    <h4 className=' py-2 text-gray-400'>must size : 840px*250px</h4>

                </Col>
                <Col>
                    <Button type='primary' >Submit</Button>
                </Col>
                <Col span={24}>
                    <h1>Left Banner</h1>
                </Col>
                <Col span={6}>
                    <Input placeholder='Title'
                        value={newCateBanner.title}
                        name='title'
                        type='text'
                        onChange={handleOnChangeBanner} />
                </Col>
                <Col span={6}>
                    <Input placeholder='Category'
                        value={newCateBanner.category}
                        name='category'
                        type='text'
                        onChange={handleOnChangeBanner} />
                </Col>
                <Col span={6}>
                    <Input placeholder='Location'
                        value={newCateBanner.location}
                        name='location'
                        type='text'
                        onChange={handleOnChangeBanner} />
                </Col>
                <Col>
                    <Upload
                        multiple
                        maxCount={1}
                        action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                        customRequest={({ onSuccess }) => onSuccess('ok', newCateBanner.file)}
                        showUploadList={false}
                    // onChange={(info) => handleFileChange(info.file)}
                    >
                        <Button icon={<UploadOutlined />}>Upload Banner</Button>
                    </Upload>
                    <h4 className=' py-2 text-gray-400'>must size : 190px*250px</h4>

                </Col>
                <Col>
                    <Button type='primary' >Submit</Button>
                </Col>
                <Col span={24}>
                    <h1>Right Banner</h1>
                </Col>
                <Col span={6}>
                    <Input placeholder='Title'
                        value={newCateBanner.title}
                        name='title'
                        type='text'
                        onChange={handleOnChangeBanner} />
                </Col>
                <Col span={6}>
                    <Input placeholder='Category'
                        value={newCateBanner.category}
                        name='category'
                        type='text'
                        onChange={handleOnChangeBanner} />
                </Col>
                <Col span={6}>
                    <Input placeholder='Location'
                        value={newCateBanner.location}
                        name='location'
                        type='text'
                        onChange={handleOnChangeBanner} />
                </Col>
                <Col>
                    <Upload
                        multiple
                        maxCount={1}
                        action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                        customRequest={({ onSuccess }) => onSuccess('ok', newCateBanner.file)}
                        showUploadList={false}
                    // onChange={(info) => handleFileChange(info.file)}
                    >
                        <Button icon={<UploadOutlined />}>Upload Banner</Button>
                    </Upload>
                    <h4 className=' py-2 text-gray-400'>must size : 190px*250px</h4>

                </Col>
                <Col>
                    <Button type='primary' >Submit</Button>
                </Col>

                <Col span={24}>
                    <Table
                        bordered={true}
                        columns={columns}
                        dataSource={data}
                        pagination={{
                            pageSize: 50,
                        }}
                        scroll={{
                            y: 240,
                        }}
                    />

                </Col>
            </Row>

        </div>
    );
}

export default BannerManagement;



