"use client";
import Navbar from "@/components/ui/Navbar";
import { Gobusprovider } from "./context";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <Gobusprovider>
      <html lang="en">
        <head>
          <title>GoBus</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </head>
        <body>
          <Navbar />
          {children}
        </body>
      </html>
    </Gobusprovider>
  );
}
