import type { Metadata } from "next";
import { Roboto, Dawning_of_a_New_Day } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const roboto = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
});

const dawning = Dawning_of_a_New_Day({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-dawning",
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
      <body
        className={`${roboto.className} ${dawning.variable} antialiased text-white`}
      >
        <ToastContainer
          className="!max-w-[calc(100%-2rem)] !left-[50%] !-translate-x-1/2"
          position="top-center"
        />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
