"use client";
import { Button, Card, Drawer, List, Tag, Spin } from 'antd';
import Cookies from 'js-cookie';
import React, { useState } from 'react';
import useSWR from 'swr';

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
        return data.results;
    } catch (error) {
        console.error('Error fetching education data:', error);
    }
};

function AppliedCandidate({ job }) {
    const [open, setOpen] = useState(false);
    // const [selectedJob, setSelectedJob] = useState('');

    const { data: jobData, error } = useSWR(`https://api.famousbusiness.in/job-api/application-per-job/?job_post=${job.id}`, fetcher);

    if (error) {
        console.error('Error loading data:', error);
    }

    const handleTagClick = () => {
        // setSelectedJob(job.position);
        setOpen(true);
    };

    return (
        <>
            <Spin spinning={!jobData}>
                <Tag className=' cursor-pointer' color="blue" onClick={handleTagClick}>
                    {jobData && jobData.length} applied
                </Tag>
            </Spin>

            <Drawer
                title={job && `Applied Candidates for ${job.position}`}
                open={open}
                onClose={() => setOpen(false)}
                footer={[
                    <Button key="back" onClick={() => setOpen(false)}>
                        Close
                    </Button>,
                ]}
            >

            </Drawer>
        </>
    );
}

export default AppliedCandidate;
