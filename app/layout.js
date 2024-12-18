import "./globals.css";
import Navbar from "@/components/users/Navbar";
import Footer from "@/components/users/UserProfile.js/Footer";
import BottomNav from "@/components/users/home/MobileComponent/BottomNav";
import { AuthProvider } from "@/context/AuthContext";
import { GlobalStateProvider } from "@/services/LocationDetector/GlobalState";
// import { AntdRegistry } from '@ant-design/nextjs-registry';
// import { GoogleTagManager } from '@next/third-parties/google'



export const metadata = {
  title: "Famous Business",
  description: "Developed By WBFS PVT LTD",
  creator: "Arshad",
  authors: [{ name: "Arshad Iqbal" }],
  verification: {
    google: "Xt1V45SKg3Q6efCGyC9wj57T49K_JEEly7-mPhhtgyw",
    facebook: "8hhzgny6wxz91vzeqa61rmobj6tbim",
  },
};



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta
          name="facebook-domain-verification"
          content="8hhzgny6wxz91vzeqa61rmobj6tbim"
        />
        <meta name="google-adsense-account" content="ca-pub-3619066091276324" />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3619066091276324"
          crossOrigin="anonymous"
        ></script>
        {/* <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3619066091276324"
     crossorigin="anonymous"></script> */}

      </head>


      <body className="bg-slate-100 dark:text-gray-800 ">
        <AuthProvider>
          <GlobalStateProvider>
            {/* <AntdRegistry> */}
            <Navbar />
              {children}
            <Footer />

            <BottomNav />
            
            {/* </AntdRegistry> */}
          </GlobalStateProvider>
        </AuthProvider>
      </body>
      {/* <GoogleTagManager gtmId="GTM-KJPN4ZLL" /> */}
    </html>
  );
}
