"use client";
import React from "react";
import { Badge, Card } from "antd";
import { useRouter } from "next/navigation";



function MobileFormTag({ items }) {
  const router = useRouter();

  const handlePage = () => {
    router.push(``);
  };


  return (
    <Badge.Ribbon
      text="Authorized Dealer"
      className={`py-1 font-bold ${items.authorized ? "visible" : "hidden"}`}
    >
      <Card
        style={{ borderRadius: "20px" }}
        className=" relative dark:text-black bg-white shadow-md border border-1 rounded-md"
      >
        <p>Linear New</p>
      </Card>
    </Badge.Ribbon>
  );
}

export default MobileFormTag;
