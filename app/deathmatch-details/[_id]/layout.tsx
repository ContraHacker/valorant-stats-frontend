import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Deathmatch Details"
};

export default function DMDetailsLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return children;
}