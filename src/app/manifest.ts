import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Zeniary – The Chatty Empathetic Sidekick",
    short_name: "Zeniary",
    description:
      "Privacy-first journaling app with personalized AI insights for emotional wellness and productivity",
    start_url: "/",
    display: "standalone",
    background_color: "#1A1A1A",
    theme_color: "#000000",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
