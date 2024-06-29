import { ThemeProvider } from "@mui/material/styles";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import theme from "./theme";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Doaile | Search Google by File Type",
  description:
    "Easily find specific file types on Google with Doaile. Streamline your search for PDFs, docs, images, and more. Save time and boost productivity with our powerful file type search tool.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ThemeProvider theme={theme}>
        <body className={inter.className}>{children}</body>
      </ThemeProvider>
    </html>
  );
}
