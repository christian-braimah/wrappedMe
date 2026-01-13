
'use client'

import { useSession } from "next-auth/react";
import { signIn } from "next-auth/react";

import "../../public/css/login.css"


import { useRouter } from 'next/navigation';
export default function Login() {
    const router = useRouter();

    const { data: session } = useSession();

    if (session) {
        router.push("/dashboard");
        return null;
    } else {
        return (
            <main className='flex flex-col items-center justify-center h-screen'>
                <div className='login-wrapper flex flex-col items-center justify-center'>
                    <h1>Welcome to Wrapped Me</h1>
                    <p>Login to your account</p>
                    <button
                        onClick={() => signIn()}
                        className='bg-black text-white p-2 rounded-lg'>
                        Login with Spotify
                    </button>
                </div>
            </main>
        )
    }
}