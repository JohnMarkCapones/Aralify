import type { Metadata } from "next";
import { Archivo_Black, Lexend, Geist_Mono } from "next/font/google";
import { Providers } from "@/providers";
import "./globals.css";

const archivoBlack = Archivo_Black({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-archivo-black",
});

const lexend = Lexend({
  subsets: ["latin"],
  variable: "--font-lexend",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Aralify - Learn to Code",
    template: "%s | Aralify",
  },
  description:
    "Learn to code through interactive challenges at your own pace and difficulty.",
  keywords: ["learn to code", "programming", "coding", "education", "tutorial"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${archivoBlack.variable} ${lexend.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
