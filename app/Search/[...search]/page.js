"use client";
import React from "react";
import { Col, Row, FloatButton } from "antd";
import { BsArrowUpShort } from "react-icons/bs";
import Anything from "@/components/users/AnythingSearch";
import { useParams } from "next/navigation";

export default function Page() {
    const params = useParams();
    console.log("Searching", params.search[0]);
    const slug = decodeURIComponent(params.search[0])
    return (
        <>
            <div className=" relative min-h-screen p-2 bg-white">
                <Anything slug={slug}/>
                <FloatButton.BackTop icon={<BsArrowUpShort />} />
            </div>
        </>
    )
}