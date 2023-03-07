import "./globals.css";
import React from "react";
import { GlobalContextProvider } from "./Context/store";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import Navbar from "./navbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body>
        <UserProvider>
          <Navbar />
          <GlobalContextProvider>{children}</GlobalContextProvider>
        </UserProvider>
      </body>
    </html>
  );
}
