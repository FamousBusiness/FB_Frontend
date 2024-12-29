"use client";
import React, { useState } from "react";
import { Button, Col, Form, Input, Row, Spin, Result, TimePicker } from "antd";
import {
  GlobalOutlined,
  LoadingOutlined,
  MailOutlined,
  WhatsAppOutlined,
} from "@ant-design/icons";
import ExtraMobile from "./ExtraNumber";
// import Category1 from '@/components/admin/Listing/CategorySelect';
import { IoBusinessOutline } from "react-icons/io5";
import { HiDocumentText } from "react-icons/hi";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { BsPersonArmsUp } from "react-icons/bs";
import { MdOutlineNature } from "react-icons/md";
import { get_product_by_id, update_a_product } from "@/services/Admin/products";
// import Category1 from "@/components/admin/Listing/CategorySelect";
import { useRouter } from "next/navigation";
import UploadImage from "./UploadImage";
import AddressForm from "./ComplateAddress";
import axios from "axios";
import { PiUserSquare } from "react-icons/pi";
import useSWR from "swr";
import moment from "moment";
// import {Button as MUIButton} from '@mui/material';
import FetchCategories from "./Categories";






const Address = ({ id }) => {
  const [cities, setCities]     = useState("");
  const [pincodes, setPincodes] = useState("");
  const [form]                  = Form.useForm();
  const [loading, setLoading]   = useState(false);
  const router                  = useRouter();
  const { data: business, error, mutate } = useSWR(id, get_product_by_id);


  if (!business) {
    return (
      <div className=" flex justify-center min-h-screen items-center">
        <Spin
          indicator={
            <LoadingOutlined
              spin
              className=" text-xl bg-white rounded-full shadow-md"
            />
          }
        />
      </div>
    );
  }


  if (error) {
    return <Result status="error" title="Something went wrong" />;
  }


  const handlePinCodeChange = async (value) => {
    if (value.length === 6) {
      try {
        const response = await axios.get(
          `https://api.postalpincode.in/pincode/${value}`
        );
        const data = response.data;
        // console.log(data);
        if (data && data.length > 0 && data[0].Status === "Success") {
          const placeData = data[0].PostOffice[0];
          form.setFieldsValue({
            city: placeData["District"],
            state: placeData["State"],
            locality: placeData["Block"],
          });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    } else {
    }
  };


  const handleCity = (value) => {
    form.setFieldsValue({
      city: value,
    });
  };


  

  const onFinish = async (values) => {

    try {
      setLoading(true);
      
      const formattedOpeningTime = values.opening_time
        ? values.opening_time.format("HH:mm")
        : null;

      const formattedClosingTime = values.closing_time
        ? values.closing_time.format("HH:mm")
        : null;

      // Create a new object with formatted times
      const formattedValues = {
        ...values,
        opening_time: formattedOpeningTime,
        closing_time: formattedClosingTime,
      };

      // Identify changed fields and create an object with changed values
      const changedFields = Object.keys(formattedValues).filter((key) => {
        if (key === "opening_time" || key === "closing_time") {
          return (
            formattedOpeningTime !== business["opening_time"] ||
            formattedClosingTime !== business["closing_time"]
          );
        }

        return (
          formattedValues[key] !== business[key] ||
          key === "business_name" ||
          key === "city"
        );
      });

      const changedValues = {};

      changedFields.forEach((key) => {
        changedValues[key] = formattedValues[key];
      });


      // Check if there are any changes before updating
      if (Object.keys(changedValues).length > 0) {
        // Assuming `update_a_product` is an asynchronous function
        await update_a_product(changedValues, business.id);

        // Redirect back after successful update
        router.back();
      } else {
        // No changes, simply redirect back
        // console.log("No changes detected.");
      }
    } catch (err) {
      console.error("Error updating product:", err);

    } finally {
      // Regardless of success or failure, set loading to false
      setLoading(false);
    }
  };

  const initialValues = {
    ...business,
    opening_time: business.opening_time
      ? moment(business.opening_time, "HH:mm a")
      : null,
    closing_time: business.closing_time
      ? moment(business.closing_time, "HH:mm a")
      : null,
  };


  return (
    <Form
      initialValues={initialValues}
      form={form}
      layout="vertical"
      name="register"
      onFinish={onFinish}
    >
      <Row
        justify="space-between"
        align="middle"
        gutter={[12, { xs: 0, sm: 0, lg: 24, xl: 24, xxl: 24, md: 0 }]}
      >

        {/* Image Upload */}
        <Col span={24}>
          <UploadImage mutate={mutate} business={business} />
        </Col>

        {/* Business Name */}
        <Col sm={24} xs={24} md={12} xxl={12} xl={12} lg={12}>
          <Form.Item name="business_name" label="Business Name">
            <Input addonBefore={<IoBusinessOutline />} />
          </Form.Item>
        </Col>

        {/* Category */}
        <Col sm={24} xs={24} md={12} xxl={12} xl={12} lg={12}>
          <FetchCategories label={true} required={false} />
        </Col>

        {/* Mobile number */}
        <Col sm={12} xs={12} md={12} xxl={8} xl={8} lg={8}>
          <Form.Item name="mobile_number" label="Phone Number">
            <Input
              addonBefore="+91"
              style={{
                width: "100%",
              }}
            />
          </Form.Item>
        </Col>


        {/* Whatsapp number */}
        <Col sm={12} xs={12} md={12} xxl={8} xl={8} lg={8}>
          <Form.Item
            name="whatsapp_number"
            label="Whatsapp Number"
            rules={[
              {
                type: "tel",
              },
            ]}
          >
            <Input addonBefore={<WhatsAppOutlined />} className=" w-full" />
          </Form.Item>
        </Col>

        {/* Extra Mobile Number */}
        {/* <Col sm={24} xs={24} md={23} xxl={8} xl={8} lg={8}>
          <ExtraMobile />
        </Col> */}

        <Col sm={24} xs={24} md={24} xxl={12} xl={12} lg={12}>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                type: "email",
              }
            ]}
          >
            <Input addonBefore={<MailOutlined />} type="email" />
          </Form.Item>
        </Col>

        <Col sm={24} xs={24} md={24} xxl={12} xl={12} lg={12}>
          <Form.Item name="website_url" label="Website">
            <Input addonBefore={<GlobalOutlined />} placeholder="website" />
          </Form.Item>
        </Col>

        {/* <Col sm={12} xs={12} md={12} xxl={12} xl={12} lg={12}>
          <Form.Item name="opening_time" label="Opening Time">
            <TimePicker
              use12Hours
              style={{ width: "100%", color:'blue' }}
              format="h:mm a"
              placeholder="Select Opening Time"
            />
          </Form.Item>
        </Col>

        <Col sm={12} xs={12} md={12} xxl={12} xl={12} lg={12}>
          <Form.Item name="closing_time" label="Closing Time">
            <TimePicker
              use12Hours
              style={{ width: "100%" , color:'blue'}}
              format="h:mm a"
              placeholder="Select Closing Time"
            />
          </Form.Item>
        </Col> */}

        <Col span={24}>
          <AddressForm handlePinCodeChange={handleCity} />
        </Col>

        <Col sm={24} xs={24} md={24} xxl={24} xl={24} lg={24}>
          <Form.Item name="business_info" label="About The Business">
            <Input.TextArea showCount rows={8} maxLength={2000} />
          </Form.Item>
        </Col>

        <Col sm={12} xs={12} md={12} xxl={8} xl={8} lg={8}>
          <Form.Item name="established_on" label="Year Of Establishment">
            <Input className="w-full" placeholder="YYYY" />
          </Form.Item>
        </Col>

        <Col sm={12} xs={12} md={12} xxl={8} xl={8} lg={8}>
          <Form.Item name="GSTIN" label="GSTIN">
            <Input
              placeholder="re5426f7f78vjhb"
              addonBefore={<HiDocumentText />}
            />
          </Form.Item>
        </Col>

        <Col sm={12} xs={12} md={12} xxl={8} xl={8} lg={8}>
          <Form.Item name="CIN_No" label="CIN">
            <Input placeholder="562535xxx" addonBefore={<HiDocumentText />} />
          </Form.Item>
        </Col>

        <Col sm={12} xs={12} md={12} xxl={8} xl={8} lg={8}>
          <Form.Item name="director" label="Director">
            <Input placeholder="Mr.Rajendra" addonBefore={<PiUserSquare />} />
          </Form.Item>
        </Col>

        <Col sm={12} xs={12} md={12} xxl={8} xl={8} lg={8}>
          <Form.Item name="RoC" label="RoC">
            <Input placeholder="Roc.." />
          </Form.Item>
        </Col>

        <Col sm={12} xs={12} md={12} xxl={8} xl={8} lg={8}>
          <Form.Item name="DIN" label="DIN">
            <Input placeholder="5635xxx" />
          </Form.Item>
        </Col>

        <Col sm={12} xs={12} md={12} xxl={8} xl={8} lg={8}>
          <Form.Item name="company_No" label="Company Number">
            <Input placeholder="12635xxx" />
          </Form.Item>
        </Col>

        <Col sm={12} xs={12} md={12} xxl={8} xl={8} lg={8}>
          <Form.Item name="nature" label="Nature Of Business">
            <Input addonBefore={<MdOutlineNature />} />
          </Form.Item>
        </Col>

        <Col sm={12} xs={12} md={12} xxl={8} xl={8} lg={8}>
          <Form.Item name="turn_over" label="Annual Turnover">
            <Input addonBefore={<FaIndianRupeeSign />} />
          </Form.Item>
        </Col>

        <Col sm={12} xs={12} md={12} xxl={8} xl={8} lg={8}>
          <Form.Item name="employee_count" label="Number of Employees">
            <Input placeholder="1000" addonBefore={<BsPersonArmsUp />} />
          </Form.Item>
        </Col>

        {/* <Col sm={24} xs={24} md={24} xxl={24} xl={24} lg={24}>
          <div className="pt-4 w-full z-20 fixed left-0  text-center bottom-0" style={{ padding: "8px", background: "white" }}>
            <Row align="middle" justify="center" gutter={12}>
              <Col xl={12} sm={12} xs={12} md={12} xxl={12} lg={12}>
                <Form.Item>
                  <Button
                    block
                    style={{ background: "green", color: "white" }}
                    loading={loading}
                    size="large"
                    type="primary"
                    htmlType="submit"
                  >
                    SAVE
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </div>
        </Col> */}
      </Row>

        <Form.Item>
          <Button
              block
              style={{ background: "green", color: "white" }}
              loading={loading}
              size="large"
              type="primary"
              htmlType="submit"
            >
              SAVE
          </Button>
        </Form.Item>
    </Form>
  );
};
export default Address;
