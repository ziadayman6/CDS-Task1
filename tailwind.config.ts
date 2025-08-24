// tailwind.config.ts
import type { Config } from "tailwindcss";

export default {
  darkMode: "class", // already default, but being explicit
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
} satisfies Config;
