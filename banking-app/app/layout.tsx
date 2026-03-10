// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SecureBank - Modern Digital Banking Platform",
  description:
    "A secure, modern digital banking platform featuring account management, transaction tracking, and premium user interface design with Next.js.",
  keywords: "banking, fintech, secure, digital wallet, transactions",
  robots: "index, follow",
  authors: [{ name: "Bitrus H Amaza" }],
};

export const viewport = "width=device-width, initial-scale=1.0";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* For dashboard pages, you might want different layout */}
        <div className="page-wrapper">{children}</div>
      </body>
    </html>
  );
}
