import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

// Utility for percent to px conversion
const percentToPxTracking = (percent: number, baseSize: number = 16): string => {
  return `${(percent / 100) * baseSize}px`;
};

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "1rem",
        xl: "2rem",
      },
      screens: {
        sm: "640px",
        xl: "1280px",
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
          dark: "hsl(var(--popover-dark))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        "green-50": "rgba(243, 250, 247, 1)",
        "green-100": "rgba(217, 238, 231, 1)",
        "green-200": "rgba(178, 221, 208, 1)",
        "green-300": "rgba(131, 197, 178, 1)",
        "green-400": "rgba(90, 167, 149, 1)",
        "green-500": "rgba(72, 158, 138, 1)",
        "green-600": "rgba(49, 112, 98, 1)",
        "green-700": "rgba(43, 90, 81, 1)",
        "green-800": "rgba(38, 73, 67, 1)",
        "green-800/10": "rgba(38, 73, 67, 0.1)",
        "green-900": "rgba(35, 62, 57, 1)",
        "green-950": "rgba(16, 35, 33, 1)",
        "white-20": "rgba(255, 255, 255, 0.2)",
        "light-green": "rgba(169, 234, 152, 1)",
        "light-green/30": "rgba(169, 234, 152, 0.3)",
        "light-green/5": "rgba(169, 234, 152, 0.05)",
        "blue-50": "rgba(234, 248, 255, 1)",
        "blue-100": "rgba(208, 238, 255, 1)",
        "blue-200": "rgba(171, 228, 255, 1)",
        "blue-300": "rgba(114, 214, 255, 1)",
        "blue-400": "rgba(48, 188, 255, 1)",
        "blue-500": "rgba(1, 151, 255, 1)",
        "blue-600": "rgba(0, 111, 255, 1)",
        "blue-700": "rgba(0, 85, 255, 1)",
        "blue-800": "rgba(0, 70, 220, 1)",
        "blue-900": "rgba(0, 65, 172, 1)",
        "blue-950": "rgba(5, 50, 128, 1)",
        "red-700": "#102321",
      },
      fontSize: {
        "5xl": ["95px", "85.5px"], // H1
        "4xl": ["60px", "70.3px"], // H2
        "3xl": ["40px", "40px"], // H3
        "2xl": ["32px", "37.5px"], // Large buttons text
        xl: ["24px", "28px"], // H4
        lg: ["20px", "23.44px"], // Large text
        base: ["18px", "26px"], // Body text
        sm: ["16px", "18.5px"], // Small buttons text
        xs: ["14px", "20px"], // Small text
        "2xs": ["10px", "12px"], // Legend text
      },
      tracking: {
        wide: percentToPxTracking(1), // 1% lg
        wider: percentToPxTracking(2), // 2% H1, H2, Large buttons text
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        marquee: "marquee 20s linear infinite",
      },
      transitionDuration: {
        "2000": "2000ms",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
