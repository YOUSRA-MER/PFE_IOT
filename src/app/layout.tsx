import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Systeme de Gestion de Pointage",
  description: "Next.js Management System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark"> {/* Add className="dark" to enable dark mode globally */}
      <body className={`${inter.className} bg-white dark:bg-gray-900`}>{children}</body>
    </html>
  );
}