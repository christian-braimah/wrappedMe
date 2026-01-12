'use client'
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function Navbar(){
    const router = useRouter();
    const { data: session } = useSession();
    const userName = session?.user?.name;

    return(
        <nav>
            <ul className="flex gap-4">
                <li onClick={() => router.push("/")}>Home</li>
                {session?.user ?(<li onClick={() => router.push("/dashboard")}>Dashboard</li>):null}
                {session?.user ?(<li>{userName}</li>):
                (<li className="cursor-pointer"
                    onClick={() => router.push("/signin")}>Sign In</li>)}
                {session?.user ?(<li onClick={() => signOut()}>Sign Out</li>):null}
            </ul>
        </nav>
    )
}