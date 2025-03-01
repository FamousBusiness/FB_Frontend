"use client";
import React from "react";
import { Col, Row, FloatButton } from "antd";
import { useParams, useSearchParams } from "next/navigation";
import { BsArrowUpShort } from "react-icons/bs";
import SearchPage from "@/components/users/SearchPage";
import { useGlobalState } from "@/services/LocationDetector/GlobalState";

export default function Page() {
    const searchParams = useSearchParams();
    const param = useParams()
    // console.log("params:", param.item[0]);
    const category = searchParams.get('cat_id');
    const categoryName = decodeURIComponent(searchParams.get('cat_name'));


    return (
        <>
            <div className=" relative min-h-screen p-1 bg-white">
                <SearchPage CatName={categoryName} id={category} />
                <FloatButton.BackTop icon={<BsArrowUpShort />} />
            </div>
        </>
    )
}