"use client"
import Image from 'next/image';
import { useFetchTracks } from "../services/useFetchTracks";


export default function LikedTracks(){
    const {tracks, isLoading} = useFetchTracks();

    console.log(tracks);
    return(
        <section className='px-10'>
                <h1>Liked Songs </h1>
                {isLoading ? (
                    <p>Loading...</p>
                ) :
                (<div className='grid grid-cols-6 gap-1 '>{tracks.slice(0,6).map((item, index )=>
                    <div className="flex flex-col flex-wrap gap-4" key={index}>
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
        
    )
} 