"use client";

import "./globals.css";
import Navbar from "@/components/users/Navbar";
import Footer from "@/components/users/UserProfile.js/Footer";
import BottomNav from "@/components/users/home/MobileComponent/BottomNav";
import { AuthProvider } from "@/context/AuthContext";
import { GlobalStateProvider } from "@/services/LocationDetector/GlobalState";
import { usePathname } from "next/navigation";
import Image from "next/image";
// import { SchemaProvider, useSchema } from "@/context/SchemaContext";


// export const metadata = {

//   title: "Find Business Near you",
//   description: "Developed By WBFS PVT LTD",
//   creator: "Famous Business",
//   authors: [{ name: "Famous Business" }],
//   verification: {
//     google: "Xt1V45SKg3Q6efCGyC9wj57T49K_JEEly7-mPhhtgyw",
//     facebook: "8hhzgny6wxz91vzeqa61rmobj6tbim",
//   },
// };

// function HeadSchemaInjector() {
//   // const { schema } = useSchema();

//   if (!schema) return null;

//   return (
//     <script
//       type="application/ld+json"
//       dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
//     />
//   );
// }



export default function RootLayout({ children }) {
  const pathname = usePathname();

  const hideNavbar = pathname.startsWith("/store") || pathname.startsWith("/wallet");

  const hideFooter = hideNavbar || /^\/[^/]+\/[^/]+$/.test(pathname);

  return (

    <html lang="en">
      <head>
        {/* <title>Find Business Near you</title> */}
        {/* <meta name="google-site-verification" content="Xt1V45SKg3Q6efCGyC9wj57T49K_JEEly7-mPhhtgyw" />
        <meta name="facebook-domain-verification" content="8hhzgny6wxz91vzeqa61rmobj6tbim"/>

        <meta name="google-adsense-account" content="ca-pub-3619066091276324" /> */}

        {/* <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3619066091276324"
          crossOrigin="anonymous"
        ></script>

        <script
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '1114902456896553');
              fbq('track', 'PageView');
            `,
          }}
        /> */}

        <noscript>
          <Image
            src="https://www.facebook.com/tr?id=1114902456896553&ev=PageView&noscript=1"
            alt="Facebook Pixel"
            width={1}
            height={1}
            style={{ display: "none" }}
            unoptimized
          />
        </noscript>
      </head>

      <body className="bg-slate-100 dark:text-gray-800">
        <AuthProvider>
          <GlobalStateProvider>
                {!hideNavbar && <Navbar />}
                  {children}
                {!hideFooter && <Footer />}
            <BottomNav />
          </GlobalStateProvider>
        </AuthProvider>
      </body>
    </html>

  );
}
