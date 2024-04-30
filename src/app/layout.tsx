"use client"
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Nav from "./components/nav";
import { ThemeProvider } from "@mui/material";
import theme from "./styles/theme";

const inter = Inter({ subsets: ["latin"] });



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ThemeProvider theme={theme}>
      <body className={inter.className}>
        <Nav/>{children}</body>
        </ThemeProvider>
    </html>
  );
}
