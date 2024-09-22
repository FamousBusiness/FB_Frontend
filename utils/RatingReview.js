"use client"
import React, { useState } from 'react';
import { AiOutlineLike } from 'react-icons/ai';
import { AiFillLike } from 'react-icons/ai';
import { serverUrl } from './Server';
import { useAuth } from '@/context/AuthContext';
import { Button, Col, Drawer, Modal, Rate, Row, message, Input } from 'antd';
import { useRouter } from 'next/navigation';

const { TextArea } = Input;

const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];

function RatingReview({ id, size }) {
    const { authTokens } = useAuth();
    const router = useRouter()
    const [open, setOpen] = useState(false);
    const [reviewText, setReviewText] = useState('');
    const [rate, setRate] = useState(0);

    const showDrawer = () => {
        // setOpen(true);
        if (!authTokens) {
            // If user is not logged in, show a login prompt

            router.push('/login');

        } else {
            setOpen(true);
        }
    };

    const onClose = () => {
        setOpen(false);
    };

    const RatingHandler = async () => {
        console.log('review', reviewText)
        console.log('rating', rate)
        try {
            if (!authTokens) {
                // If user is not logged in, do nothing
                return;
            }


            const response = await fetch(`${serverUrl}/api/listings/business-page-review-rating/${id}/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authTokens?.access}`,
                },
                // You can include a request body if needed
                body: JSON.stringify({
                    "review": reviewText,
                    "rating": rate
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to submit review');
            }

            message.success('Review submitted successfully!');
            onClose(); // Close the drawer after submission
        } catch (error) {
            console.error(error);
            message.error('Failed to submit review');
        }
    };

    return (
        <>

            <Rate onClick={showDrawer} style={{ color: '#FF5349', fontSize: size }} character="★" value={rate} onChange={(value) => setRate(value)} />


            <Drawer title="Submit Review" placement="bottom" onClose={onClose} open={open}>
                <Row justify='center' gutter={[0, 12]}>
                    <Col>
                        <Rate tooltips={desc} className=' text-orange-600 text-4xl' character="★" value={rate} onChange={(value) => setRate(value)} />
                        {rate ? <div className=' text-center dark:text-black font-sans font-semibold'>{desc[rate - 1]}</div> : ''}
                    </Col>
                    <Col span={24}>
                        <hr />

                    </Col>
                    <Col span={24}>
                        <div className=' text-3xl dark: font-semibold'>Tell us about your experience</div>
                    </Col>
                    <Col span={24}>
                        <TextArea placeholder=' Please share your experience with the business.' rows={4} value={reviewText} onChange={(e) => setReviewText(e.target.value)} />
                    </Col>
                    <Col span={24}>
                        <Button block type='primary' onClick={RatingHandler}>
                            SUBMIT REVIEW
                        </Button>
                    </Col>
                </Row>
            </Drawer>
        </>
    );
}

export default RatingReview;
