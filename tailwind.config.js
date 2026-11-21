/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eef2ff",
          100: "#e0e7ff",
          500: "#6366f1",
          600: "#4f46e5",
          700: "#4338ca",
          900: "#312e81",
        },
        discord: {
          blurple: "#5865F2",
          dark: "#1e1f22",
          darker: "#111214",
          card: "#2b2d31",
          text: "#dbdee1",
          muted: "#949ba4",
        },
      },
    },
  },
  plugins: [],
};
