import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tweetie",
  description: "Produce beautiful screenshots of twitter posts with ease.",
  //Opengraph
  openGraph: {
    type: "website",
    images: [
      {
        url: "https://i.postimg.cc/cJvbqgRR/357-1x-shots-so.webp",
        width: 1200,
        height: 630,
        alt: "SnapSite",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
