import type { Config } from "tailwindcss";
const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: { charcoal: "#0D0D0F", gold: "#D6A84F" },
      boxShadow: { glow: "0 20px 80px rgba(214,168,79,.22)" },
    },
  },
  plugins: [],
};
export default config;
