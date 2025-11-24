/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // This fixes the "border-border" crash by defining the color
        border: "var(--text-secondary)", 
        background: "var(--background-page)",
        foreground: "var(--text-primary)",
      },
    },
  },
  plugins: [],
}
