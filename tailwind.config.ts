import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#FFFFFF",
        secondary: "#2C5364",
        accent: "#F09819",
      },
      fontFamily: {
        sans: ['var(--font-body)'],
        heading: ['var(--font-heading)'],
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'slide-up': 'slideUp 0.8s ease-out forwards',
        'scale-in': 'scaleIn 0.6s ease-out forwards',
        'float': 'float 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
export default config;