import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { cn } from "@/lib/utils";
import SearchForm from "@/lib/SearchForm";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'NextJs Movies',
  description: 'This a Retro Style Movie Page',
  icons: {
    icon: '/favicon.png',
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(inter.className, "flex justify-center py-12")}>
        <div className="max-w-[40rem] flex-grow flex flex-col gap-y-12">
          <header className="flex justify-between gap-4">
            <div className="text-3xl font-bold underline text-none">
              <Link href="/">NextJs Movie</Link>
            </div>
            <div>
              <SearchForm/>
            </div>
          </header>
          {children}
          <footer className="mb-12 space-x-2">
            <a target="_blank" href="https://github.com/mrinmoymondalreal/NextJsMovies">Code</a>
            <span>•</span>
            <a target="_blank" href="https://github.com/mrinmoymondalreal">Mrinmoy Mondal</a>
            <span>•</span>
            <a target="_blank" href="https://mrinmoymondalreal.github.io/website/">Portfolio Website</a>
          </footer>
        </div>
      </body>
    </html>
  );
}
