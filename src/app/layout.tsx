import type { Metadata } from "next";
import { Roboto, Dawning_of_a_New_Day } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
const roboto = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
});

export const dawning = Dawning_of_a_New_Day({
  weight: ["400"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Zeniary - Your Thoughts, Smarter",
  description: "Zeniary - Your Thoughts, Smarter",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.className} antialiased text-white`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
