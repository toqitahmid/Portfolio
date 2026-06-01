import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Providers from "@/providers/NextThemeProvider";
import { Navbar } from "./components/Navbar";
import StarBackground from "./components/StarBackground";
import Footer from "./components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Toqi Tahmid",
  description: "Full Stack MERN Developer from Dhaka, Bangladesh",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased overflow-x-hidden`}
    >
      <body className="min-h-full flex flex-col overflow-x-hidden">
        <Providers>
          <Navbar></Navbar>
          <StarBackground></StarBackground>
          {children}
          <Footer></Footer>
        </Providers>
      </body>
    </html>
  );
}
