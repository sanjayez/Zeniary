import type { Metadata, Viewport } from "next";
import { Roboto, Dawning_of_a_New_Day } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PostHogProvider } from "./components/common/PosthogProvider";
import ClientLayout from "./ClientLayout";
import StructuredData from "./components/common/StructuredData";

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
  title:
    "Zeniary – The Chatty Empathetic Sidekick | Privacy-First Journaling App",
  description:
    "Transform your journaling experience with Zeniary, a privacy-first journaling app that combines voice and text input with personalized AI insights. Enhance emotional wellness and boost productivity with your empathetic digital sidekick.",
  keywords: [
    "privacy-first journaling app",
    "personalized AI journaling",
    "voice journaling for wellness",
    "emotional wellness app",
    "productivity journal",
    "AI wellness companion",
    "secure digital journal",
    "mental health journaling",
    "voice-to-text journal",
    "personal growth assistant",
  ],
  authors: [{ name: "Zeniary Team" }],
  creator: "Zeniary",
  publisher: "Zeniary",
  formatDetection: {
    telephone: false,
  },
  metadataBase: new URL("https://zeniary.app"),
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://zeniary.app",
    title: "Zeniary – Your Chatty Empathetic Sidekick",
    description:
      "Elevate your journaling with Zeniary, where privacy meets AI. Voice or type your thoughts and receive personalized insights to enhance emotional wellness and productivity.",
    siteName: "Zeniary",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Zeniary - Privacy-First Journaling App with AI Insights",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Zeniary – Privacy-First Journaling with AI Insights",
    description:
      "Journal your way to better emotional wellness and productivity with voice and text input, powered by personalized AI that respects your privacy.",
    creator: "@zeniary_app",
    images: ["/twitter-image.jpg"],
  },
  verification: {
    google: "google-site-verification-code", // Replace with actual verification code
  },
  category: "Wellness & Productivity",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#000000",
  colorScheme: "dark light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <StructuredData type="SoftwareApplication" />
      </head>
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
