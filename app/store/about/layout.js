
"use client";
import Navbar from './component/Navbar'


function Layout({ children }) {
    return (
        <div style={{backgroundColor: "#f1f5f9", position: "relative"}}>
            {/* <Navbar /> */}
            {children}
        </div>
    )
}


export default Layout