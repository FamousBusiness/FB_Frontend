
import React from 'react';
import { Avatar, Flex, List, Rate } from 'antd';
const UserReview = ({ data }) => {
  const formatDate = (timestamp) => {
    const options = {
      // year: 'numeric',
      // month: 'numeric',
      // day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: false, // Use 24-hour format
      timeZone: 'Asia/Kolkata', // Set the time zone to India (Asia/Kolkata)
    };
    const date = new Date(timestamp);
    return date.toLocaleString('en-IN', options);
  };
  return (
    <List
      itemLayout="horizontal"
      size='large'
      dataSource={data}
      renderItem={(item, index) => (
        <List.Item
          actions={<div>{formatDate(item.post_date)}</div>}
          style={{ marginBottom: 10 }}>
          <List.Item.Meta
            avatar={<Avatar shape='square' />}
            title={<Flex gap='small' align='start' vertical>{item.rating}
              <Rate character="★" defaultValue={item.rating} disabled />
            </Flex>}
            description={`${item.review}`}
          />

        </List.Item>
      )}
    />
  );
}
export default UserReview;