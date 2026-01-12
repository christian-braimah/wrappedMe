import NextAuth from "next-auth/next";
import SpotifyProvider from "next-auth/providers/spotify";
import { type NextAuthOptions } from "next-auth"

const options: NextAuthOptions = {
    providers: [
        SpotifyProvider({
            authorization: {
                params: {
                    scope: "user-read-email playlist-read-private playlist-modify-private playlist-modify-public",
                },
            },
            clientId: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID || "",
            clientSecret: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET || "",
        }),
    ],
    pages: {
        error: "/signin",
        signOut: "/",
    },
    callbacks: {
        async jwt({ token, account }) {
            if (account) {
                token.accessToken = account.access_token;
            }
            return token;
        },

        async session({ session, token }) {
            session.accessToken = token.accessToken;
            return session;
        }
    }
}

const handler = NextAuth(options);
export { handler as GET, handler as POST };