import React, { useState, useEffect } from 'react';
import { Card, Space, Modal, Form, Input, Button, message, Table, Popconfirm, Skeleton, Select, Row, Col, Flex } from 'antd';
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
            throw new Error('Failed to fetch skills');
        }

        const data = await res.json();
        return data.data;
    } catch (error) {
        console.error('Error fetching skills:', error);
    }
};


const SkillSec = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingSkill, setEditingSkill] = useState(null);
    const [form] = Form.useForm();

    const { data, error, mutate } = useSWR('https://api.famousbusiness.in/job-api/aspirant-skillset/', fetcher)

    const handleEdit = (record) => {

        console.log(record);
        setEditingSkill(record); // Set the skill being edited
        form.setFieldsValue({
            skill_name: record.skill_name,
            skill_level: record.skill_level,
        });
        setIsModalVisible(true);
    };

    const handleEditOutsideTable = () => {
        setEditingSkill(null);
        form.resetFields();
        setIsModalVisible(true);
    };



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

    const handleCancel = () => {
        setIsModalVisible(false);
        setEditingSkill(null); // Reset editingSkill when the modal is closed
        form.resetFields(); // Reset form fields
    };
    const handleCreate = async (values) => {
        try {
            const res = await fetch('https://api.famousbusiness.in/job-api/aspirant-skillset-create/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${Cookies.get('accessToken')}`
                },
                body: JSON.stringify(values),
            });

            if (!res.ok) {
                throw new Error('Failed to create skill');
            }

            message.success('Skill created successfully');
            setIsModalVisible(false);
            mutate();
        } catch (error) {
            console.error('Error creating skill:', error);
        }
    };

    const columns = [
        {
            title: 'Skill Name',
            dataIndex: 'skill_name',
            key: 'skill_name',
        },
        {
            title: 'Skill Level',
            dataIndex: 'skill_level',
            key: 'skill_level',
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

    const handleDelete = async (id) => {
        try {
            const res = await fetch(`https://api.famousbusiness.in/job-api/aspirant-skillset-delete/${id}/`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${Cookies.get('accessToken')}`
                }
            });

            if (!res.ok) {
                throw new Error('Failed to delete skill');
            }

            message.success('Skill deleted successfully');
            mutate(); // Refresh skills after deletion
        } catch (error) {
            console.error('Error deleting skill:', error);
        }
    };


    const handleUpdate = async (values) => {
        try {
            const res = await fetch(`https://api.famousbusiness.in/job-api/aspirant-skillset-update/${editingSkill.id}/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${Cookies.get('accessToken')}`,
                },
                body: JSON.stringify(values),
            });

            if (!res.ok) {
                throw new Error('Failed to update skill');
            }

            message.success('Skill updated successfully');
            setIsModalVisible(false);
            setEditingSkill(null); // Reset editing skill
            mutate();
        } catch (error) {
            console.error('Error updating skill:', error);
        }
    };

    return (
        <Card className='w-full shadow-xl'>
            <Flex vertical gap={10}>
                <Space direction='horizontal' size={5}>
                    <span className='text-lg font-semibold'>Key Skills</span>
                    <EditOutlined className='text-xl hover:text-2xl duration-100' onClick={handleEditOutsideTable} />
                </Space>
                <Table bordered={false} pagination={false} footer={null} dataSource={data} columns={columns} rowKey="id" />
            </Flex>
            <Modal
                centered
                title={editingSkill ? 'Edit Skill' : 'Add Skill'} // Change the modal title based on edit or add
                open={isModalVisible}
                onCancel={handleCancel}
                footer={null}
            >
                <Form
                    layout='vertical'
                    form={form}
                    onFinish={editingSkill ? handleUpdate : handleCreate} // Use handleUpdate for editing
                >
                    <Row justify='center' gutter={[0, 12]}>

                        <Col span={24}>
                            <Form.Item
                                label="Skill Name"
                                name="skill_name"
                                rules={[{ required: true, message: 'Please enter the skill name' }]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item
                                label="Skill Level"
                                name="skill_level"
                                rules={[{ required: true, message: 'Please enter the skill level' }]}
                            >
                                <Select placeholder="Select Skill Level" style={{ width: '100%', marginTop: '16px' }}>
                                    <Select.Option value="beginner">Beginner</Select.Option>
                                    <Select.Option value="intermediate">Intermediate</Select.Option>
                                    <Select.Option value="advanced">Advanced</Select.Option>
                                    <Select.Option value="expert">Expert</Select.Option>
                                </Select>
                            </Form.Item>

                        </Col>
                        <Col span={24}>
                            <Form.Item>
                                <Button size='large' block type="primary" htmlType="submit">
                                    {editingSkill ? 'UPDATE' : 'SAVE'} {/* Change button text based on edit or add */}
                                </Button>
                            </Form.Item>
                        </Col>

                    </Row>
                </Form>
            </Modal>
        </Card>
    );
};

export default SkillSec;
