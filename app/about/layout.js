
"use client";
import Navbar from './component/Navbar'
function Layout({ children }) {
    return (
        <div className="bg-slate-100 relative">
            <Navbar />
            {children}
        </div>
    )
}

export default Layout