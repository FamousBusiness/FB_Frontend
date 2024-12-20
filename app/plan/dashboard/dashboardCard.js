"use client";
import React, { useState } from 'react';
import { Card, Button, Drawer, Descriptions, Tag, Popconfirm, Modal, notification, message } from 'antd';
import { CancelPlan } from '@/services/Admin/Premium';
import moment from 'moment';







const PlanCard = ({ planData }) => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [cancelCheck, setCancelCheck] = useState(false);
  const showDrawer = () => {
    setDrawerVisible(true);
  };

  const onCloseDrawer = () => {
    setDrawerVisible(false);
  };

  const { plan, is_paid, expired, created_at, ads_allowed, banner_allowed, jobpost_allowed, purchased_at, lead_assigned } = planData;
  const formattedPurchasedAt = moment(purchased_at).format('DD/MM/YYYY hh:mm A');



  const handleCancel = (id) => {
    if (cancelCheck) return;
    setCancelCheck(true);
    const res = CancelPlan(id)
    notification.success({
      content: res.msg,
      description: 'Team will contact you soon',
      placement: 'topLeft'
    })
  }


  const cancel = (e) => {
    // console.log(e);
    message.error('Click on No');
  };


  return (
    <Card
      loading={false}
      title={plan.plan.name}
      extra={<Popconfirm
        title="Deactivate"
        disabled={cancelCheck || expired}
        description="Are you sure to deactivate this plan?"
        onConfirm={() => handleCancel(plan.id)}
        onCancel={cancel}
        okText="Yes"
        cancelText="No"
      >
        <Button disabled={cancelCheck || expired} danger>Deactivate</Button>
      </Popconfirm>}
    >
      <p>Status: {expired ? <Tag color='error'>Expire</Tag> : <Tag color="success">Active</Tag>}</p>
      {/* <p>Expiration Date: {expirationDate}</p> */}
      <p>Purchased Date: {formattedPurchasedAt}</p>
      <p>Amount: ₹{plan.plan.price}</p>

      <Descriptions column={2} title={plan.plan.name} layout="vertical" bordered>
        <Descriptions.Item label="Duration(Month)">{plan.plan.duration_quantity}</Descriptions.Item>
        <Descriptions.Item label="Assigned Lead">{lead_assigned}</Descriptions.Item>
        <Descriptions.Item label="Job Post">{jobpost_allowed}</Descriptions.Item>
        <Descriptions.Item label="Features" span={24}>
          
          <ul>
            {plan.plan.verified && <li >{plan?.plan?.verified}</li>}
            {plan.plan.trusted && <li >{plan?.plan?.trusted}</li>}
            {plan.plan.trending && <li >{plan.plan.trending}</li>}
            {plan.plan.authorized && <li >{plan.plan.authorized}</li>}
            {plan.plan.sponsor && <li >{plan.plan.sponsor}</li>}
            {plan.plan.super && <li >{plan.plan.super}</li>}
            {plan.plan.premium && <li >{plan.plan.premium}</li>}
            {plan.plan.industry_leader && <li >{plan.plan.industry_leader}</li>}
            {plan.plan.extra_benefits && <li >{plan.plan.extra_benefits}</li>}
            {plan.plan.extra_benefits1 && <li >{plan.plan.extra_benefits1}</li>}
          </ul>
        </Descriptions.Item>
      </Descriptions>
    </Card>
  );
};


export default PlanCard;
