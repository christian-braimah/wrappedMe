'use client'
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import "../public/css/sidebar.css"
import Image from "next/image";
import { Button } from "@radix-ui/themes";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";


export default function Sidebar(){
    const router = useRouter();
    const { data: session } = useSession();
    const userName = session?.user?.name;
    const userImage = session?.user?.image;

    return(
        <nav className="page-sidebar col-span-1">
            <ul className="h-full flex flex-col">
                <div className="sidebar-top">
                    <div className="sidebar-logo">
                        <h4>Wrap</h4>
                    </div>
                    
                    {session?.user ?
                    (<li className="sidebar-item" onClick={() => router.push("/dashboard")}>Dashboard</li>):null}
                </div>
                
                <div className="sidebar-bottom">
                    
                    {session?.user ?
                    (<DropdownMenu.Root>
                    <DropdownMenu.Trigger>
                        <Button className="sidebar-item" variant="soft">
                            <Image
                            className="rounded-full"
                            src={userImage || ""}
                            alt="User Image"
                            width={20}
                            height={20}
                        />
                            {userName}</Button>
                        
                    </DropdownMenu.Trigger>
                    <DropdownMenu.Content>
                        <DropdownMenu.Item onClick={() => signOut()}>
                            <Button>Sign Out</Button>
                        </DropdownMenu.Item>
                    </DropdownMenu.Content>
                </DropdownMenu.Root>):
                    (<li className="sidebar-item cursor-pointer"
                        onClick={() => router.push("/signin")}>Sign In</li>)}
                </div>
            </ul>
        </nav>
    )
}