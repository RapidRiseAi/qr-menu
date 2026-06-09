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
          night: "#07111d",
          navy: "#002f5f",
          blue: "#123d68",
          charcoal: "#232021",
          orange: "#f47c20",
          gold: "#f0ab00",
          sky: "#52c6e2",
          aqua: "#52c6e2",
          cream: "#f2e9df",
          green: "#25d366",
        },
      },
      boxShadow: {
        glow: "0 20px 80px rgba(214,168,79,.22)",
        orange: "0 16px 48px rgba(244,124,32,.28)",
        aqua: "0 16px 48px rgba(82,198,226,.22)",
      },
    },
  },
  plugins: [],
};
export default config;
