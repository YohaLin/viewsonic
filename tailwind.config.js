/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        red: {
          500: "#C86B6B",
          400: "#D57A7A",
          300: "#E08B8B",
          200: "#EA9D9D",
          100: "#F8D7D7",
        },
        blue: {
          500: "#1898F4",
          400: "#4E9FFF",
          300: "#8DC1FF",
          200: "#C3DDFF",
          100: "#E3EFFF",
        },
        yellow: {
          500: "#FFC700",
          400: "#FED133",
          300: "#FBE080",
          200: "#FAEDBF",
          100: "#FFFAE9",
        },
        green: {
          500: "#42C2B2",
          400: "#81E492",
          300: "#ADECBB",
          200: "#D3F2DD",
          100: "#EEF9F5",
        },
        neutral: {
          800: "#19213D",
          700: "#353E5C",
          600: "#6D758F",
          500: "#B4B9C9",
          400: "#E1E4ED",
          300: "#F1F3F7",
          200: "#F8FAFF",
          100: "#FFFFFF",
        },
      },
      fontSize: {
      sm: ["12px", "18px"],
      base: ["14px", "22px"],
      md: ["16px", "24px"],
      lg: ["18px", "28px"],

      d1: ["12px", "18px"],
      d2: ["14px", "20px"],
      d3: ["16px", "22px"],
      d4: ["18px", "24px"],
      d5: ["20px", "28px"],
      d6: ["24px", "32px"],
      d7: ["30px", "36px"],
      d8: ["36px", "40px"],
      d9: ["48px", "48px"],
      d10: ["60px", "60px"],
      d11: ["72px", "72px"],
      d12: ["98px", "98px"],
    },
    boxShadow: {
      "neutral-1": "0px 0.5px 2px 0px rgba(25, 33, 61, 0.11)",
    }
    },
  },
  plugins: [],
}

