
import type { Metadata } from "next";
import { Zalando_Sans_Expanded, Hanken_Grotesk } from "next/font/google";
import "./globals.css";
import AuthProvider from "./AuthProvider";
import Navigation from "../layouts/Navigation";





const zalandoSansExpanded = Zalando_Sans_Expanded({
  variable: "--font-zalando-sans-expanded",
  subsets: ["latin"],
});

const hankenGrotesk = Hanken_Grotesk({
  variable: "--font-hanken-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Wrapped Me",
  description: "Wrapped Me",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${zalandoSansExpanded.variable} ${hankenGrotesk.variable} antialiased`}>
          <AuthProvider>
            <Navigation>
                {children}
            </Navigation>
          </AuthProvider>
      </body>
    </html>
  );
}
