/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        'rose-red': '#ffea00', 
        'rose-pink': '#F5B7B1', 
        'ivory': '#FDF3E7',     
        'leaf-green': '#7DCEA0', 
      },
    },
  },
  plugins: [],
};
