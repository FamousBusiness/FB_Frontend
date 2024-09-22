"use client";
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Column } from '@ant-design/plots';
import { data } from '@/data/data';

const DemoColumn = () => {
 
  const config = {
    data,
    xField: 'date',
    yField: 'value',
    seriesField: 'type',
    isGroup: true,
    columnStyle: {
      radius: [0, 0, 0, 0],
    },
  };

  return <Column {...config} />;
};
export default DemoColumn;