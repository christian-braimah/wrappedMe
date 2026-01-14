'use client'
import React from 'react'
import { useSession } from "next-auth/react";
import Image from 'next/image'
import avatarImg from "../../public/assets/avatar.jpg"
import LikedTracks from '../../components/LikedTracks';
import TopTrackArtist from "../../components/TopTrackArtist"

export default function Dashboard() {
    const { data: session } = useSession();
    return (
        <React.Fragment>
            <div className='flex flex-col items-center justify-center'>
                <h1>Dashboard</h1>
                <p>Welcome {session?.user?.name}</p>
                <Image
                    src={session?.user?.image || avatarImg}
                    alt="User Image"
                    width={100}
                    height={100}
                />
            </div>


            <LikedTracks/>
            <TopTrackArtist/>
        </React.Fragment>
    )
}