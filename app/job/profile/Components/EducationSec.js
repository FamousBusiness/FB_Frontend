import React, { useState } from 'react';
import { Card, Button, Table, Space, Form, Input, message, Select, Row, Col, DatePicker, Flex, Skeleton, Modal, notification, Popconfirm } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import Cookies from 'js-cookie';
import useSWR from 'swr';
const { confirm } = Modal;

const fetcher = async (url) => {
    try {
        const res = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${Cookies.get('accessToken')}`
            }
        });
        if (!res.ok) {
            throw new Error('Failed to fetch education data');
        }
        const data = await res.json();
        return data.data;
    } catch (error) {
        console.error('Error fetching education data:', error);
    }
};

const EducationSec = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingEducation, setEditingEducation] = useState(null);
    const [form] = Form.useForm();
    const { data, error, mutate } = useSWR('https://api.famousbusiness.in/job-api/aspirant-education/', fetcher);

    if (error) {
        return <div>Error fetching data: {error.message}</div>;
    }

    if (!data) {
        return (
            <Card className='w-full shadow-xl'>
                <Skeleton active paragraph={{
                    rows: 4
                }} />
            </Card>
        );
    }

    const handleEdit = (record) => {
        setEditingEducation(record);
        form.setFieldsValue({
            education: record.education,
            university: record.university,
            course: record.course,
            // start_year: record.start_year,
            // end_year: record.end_year,
            marks: record.marks,
        });
        setIsModalVisible(true);
    };

    const handleEditOutsideTable = () => {
        setEditingEducation(null);
        form.resetFields();
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setEditingEducation(null);
        form.resetFields();
    };

    const handleCreate = async (values) => {
        try {

            const formattedValues = {
                ...values,
                start_year: values.start_year ? values.start_year.format('YYYY') : null,
                end_year: values.end_year ? values.end_year.format('YYYY') : null,
            };

            const res = await fetch('https://api.famousbusiness.in/job-api/aspirant-education-create/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${Cookies.get('accessToken')}`
                },
                body: JSON.stringify(formattedValues),
            });

            if (res.ok) {
                message.success('Education created successfully');
                setIsModalVisible(false);
                mutate();
            } else {
                throw new Error('Failed to create education');
            }
        } catch (error) {
            console.error('Error creating education:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            const res = await fetch(`https://api.famousbusiness.in/job-api/aspirant-education-delete/${id}/`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${Cookies.get('accessToken')}`
                }
            });

            if (res.ok) {
                message.success('Education deleted successfully');
                mutate(); // Refresh education data after deletion
            } else {
                throw new Error('Failed to delete education');
            }
        } catch (error) {
            console.error('Error deleting education:', error);
        }
    };

    const handleUpdate = async (values) => {
        try {
            const formattedValues = {
                ...values,
                start_year: values.start_year ? values.start_year.format('YYYY') : null,
                end_year: values.end_year ? values.end_year.format('YYYY') : null,
            };
            const res = await fetch(`https://api.famousbusiness.in/job-api/aspirant-education-update/${editingEducation.id}/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${Cookies.get('accessToken')}`,
                },
                body: JSON.stringify(formattedValues),
            });

            if (res.ok) {
                notification.success(
                    {
                        message: 'Education updated successfully',
                        duration: 2000,
                        placement: 'bottomLeft'
                    });
                setIsModalVisible(false);
                setEditingEducation(null); // Reset editing education
                mutate();
            } else {
                throw new Error('Failed to update education');
            }
        } catch (error) {
            console.error('Error updating education:', error);
        }
    };

    const columns = [
        // {
        //     title: 'Education',
        //     dataIndex: 'education',
        //     key: 'education',
        // },
        {
            title: 'University/Institute',
            dataIndex: 'university',
            key: 'university',
        },
        {
            title: 'Course',
            dataIndex: 'course',
            key: 'course',
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <EditOutlined onClick={() => handleEdit(record)} />
                    <Popconfirm
                        title="Are you sure to delete this skill?"
                        onConfirm={() => handleDelete(record.id)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <DeleteOutlined />
                    </Popconfirm>
                </Space>
            ),
        },
    ];


    return (
        <Card className='w-full shadow-xl'>
            <Flex vertical gap={10}>
                <Flex justify='space-between'> <span className=' text-lg font-semibold'>Education</span> <Button onClick={handleEditOutsideTable} type='link' style={{ fontWeight: 600, fontSize: 16 }}>Add education</Button></Flex>
                <Table bordered={false} pagination={false} footer={null} dataSource={data} columns={columns} loading={!data || error} rowKey="id" />

            </Flex>
            <Modal
                footer={null}
                title={editingEducation ? 'Update Education' : 'Add Education'}
                open={isModalVisible}
                onCancel={handleCancel}>
                <Row justify='space-between' gutter={12}>
                    <Col span={24}>
                        <div>
                            <Form
                                form={form}
                                layout='vertical'
                                onFinish={editingEducation ? handleUpdate : handleCreate}>
                                <Row gutter={[16, 16]}>
                                    <Col span={24}>
                                        <Form.Item
                                            label="Education"
                                            name="education"
                                            rules={[{ required: true, message: 'Please select the education' }]}>
                                            <Select placeholder="Select Education">
                                                <Select.Option value="Doctorate/Phd">Phd/Doctorate</Select.Option>
                                                <Select.Option value="Masters/Post-Graduation">Master/Post-Graduation</Select.Option>
                                                <Select.Option value="Graduation/Diploma">Graduation/Diploma</Select.Option>
                                                <Select.Option value="XII">12th</Select.Option>
                                                <Select.Option value="X">10th</Select.Option>
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                    <Col span={24}>
                                        <Form.Item
                                            label="University/Institute"
                                            name="university"
                                            rules={[{ required: true, message: 'Please enter the Institute/University name' }]}>
                                            <Input placeholder='Enter Institute/University Name' />
                                        </Form.Item>
                                    </Col>
                                    <Col span={24}>
                                        <Form.Item
                                            label="Course"
                                            name="course"
                                            rules={[{ required: true, message: 'Please enter the course' }]}>
                                            <Input placeholder='Enter Course name' />
                                        </Form.Item>
                                    </Col>
                                    <Col span={24}>
                                        <Form.Item
                                            label="Course Duration"

                                            rules={[{ required: true }]}
                                            style={{
                                                marginBottom: 0,
                                            }}>
                                            <Form.Item
                                                name="start_year"
                                                style={{
                                                    display: 'inline-block',
                                                    width: 'calc(50% - 12px)',
                                                }} >
                                                <DatePicker picker='year' placeholder='Starting Year' />
                                            </Form.Item>
                                            <span
                                                style={{
                                                    display: 'inline-block',
                                                    width: '24px',
                                                    lineHeight: '32px',
                                                    textAlign: 'center',
                                                }}
                                            >
                                                To
                                            </span>
                                            <Form.Item
                                                name="end_year"
                                                style={{
                                                    display: 'inline-block',
                                                    width: 'calc(50% - 12px)',
                                                }}
                                            >
                                                <DatePicker picker='year' placeholder='End year' />
                                            </Form.Item>
                                        </Form.Item>
                                    </Col>
                                    <Col span={24}>
                                        <Form.Item
                                            label="Marks"
                                            name="marks">
                                            <Input />
                                        </Form.Item>
                                    </Col>
                                    <Col span={24}>
                                        <Form.Item>
                                            <Button size='large' block type="primary" htmlType="submit">
                                                {editingEducation ? 'UPDATE' : 'SAVE'}
                                            </Button>
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Form>
                        </div>
                    </Col>
                </Row>
            </Modal>
        </Card>
    );
};

export default EducationSec;
