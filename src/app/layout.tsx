import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SAGA - by 61",
  description: "SAGA.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
