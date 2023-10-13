import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "School Management",
  description: "",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="pngtree-school-icon-for-personal-and-commercial-use-png-image_1044880.jpg" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
