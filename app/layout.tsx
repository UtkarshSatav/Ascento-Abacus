import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ascento Abacus - Unlock Your Child's Brain Power",
  description: "Advanced abacus training, mental arithmetic, brain gym, and related programs for children. Join our franchise family and start your own learning center.",
  keywords: "abacus training, mental arithmetic, brain gym, Vedic maths, handwriting improvement, calligraphy, children education, franchise opportunities",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${outfit.variable} antialiased font-sans`}
      >
        {children}
      </body>
    </html>
  );
}
