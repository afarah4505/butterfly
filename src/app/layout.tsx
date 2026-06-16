import type { Metadata } from "next";
import { Cormorant_Garamond, Syne } from "next/font/google";
import "./globals.css";

const headingFont = Cormorant_Garamond({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const bodyFont = Syne({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "BUTTERFLY | The Meme Coin Metamorphosis",
  description:
    "An immersive single-page crypto storytelling experience where every action creates a butterfly effect.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${headingFont.variable} ${bodyFont.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#071820] text-[#f6f0df]">{children}</body>
    </html>
  );
}
