"use client"
import React from 'react';
import { Card, Menu } from 'antd';
const Quicklink = ({ handleClick }) => {
    const just = (e) => {
        handleClick(e.key);
    };

    return (
        <Card>
            <p className=' mb-6 text-xl font-semibold'>Quick Links</p>
            <Menu onClick={just} mode='vertical'>
                <Menu.Item key='resumeUpdate'>Resume Update</Menu.Item>
                {/* <Menu.Item key='resumeHeadline'>Resume Headline</Menu.Item> */}
                <Menu.Item key='keySkills'>Key Skills</Menu.Item>
                <Menu.Item key='addEmployment'>Employment </Menu.Item>
                <Menu.Item key='addEducation'>Education </Menu.Item>
                {/* <Menu.Item key='addITSkills'>IT-Skills </Menu.Item> */}
                {/* <Menu.Item key='addProjects'>Projects </Menu.Item>
                <Menu.Item key='addProfileSummary'>ProfileSummary </Menu.Item> */}
                {/* <Menu.Item key='accomplishments'>Accomplishments</Menu.Item> */}
                {/* <Menu.Item key='careerProfile'>Career Profile</Menu.Item> */}
                {/* <Menu.Item key='personalDetails'>Personal Details</Menu.Item> */}
            </Menu>
        </Card>
    );
};

export default Quicklink;
