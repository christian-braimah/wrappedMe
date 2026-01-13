'use client'
import React, { useEffect, useState } from 'react'
import { useSession } from "next-auth/react";
import Image from 'next/image'
import avatarImg from "../../public/assets/avatar.jpg"
import { useFetchTracks } from "../../services/fetchTracks";

export default function Dashboard() {
    const { data: session } = useSession();
    const {tracks, isLoading} = useFetchTracks();

    console.log(tracks);
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

            <section>
                <h1>Tracks</h1>
                {isLoading ? (
                    <p>Loading...</p>
                ) :
                (<div >{tracks.map((item, index )=>
                    <div className="flex flex-wrap gap-4" key={index}>
                        <Image
                            src={item.track.album.images[0].url}
                            alt= "Track Image"
                            width={100}
                            height={100}
                        />
                            <p>{item.track.name}</p>
                    </div>

                )}
                </div>)}
                
            
            </section>
            
            
        </React.Fragment>
    )
}