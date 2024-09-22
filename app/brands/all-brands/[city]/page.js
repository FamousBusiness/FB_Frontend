"use client";
import React from "react";
import { Col, Row, FloatButton } from "antd";
import { BsArrowUpShort } from "react-icons/bs";
import SearchPageBrand from "@/components/users/BrandsPage";


export default function Page() {
    return (
        <div className=" relative">
            <Row >
                <Col span={24}>
                    <SearchPageBrand />
                </Col>
            </Row>
            <FloatButton.BackTop icon={<BsArrowUpShort />} />
        </div>
    )
}