"use client";
import React from "react";
import { Card, Col, Row, Rate, Flex, Button, Skeleton, Carousel } from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { MdOutlineVerified, MdVerified } from "react-icons/md";
import MultiNumber from "./Filter/MultiNumber";
import { BiSolidBusiness, BiCategory } from "react-icons/bi";
import GetCategory from "@/utils/GetCategory";
import Whatsapp from "./Filter/Whatsapp";
import { IoShieldCheckmarkSharp } from "react-icons/io5";
import useSWR from "swr";
import { get_category_by_id } from "@/services/Admin/category";
import Link from "next/link";
import { AspectRatio } from "@mui/joy";

function CardVerify({ item }) {
  const router = useRouter();
  const { data, error } = useSWR(item.category, get_category_by_id);
  if (!data) {
    return <Skeleton.Input active />;
  }
  if (error) return <div>Fetching data error</div>;
  // Function to prevent event propagation for call and whatsapp buttons
  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  const handleNaxt = () => {
    router.push(
      `/userprofile/${item.business_name}?z_id=${item.id}&Cate=${data}`
    );
  };

  return (
    <Card
      style={{
        borderRadius: "20px",
        borderWidth: 0.5,
        borderColor: "slategray",
      }}
      onClick={handleNaxt}
      className=" w-full"
      hoverable
    >
      {/* Card Content */}
      <Row gutter={[16, 16]}>
        {/* Business Name */}
        <Col span={24} className=" text-lg font-bold ">
          <Flex gap="small" horizontal={true} align="center">
            <BiSolidBusiness className=" text-purple-600 text-2xl" />
            <span className=" text-lg truncate line-clamp-1">
              {item.business_name ? item.business_name : "Business Name"}
            </span>
            {item.verified ? (
              <MdVerified className=" text-2xl text-blue-600" />
            ) : null}
          </Flex>
        </Col>

        {/* Image and Details */}
        <Col span={24}>
          <Row justify="space-between" gutter={[24, 12]}>
            {/* Business Image */}
            <Col span={7}>
              <Carousel slidesToScroll={true} autoplay>
                {item.business_images &&
                Array.isArray(item.business_images) &&
                item.business_images.length > 0 ? (
                  item.business_images.map((item, index) =>
                    item &&
                    item.image &&
                    Array.isArray(item.image) &&
                    item.image.length > 0
                      ? item.image.map((imageItem, imageIndex) => (
                          <AspectRatio
                            variant="plain"
                            ratio="4/3"
                            objectFit="contain"
                            key={imageItem.id}
                            minHeight="120px"
                            maxHeight="200px"
                          >
                            <Image
                              fill
                              src={imageItem.image}
                              loading="lazy"
                              sizes="100%"
                              className=" object-contain"
                              alt={`business-${index}-${imageIndex}`}
                            />
                          </AspectRatio>
                        ))
                      : null
                  )
                ) : (
                  <AspectRatio
                    variant="plain"
                    ratio="4/3"
                    objectFit="contain"
                    minHeight="120px"
                    maxHeight="200px"
                  >
                    <Image
                      src={item.picture}
                      alt="business"
                      fill
                      className=" object-contain"
                      sizes="100%"
                    />
                  </AspectRatio>
                )}
              </Carousel>
            </Col>
            {/* Business Details */}
            <Col span={17}>
              <Row gutter={[8, 4]}>
                {/* Business Rating */}
                <Col span={24}>
                  <Flex gap="small" align="center" horizontal={true}>
                    <BiCategory className=" text-blue-500 text-xl"></BiCategory>
                    <GetCategory business={item} />
                  </Flex>
                </Col>
                <Col span={24}>
                  <div className=" text-semibold text-base">
                    <Flex gap="small" align="center" horizontal={true}>
                      <IoShieldCheckmarkSharp className=" text-green-600 text-xl" />
                      <span className=" text-black font-bold">GSTIN: </span>{" "}
                      {item.GSTIN}
                    </Flex>
                  </div>
                </Col>
                <Col span={24}>
                  <Row align="middle" gutter={8}>
                    <Col className=" font-bold text-white bg-green-600 rounded-lg p1">
                      4.2
                    </Col>
                    <Col>
                      <Rate
                        style={{ color: "#FF5349", fontSize: "30px" }}
                        character="★"
                        defaultValue={4}
                        disabled
                      />
                    </Col>
                    <Col className=" text-green-250 font-bold">
                      {item.reviews} Ratings
                    </Col>
                  </Row>
                </Col>
                {/* Business Address */}
                <Col span={24} className=" text-lg font-semibold">
                  {item.state || item.city || item.pincode
                    ? `${item.state || ""} ${item.city || ""} ${
                        item.pincode || ""
                      }`
                    : ""}
                </Col>
              </Row>
            </Col>
            <Col span={24}>
              <Row align="middle" justify="space-around">
                <Col onClick={stopPropagation}>
                  <MultiNumber
                    mobileNumbers={item.mobile_numbers}
                    default_Number={item.mobile_number}
                  />
                </Col>
                <Col onClick={stopPropagation}>
                  <Whatsapp whatsapp_number={item.whatsapp_number} />
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </Card>
  );
}

export default CardVerify;
