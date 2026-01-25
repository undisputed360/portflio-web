// app/auth-layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../app/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Banking App | Authentication",
  description: "Secure authentication for banking application",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="auth-container">{children}</main>
      </body>
    </html>
  );
}
