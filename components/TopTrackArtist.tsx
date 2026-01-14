"use client"
import { useState } from 'react';
import Image from 'next/image';
import { useFetchTopItem, SpotifyItem } from "../services/useFetchTopItem"

export default function TopTrackArtist() {
    const [userSelection, setUserSelection] = useState<"tracks" | "artists">("tracks");
    const { topItem, isLoading } = useFetchTopItem(userSelection);

    const getImageUrl = (item: SpotifyItem) => {
        if (item.type === 'track') {
            return item.album.images[0]?.url;
        } else {
            return item.images[0]?.url;
        }
    };

    return (
        <section className='px-4 w-full max-w-5xl mx-auto mt-8'>
            <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
                <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
                    Your Top {userSelection === 'tracks' ? 'Tracks' : 'Artists'}
                </h2>

                <div className="flex bg-gray-900/50 p-1 rounded-full border border-gray-800 backdrop-blur-sm">
                    <button
                        onClick={() => setUserSelection("tracks")}
                        className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${userSelection === "tracks"
                                ? "bg-green-500 text-black shadow-lg shadow-green-500/20"
                                : "text-gray-400 hover:text-white"
                            }`}
                    >
                        Tracks
                    </button>
                    <button
                        onClick={() => setUserSelection("artists")}
                        className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${userSelection === "artists"
                                ? "bg-green-500 text-black shadow-lg shadow-green-500/20"
                                : "text-gray-400 hover:text-white"
                            }`}
                    >
                        Artists
                    </button>
                </div>
            </div>

            {isLoading ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                    {/* Skeleton Loading State */}
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="animate-pulse space-y-3">
                            <div className="aspect-square bg-gray-800 rounded-xl" />
                            <div className="h-4 bg-gray-800 rounded w-3/4" />
                        </div>
                    ))}
                </div>
            ) : (
                <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6'>
                    {topItem.slice(0, 6).map((item, index) => (
                        <div
                            className="group flex flex-col gap-3 transition-transform duration-300 hover:-translate-y-1"
                            key={item.id}
                        >
                            <div className="relative aspect-square overflow-hidden rounded-xl shadow-lg group-hover:shadow-green-500/10 transition-shadow">
                                <Image
                                    src={getImageUrl(item) || "/placeholder.png"}
                                    alt={item.name}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 16vw"
                                />
                                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </div>
                            <p className="font-medium truncate text-gray-200 group-hover:text-green-400 transition-colors">
                                {item.name}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </section>
    )
}