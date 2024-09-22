import React, { useState } from 'react';
import { Button, message, Steps, theme } from 'antd';
import ListForm from './ListForm';
import { FaLess } from 'react-icons/fa';
import FinalStep from './FinalStep';
const steps = [
  {
    title: 'First',
    content: <ListForm/>,
  },
  {
    title: 'Second',
    content: <FinalStep/>,
  },
  {
    title: 'Last',
    content: 'Last-content',
  },
];
const App = () => {
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);
  const next = () => {
    setCurrent(current + 1);
  };
  const prev = () => {
    setCurrent(current - 1);
  };
  return (
    <div className=' relative'>
     
      <div >{steps[current].content}</div>
      <div
        style={{
          marginTop: 24,
        }}
      >
        {current < steps.length - 1 && (
          <div className=' w-full bg-slate-100 fixed bottom-0 p-2'>
          <Button size='large' onClick={() => next()} type='primary' className=' w-full'>Next</Button>
      </div>
        )}
        {current === steps.length - 1 && (
          <Button type="primary" onClick={() => message.success('Processing complete!')}>
            Done
          </Button>
        )}
     
      </div>
    </div>
  );
};
export default App;