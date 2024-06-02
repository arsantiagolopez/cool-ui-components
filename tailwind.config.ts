import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-text": "var(--primary-text)",
        "secondary-text": "var(--secondary-text)",
        "tertiary-text": "var(--tertiary-text)",
        link: "var(--link)",
        "link-hover": "var(--link-hover)",
        background: "var(--background)",
        "background-hover": "var(--background-hover)",
        borders: "var(--borders)",
        "highlight-background": "var(--highlight-background)",
        placeholder: "var(--placeholder)",
        "primary-button": "var(--primary-button)",
        "primary-button-hover": "var(--primary-button-hover)",
        "secondary-background": "var(--secondary-background)",
        "tertiary-background": "var(--tertiary-background)",
        "banner-background": "var(--banner-background)",
        "hover-overlay": "var(--hover-overlay)",
        stroke: "var(--stroke)",
        "elevated-separator": "var(--elevated-separator)",
      },
      spacing: {
        dvh: "100dvh",
        "nav-height": "var(--nav-height)",
      },
    },
  },
  plugins: [],
};
export default config;
