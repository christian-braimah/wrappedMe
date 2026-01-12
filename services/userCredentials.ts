import { useState, useEffect } from "react";

export function useUserData() {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const userName = localStorage.getItem("userName");
            const email = localStorage.getItem("email");
            const image = localStorage.getItem("image");
            const accessToken = localStorage.getItem("accessToken");
            const refreshToken = localStorage.getItem("refreshToken");

            if (accessToken) {
                setUserData({
                    userName,
                    email,
                    image,
                    accessToken,
                    refreshToken
                } as any);
            }
        }
    }, [userData]);

    const storedData = JSON.stringify(userData);
    console.log("Stored Data == ", storedData);

    return storedData;
}
