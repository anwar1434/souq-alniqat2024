import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        message: 'message 8s linear ',
      },
      keyframes: {
        message: {
          "0%, 100%": { right: "-500px" },
          "50%": { right: "0" },
        },
      },
    },
  },
  plugins: [require("daisyui")],
};
export default config;
