"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/users/Navbar";
import Footer from "@/components/users/UserProfile.js/Footer";
import BottomNav from "@/components/users/home/MobileComponent/BottomNav";

export default function ClientLayoutWrapper({ children }) {
  const pathname = usePathname();

  const hideNavbar = pathname.startsWith("/store") || pathname.startsWith("/wallet");
  const leadFormPath = pathname.startsWith("/leadform");

  const hideFooter = hideNavbar || /^\/[^/]+\/[^/]+$/.test(pathname);
  const hideBottomNav = /^\/[^/]+\/[^/]+$/.test(pathname) || leadFormPath;

  return (
    <>
      {!hideNavbar && <Navbar />}
        {children}
      {!hideFooter && <Footer />}
      {!hideBottomNav && <BottomNav />}
    </>
  );
}
