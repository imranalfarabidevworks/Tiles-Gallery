/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ["'Playfair Display'", "serif"],
        body: ["'DM Sans'", "sans-serif"],
      },
      colors: {
        clay: "#C4A882",
        stone: "#8B7355",
        cream: "#F5EFE6",
        charcoal: "#2C2C2C",
        terracotta: "#C4622D",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        tiles: {
          primary: "#C4622D",
          secondary: "#8B7355",
          accent: "#C4A882",
          neutral: "#2C2C2C",
          "base-100": "#F5EFE6",
          "base-200": "#EDE4D6",
          "base-300": "#DDD0BC",
          info: "#7BA4C0",
          success: "#6B9E6E",
          warning: "#D4A84B",
          error: "#B85450",
        },
      },
    ],
  },
};
