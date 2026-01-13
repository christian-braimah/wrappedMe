"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

import "../public/css/pagelayout.css"

export default function Navigation({children}: {children: React.ReactNode}) {
    const pathname = usePathname();

    const isAuthPage = pathname === "/signin" || pathname === "/signup";

    if(isAuthPage){
        return (
            <>
                <Navbar />
                <main>{children}</main>
            </>
        );
    } else {
        return (
            <div className="page-grid-container">
                <Sidebar/>
                <main className="page-content-area">
                    {children}
                </main>
            </div>
        );
    }
}
