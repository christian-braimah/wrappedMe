import { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";

export interface SpotifyImage {
    url: string;
    height: number;
    width: number;
}

export interface SpotifyArtist {
    id: string;
    name: string;
    images: SpotifyImage[];
    genres?: string[];
    popularity?: number;
    external_urls: {
        spotify: string;
    }
    type: 'artist';
}

export interface SpotifyAlbum {
    images: SpotifyImage[];
    name: string;
}

export interface SpotifyTrack {
    id: string;
    name: string;
    album: SpotifyAlbum;
    artists: SpotifyArtist[];
    external_urls: {
        spotify: string;
    }
    type: 'track';
}

export type SpotifyItem = SpotifyTrack | SpotifyArtist;

export function useFetchTopItem(type: "tracks" | "artists") {
    const { data: session, status } = useSession();
    const [topItem, setTopItem] = useState<SpotifyItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);


    const topItemsURL = `https://api.spotify.com/v1/me/top/${type}`;

    const fetcher = useCallback(async () => {
        if (!session?.accessToken) {
            return (console.log("No Access Token for Top Items"))
        }
        try {
            const res = await fetch(topItemsURL, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${session.accessToken}`,
                },
            });
            if (!res.ok) throw new Error("Failed to fetch top items");


            const data = await res.json();
            setTopItem(data.items || []);
            return data;
        }
        catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }

    }, [session?.accessToken, topItemsURL])

    useEffect(() => {
        if (status === "authenticated") {
            fetcher();
        }
    }, [status, fetcher]);

    return { fetcher, topItem, isLoading }
}