import type { Metadata, Viewport } from "next";
import { Roboto, Dawning_of_a_New_Day } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PostHogProvider } from "./components/common/PosthogProvider";
import ClientLayout from "./ClientLayout";

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

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#000000",
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
        <PostHogProvider>
          <ClientLayout>{children}</ClientLayout>
        </PostHogProvider>
      </body>
    </html>
  );
}
