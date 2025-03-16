"use client"
import React from 'react';
import { Breadcrumb, Button } from 'antd';
import { usePathname, useRouter } from 'next/navigation';
import { ImHome } from "react-icons/im";

import Link from 'next/link';



const NextBreadcrumb = ({ separator, capitalizeLinks }) => {
  const paths = usePathname();
  const router = useRouter()
  const pathNames = paths.split('/').filter((path) => path);

  const breadcrumbItems = pathNames.map((link, index) => {
    let href = `/${pathNames.slice(0, index + 1).join('/')}`;
    let itemLink = capitalizeLinks
      ? link[0].toUpperCase() + link.slice(1, link.length)
      : link;

    // Decode the link before rendering it
    itemLink = decodeURIComponent(itemLink);

    return (
      <Breadcrumb.Item key={index}>
        {paths === href ? (
          <span>{itemLink}</span>
        ) : (
          <span className='cursor-pointer text-blue-500' onClick={() => router.back()}>{itemLink}</span>
        )}
      </Breadcrumb.Item>
    );
  });

  return (
    <Breadcrumb separator={separator}>
      <Breadcrumb.Item>
        <Link href={'/'}>
          <ImHome className=' mt-2' />
        </Link>
      </Breadcrumb.Item>
      {/* Pass the breadcrumbItems array directly */}
      {breadcrumbItems}
    </Breadcrumb>
  );
};

export default NextBreadcrumb;
