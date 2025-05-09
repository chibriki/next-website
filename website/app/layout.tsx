"use client";
import React, { useEffect, useState } from "react";
import "./globals.css";
import { LogoutButton } from "./сomponents/LogoutButton";

import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

type User = {
  name: string;
  role: string;
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  const fetchUser = () => {
    const cookies = document.cookie
      .split("; ")
      .reduce((acc: any, cookieStr) => {
        const [key, value] = cookieStr.split("=");
        acc[key] = value;
        return acc;
      }, {});

    const id_user = cookies["id_user"];
    const role = cookies["userRole"];

    if (id_user) {
      fetch(`/api/get-worker/${id_user}`)
        .then((res) => res.json())
        .then((data) => {
          setUser({ name: data.name, role: role || "Unknown" });
        });
    }
  };

  const isLoginPage = pathname === "/login";

  useEffect(() => {
    fetchUser();
  }, [pathname]);

  return (
    <html lang="en">
      <body>
        {isLoginPage ? (
          children
        ) : (
          <>
            <div className="layout">
              <div className="sidebar">
                <div
                  className="sidebar_link"
                  onClick={() => router.push("/projects")}
                >
                  <img src="/home.svg" />
                  <div>Projects</div>
                </div>

                <div
                  className="sidebar_link"
                  onClick={() => router.push("/lifts")}
                >
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
                  onClick={() => router.push("/chat")}
                >
                  <img src="/home.svg" />
                  <div>Chat</div>
                </div>
              </div>
              <div className="top_bar">
                <LogoutButton />
                <div className="user-info">
                  {!user ? (
                    <div>Loading user...</div>
                  ) : (
                    <div className="user-info">
                      <div className="user-name">{user.name}</div>
                      <div className="user-role">{user.role}</div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            {children}
          </>
        )}
      </body>
    </html>
  );
}
