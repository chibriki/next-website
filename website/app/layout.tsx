'use client';
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <h1>hello world</h1>
        {children}
      </body>
    </html>
  );
}
