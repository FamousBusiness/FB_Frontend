
import "./globals.css";
import Navbar from "@/components/users/Navbar";
import Footer from "@/components/users/UserProfile.js/Footer";
import BottomNav from "@/components/users/home/MobileComponent/BottomNav";
import { AuthProvider } from "@/context/AuthContext";
import { GlobalStateProvider } from "@/services/LocationDetector/GlobalState";



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
        />
        
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1114902456896553&ev=PageView&noscript=1"
            alt="Facebook Pixel"
          />
      </noscript>

      </head>
      
      

      <body className="bg-slate-100 dark:text-gray-800 ">
        <AuthProvider>
          <GlobalStateProvider>

            <Navbar /> 
              {children}
            <Footer />

            <BottomNav />

          </GlobalStateProvider>
        </AuthProvider>
     </body>

   </html>
  );
};


