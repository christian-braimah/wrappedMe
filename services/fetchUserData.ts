export async function fetchUserData(accessToken: string) {
    const res = await fetch("https://api.spotify.com/v1/me", {
        method: "GET",
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    })

    if (!res.ok) {
        throw new Error("Failed to fetch user data");
    }

    return res.json();
}