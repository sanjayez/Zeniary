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
      keyframes: {
        "border-spin": {
          "100%": { transform: "rotate(360deg)" },
        },
      },
      animation: {
        "border-spin": "border-spin 7s linear infinite",
      },
      typography: {
        DEFAULT: {
          css: {
            color: '#fff',
            a: {
              color: '#50BA65',
              '&:hover': {
                color: '#3a8a4a',
              },
            },
            h1: {
              color: '#fff',
            },
            h2: {
              color: '#fff',
            },
            h3: {
              color: '#fff',
            },
            h4: {
              color: '#fff',
            },
            strong: {
              color: '#fff',
            },
            code: {
              color: '#fff',
            },
            blockquote: {
              color: '#d1d5db',
            },
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
} satisfies Config;
