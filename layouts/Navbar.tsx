'use client'
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import "../public/css/navbar.css"
import Image from "next/image";

export default function Navbar(){
    const router = useRouter();
    const { data: session } = useSession();
    const userName = session?.user?.name;
    const userImage = session?.user?.image;

    return(
        <nav>
            <ul className="container-large h-">
                <div className="navbar-left">
                    <li onClick={() => router.push("/")}>Home</li>
                </div>
                <div className="navbar-right">
                    {session?.user ?
                    (<li onClick={() => router.push("/dashboard")}>Dashboard</li>):null}
                    {session?.user ?
                    (<li className="navbar-user-btn">
                        <Image
                            className="rounded-full"
                            src={userImage || ""}
                            alt="User Image"
                            width={20}
                            height={20}
                        />
                        {userName}</li>):
                    (<li className="cursor-pointer"
                        onClick={() => router.push("/signin")}>Sign In</li>)}
                    {session?.user ?(<li onClick={() => signOut()}>Sign Out</li>):null}
                </div>
            </ul>
        </nav>
    )
}