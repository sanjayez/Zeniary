import type { Config } from "tailwindcss";

export default {
  //   darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        heroBannerImg: `url('/green-horizon.webp')`,
        heroBannerImgWithoutGlow: `url('/green-horizon-without-glow.webp')`,
      },
      rotate: {
        60: "60deg",
        135: "135deg",
        180: "180deg",
        210: "210deg",
        270: "270deg",
      },
      fontSize: {
        "hero-title-above-medium": "64px",
        "hero-title-small": "42px",
      },
      fontFamily: {
        dawning: ["var(--font-dawning)"],
      },
    },
  },
  plugins: [],
} satisfies Config;
