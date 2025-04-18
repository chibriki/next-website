"use client";
import React from "react";
import "./globals.css";
import { LogoutButton } from "./сomponents/LogoutButton";

import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname();
  const router = useRouter();

  if (pathname === "/login") {
    return (
      <html lang="en">
        <body>{children}</body>
      </html>
    );
  }
  return (
    <html lang="en">
      <body>
        <div className="layout">
          <div className="sidebar">
            <div
              className="sidebar_link"
              onClick={() => router.push("/projects")}
            >
              <img src="/home.svg" />
              <div>Projects</div>
            </div>

            <div className="sidebar_link" onClick={() => router.push("/lifts")}>
              <img src="/home.svg" />
              <div>Lifts</div>
            </div>

            <div
              className="sidebar_link"
              onClick={() => router.push("/workers")}
            >
              <img src="/home.svg" />
              <div>Workers</div>
            </div>

            <div
              className="sidebar_link"
              onClick={() =>
                (window.location.href =
                  "https://www.youtube.com/watch?v=FQtPSH2ibYQ")
              }
            >
              <img src="/home.svg" />
              <div>General Chat</div>
            </div>
          </div>
          <div className="top_bar">
            <LogoutButton />
          </div>
        </div>
        {children}
      </body>
    </html>
  );
}
