"use client";
import React, { useState, useEffect } from 'react';
import { Button, Modal } from 'antd';
import LoginForm from '../auth/LoginForm';




const ModalLogin = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };



  useEffect(() => {
    const intervalId = setInterval(() => {
      showModal();
      console.log('inuseEffect');
    }, 1000 * 60 * 1); // 5 minutes in milliseconds

    // Clean up the interval when the component unmounts
    return () => {
      clearInterval(intervalId);
    };
  }, []);


  
  return (
    <>
      <Modal
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        maskClosable={false} // Prevent closing by clicking outside
        afterClose={() => {
          // Set a new timeout when the modal is closed
          setTimeout(() => {
            console.log("Modal closed");
            showModal();
          }, 1000 * 60 * 1); // 5 minutes in milliseconds
        }}
      >
        <LoginForm />
      </Modal>
    </>
  );
};

export default ModalLogin;
