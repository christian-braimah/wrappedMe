import NextAuth from "next-auth/next";
import SpotifyProvider from "next-auth/providers/spotify";
import { type NextAuthOptions } from "next-auth";

// Refresh access token after expiration
async function refreshAccessToken(token:any) {
    try {

        const url = "https://accounts.spotify.com/api/token";
        
        // Spotify requires Basic Auth (Base64 encoded clientID:clientSecret)
        const basicAuth = Buffer.from(
            `${process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID}:${process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET}`
        ).toString("base64");

        const response = await fetch(url, {
            method: "POST",
            headers: {
                Authorization: `Basic ${basicAuth}`,
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
                grant_type: "refresh_token",
                refresh_token: token.refreshToken,
            }),
        });

        const refreshedTokens = await response.json();

        if (!response.ok) throw refreshedTokens;

        return {
            ...token,
            accessToken: refreshedTokens.access_token,
            // Spotify provides expires_in in seconds (usually 3600)
            accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
            // Fallback to old refresh token if a new one isn't provided
            refreshToken: refreshedTokens.refresh_token ?? token.refreshToken,
        };
    } catch (error) {
        console.error("Error refreshing access token", error);
        return {
            ...token,
            error: "RefreshAccessTokenError",
        };
    }
}

const options: NextAuthOptions = {
    providers: [
        SpotifyProvider({
            authorization: {
                params: {
                    // This is very important
                    // It specifies the kind of user data you can access
                    scope: "user-read-email user-library-read playlist-read-private playlist-modify-private playlist-modify-public",
                },
            },
            clientId: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID || "",
            clientSecret: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET || "",
        }),
    ],
    callbacks: {
        async jwt({ token, account, user }) {
            //Initial sign in
            if (account && user) {
                return {
                    accessToken: account.access_token,
                    refreshToken: account.refresh_token,
                    // Convert expires_at (seconds) to milliseconds
                    accessTokenExpires: account.expires_at ? account.expires_at * 1000 : 0,
                    user,
                };
            }

            // Return previous token if the access token has not expired yet
            if (Date.now() < (token.accessTokenExpires as number)) {
                return token;
            }

            // Access token has expired, try to update it
            return await refreshAccessToken(token);
        },

        async session({ session, token }: any) {
            session.accessToken = token.accessToken;
            session.error = token.error;
            session.user = token.user;
            session.refreshToken = token.refreshToken;
            return session;
        }
    }
}

const handler = NextAuth(options);
export { handler as GET, handler as POST };