"use client";
import React from 'react';
import { Card } from 'antd';
const Card1 = ({height,width, radius, content, title,style,bgcolor, bottom}) => (
  <Card
  title={title}
 
    style={{
      paddingBottom:bottom,
      width: width,
      height:height,
      borderRadius:radius,
      borderColor:'rgba(247, 57, 155, 0.8)',
      backgroundColor:bgcolor,
      boxShadow: "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px"
     
    
    }}
    hoverable={true}
    bordered={true}
  >
    <center style={style} >
    {content}
    </center>
  </Card>
);
export default Card1;
