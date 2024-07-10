import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";

const font = Rubik({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Baracc",
    description: "Drown in the misery of your Valorant stats."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en">
            <body className={ `${font.className} m-16 mt-8` }>{ children }</body>
        </html>
    );
}
