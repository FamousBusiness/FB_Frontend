// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import StoreTopNavbar from "@/components/Navbar/TopNavbar";
import { DataProvider } from "./DataContext";
import { AuthProvider } from "@/Authentication/auth";
import Footer from "@/components/Footer/Footer";
import { Box } from "@mui/material";




// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });


// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });


export const metadata = {
  title: "Famous Business Store",
  description: "Get all your daily need products",
};


export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body style={{backgroundColor: '#f1f5f9', color: '#1f2937'}}>
        <AuthProvider>
          <DataProvider>

            <StoreTopNavbar />
              {children}

          <Box sx={{display: {xs:'none', sm:'none', md:'flex'}}}>
            <Footer/>
          </Box>

          </DataProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
