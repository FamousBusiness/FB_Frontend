
import { DeleteOutlined, DownloadOutlined } from '@ant-design/icons'
import { Card, Col, Flex, Row, Skeleton, Space, Modal, Typography } from 'antd'
import React, { useState } from 'react'
import ResumeUpload from './Upload'
import useSWR from 'swr'
import { IoAddOutline } from 'react-icons/io5'
import Cookies from 'js-cookie'
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
            throw new Error('Failed to fetch data');
        }

        const data = await res.json();
        return data.data;
    } catch (err) {
        console.error(err);
        throw new Error('Error fetching data');
    }
};

function ResumeSec() {

    const { data, error, mutate } = useSWR('https://api.famousbusiness.in/job-api/aspirant-resume/', fetcher);
    const [selectedResumeId, setSelectedResumeId] = useState(null);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);

    if (error) {
        return <div>Error fetching data: {error.message}</div>;
    }

    if (!data) {
        return (<Card className='w-full shadow-xl'>
            <Skeleton active paragraph={{
                rows: 4
            }} />
        </Card>)

    }

    const handleCancelDelete = () => {
        setDeleteModalVisible(false);
    };
    const showDeleteModal = (id) => {
        setSelectedResumeId(id);
        setDeleteModalVisible(true);
    };


    const handleDelete = async () => {
        try {
            if (!selectedResumeId) {
                console.error('No resume selected for deletion.');
                return;
            }

            const deleteUrl = `https://api.famousbusiness.in/job-api/aspirant-resume-delete/${selectedResumeId}/`;

            const res = await fetch(deleteUrl, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${Cookies.get('accessToken')}`
                }
            });

            if (!res.ok) {
                throw new Error('Failed to delete resume');
            }

            // After successful delete, close the modal and refresh the data
            setDeleteModalVisible(false);
            mutate(); // This will trigger a re-fetch of the data
        } catch (error) {
            console.error('Error deleting resume:', error);
        }
    };

    return (
        <Card className=' w-full shadow-xl pb-6'>
            <Row justify='space-between' gutter={[0, 12]}>
                <Col span={24}>
                    <span className=' text-lg font-semibold'>Resume</span>
                </Col>
                <Col span={24}>
                    Resume is the most important document recruiters look for. Recruiters generally do not look at profiles without resumes.
                </Col>
                <Col span={24}>
                    <Flex vertical gap={3}>
                        {data.length > 0 ?
                            data.map((resume, index) => <Flex key={resume.id} justify='space-between' align='center'>
                                <a href={resume.resume} target='_blank'>{`NewResume${index}.pdf`}</a>
                                <Space size={10} direction='horizontal'>
                                    <a href={resume.resume} download={`newResume${index}.pdf`} ><DownloadOutlined className=' text-xl bg-slate-100 rounded-full p-2 hover:text-blue-600 duration-100 cursor-pointer' /></a>
                                    <DeleteOutlined
                                        onClick={() =>
                                            showDeleteModal(resume.id)
                                        }
                                        className='text-xl bg-slate-100 rounded-full p-2 hover:text-blue-600 duration-100 cursor-pointer'
                                    />
                                </Space>
                            </Flex>) : <p className=' text-xl dark:text-gray-300 font-bold text-center'>Please Add your Resume</p>}
                    </Flex>

                </Col>
                <Col span={24}>
                    {data.length > 0 ? <ResumeUpload action={`https://api.famousbusiness.in/job-api/aspirant-resume-update/${data[0].id}/`} refresh={mutate} method='PUT' /> : <ResumeUpload refresh={mutate} action='https://api.famousbusiness.in/job-api/aspirant-resume-create/' method='POST' />}
                </Col>
            </Row>
            <Modal
                title='Confirm Delete'
                open={deleteModalVisible}
                onOk={handleDelete}
                onCancel={handleCancelDelete}
                okText='Confirm'
                cancelText='Cancel'
            >
                <p>
                    Are you sure you want to delete this resume?
                </p>
            </Modal>
        </Card>
    )
}

export default ResumeSec