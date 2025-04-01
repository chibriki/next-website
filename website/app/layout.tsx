'use client';
import React from "react";
import "./globals.css";
import { LogoutButton } from "./сomponents/LogoutButton";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <img src="Logo.png" alt="logo" /> <br/>
        <LogoutButton/><br/>
        <a href="project">projects</a> <br/>
        <a href="lifts_page_worker">lifts</a> <br/>
        <a href="worker">workers</a> <br/>
        <a href="chat">general chat</a> <br/>

        {children}
      </body>
    </html>
  );
}
