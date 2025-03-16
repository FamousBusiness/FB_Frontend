"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
// import { IoHomeOutline, IoBriefcaseOutline } from "react-icons/io5";
// import { motion } from "framer-motion";
// import { MessageOutlined } from "@ant-design/icons";
// import BottomDrawer from "./bottomDrawer";
import Link from "next/link";
import StorefrontRoundedIcon from '@mui/icons-material/StorefrontRounded';

// import Image from "next/image";
import {
  RiHome4Fill,
  RiHome4Line,
  RiMessage2Fill,
  RiMessage2Line,
  RiVipCrown2Fill,
  RiVipCrown2Line,
} from "react-icons/ri";




function BottomNav() {
  const router = useRouter();
  const pathname = usePathname();

  const [isScrolled, setIsScrolled] = useState(false);
  const [focus, setFous] = useState(false);

  useEffect(() => {
    let prevScrollY = 0;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const isScrollingUp = currentScrollY > prevScrollY;

      setIsScrolled(isScrollingUp && currentScrollY > 0);
      prevScrollY = currentScrollY;
    };

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {pathname.includes("/userprofile") ? null : (

        <div
          style={{ boxShadow: "rgba(0, 0, 0, 0.06) 0px 2px 4px 0px inset", marginBottom: -1, border:'1px solid black' }}
          className="fixed md:hidden  flex justify-center py-4 dark:bg-white bg-white lg:hidden  p-2 xl:hidden 2xl:hidden bottom-0 left-0 z-50 w-full min-h-50  dark:border-gray-600" 
        >
          <div>
            <div className="grid h-full max-w-lg grid-cols-5 gap-2 mx-auto font-medium">
              {/* Home Button */}
              <button
                onClick={() => router.push("/")}
                type="button"
                className={`inline-flex  rounded-md flex-col items-center justify-center px-5 group`}
              >
                {pathname == "/" ? (
                  <RiHome4Fill size={24} fill="blue" />
                ) : (
                  <RiHome4Line size={24}/>
                )}
                <span className="text-xs text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">
                  Home
                </span>
              </button>

              <button
                onClick={() => router.push("/leads")}
                type="button"
                className={`inline-flex flex-col   rounded-md  items-center justify-center px-5 group`}
              >
                {pathname == "/orders" ? (
                  <RiMessage2Fill size={24} fill="blue" />
                ) : (
                  <RiMessage2Line size={24} fill="blue"/>
                )}
                <span className="text-xs text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">
                  Orders
                </span>
              </button>

              {/* Marketing Button */}
              <Link
                href={`/`}
                className={`inline-flex flex-col  rounded-md  items-center justify-center px-5  group`}
              >
                {pathname == "/" ? (
                  <StorefrontRoundedIcon color="primary" />
                ) : (
                  <StorefrontRoundedIcon color="primary" />
                )}
                <span className="text-xs text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">
                  Store
                </span>
              </Link>


              <Link
                href={`/`}
                className={`inline-flex flex-col  rounded-md  items-center justify-center px-5  group`}
              >
                {pathname == "/" ? (
                  <RiVipCrown2Fill size={24} fill="blue" />
                ) : (
                  <RiVipCrown2Line size={24} fill="blue" />
                )}
                <span className="text-xs text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">
                  Plan
                </span>
              </Link>

              {/* Search  */}

              {/* Messenger Button */}
              {/* <BottomDrawer /> */}
              {/* Bottom Drawer Button */}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default BottomNav;
