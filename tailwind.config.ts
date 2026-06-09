import type { Config } from "tailwindcss";
const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        charcoal: "#0D0D0F",
        gold: "#D6A84F",
        hennies: {
          navy: "#071a2f",
          blue: "#0b2440",
          orange: "#ff7a1a",
          aqua: "#19d3d1",
          cream: "#fff8ea",
        },
      },
      boxShadow: {
        glow: "0 20px 80px rgba(214,168,79,.22)",
        orange: "0 16px 48px rgba(255,122,26,.28)",
        aqua: "0 16px 48px rgba(25,211,209,.22)",
      },
    },
  },
  plugins: [],
};
export default config;
