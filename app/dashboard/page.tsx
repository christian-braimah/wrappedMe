'use client'
import React from 'react'
import { useSession } from "next-auth/react";
import Image from 'next/image'



export default function Dashboard() {
    const { data: session } = useSession();

    return (
        <React.Fragment>
            <main className='flex flex-col items-center justify-center h-screen'>
                <h1>Dashboard</h1>
                <p>Welcome {session?.user?.name}</p>
                <Image
                    src={session?.user?.image || ""}
                    alt="User Image"
                    width={100}
                    height={100}
                />
            </main>
        </React.Fragment>
    )
}