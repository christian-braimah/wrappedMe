
import type { Metadata } from "next";
import { Zalando_Sans_Expanded, Hanken_Grotesk } from "next/font/google";
import "./globals.css";
import AuthProvider from "./AuthProvider";
import Navigation from "../components/Navigation";

import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import "./my-styles.css";
import "@radix-ui/themes/layout/tokens.css";
import "@radix-ui/themes/layout/components.css";
import "@radix-ui/themes/layout/utilities.css";


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
        <Theme accentColor="blue">
          <AuthProvider>
            <Navigation>
                {children}
            </Navigation>
          </AuthProvider>
        </Theme>
      </body>
    </html>
  );
}
