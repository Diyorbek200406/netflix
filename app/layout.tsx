import "./globals.css";
import { ReactNode } from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/provider";
import { Toaster } from "@/components/ui/toaster";
import GlobalContext from "@/context";
const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = { title: "Netflix", description: "Netflix built in Next Js" };
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <GlobalContext>
            {children}
            <Toaster />
          </GlobalContext>
        </ThemeProvider>
      </body>
    </html>
  );
}
