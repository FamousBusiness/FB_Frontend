import React from 'react';
import { Steps } from 'antd';
// const description = 'This is a description.';
const Track = () => (
  <Steps
    current={3}
    percent={100}
    items={[
      {
        title: 'Payment',
        description:'Place Order',
      },
      {
        title: 'Payment',
        subTitle: 'Left 00:00:08',
        description:'Development',
      },
      {
        title: 'Payment',
        description:'Testing',
      },
      {
        title: 'Payment',
        description:'Live',
      },
    ]}
  />
);
export default Track;