import { useSession } from "next-auth/react";
import { useState, useEffect, useCallback } from "react";

export function useFetchTracks() {
    const { data: session, status } = useSession();
    const [tracks, setTracks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Spotify Tracks Endpoint
    const tracksURL = "https://api.spotify.com/v1/me/tracks"; 

    const fetcher = useCallback(async () => {
    if (!session?.accessToken) 
        return(console.log("No Access Token for Tracks"));

    try {
        const res = await fetch(tracksURL, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${session.accessToken}`,
        },
    });

    if (!res.ok) throw new Error("Failed to fetch tracks");

    const data = await res.json();
        setTracks(data.items || []); 
            return data;
    } 
    catch (error) {
        console.error(error);
    } finally {
    setIsLoading(false);
    }
  }, [session?.accessToken]); // Only recreate if token changes

  // 2. Add a dependency array to useEffect to prevent infinite loops
    useEffect(() => {
            if (status === "authenticated") {
                fetcher();
        }   
    }, [status, fetcher]);
   // Runs when logged in or when fetcher changes

    return { fetcher, session, tracks, isLoading };
}