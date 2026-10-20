/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Georgia", "serif"],
        numeric: ["var(--font-numeric)", "system-ui", "sans-serif"],
      },
      fontWeight: {
        400: "400",
        500: "500",
        600: "600",
        700: "700",
        800: "800",
      },
      colors: {
        // SEPL logo blue (#2E3192)
        indigo: {
          50: "#eef0f9",
          100: "#d8dbf0",
          200: "#b1b6e1",
          300: "#8a91d2",
          400: "#636cc3",
          500: "#454ab0",
          600: "#2e3192",
          700: "#252878",
          800: "#1c1f5e",
          900: "#141646",
          950: "#0c0d2e",
        },
        navy: {
          50: "#eef0f9",
          100: "#d8dbf0",
          200: "#b1b6e1",
          300: "#8a91d2",
          400: "#636cc3",
          500: "#454ab0",
          600: "#2e3192",
          700: "#252878",
          800: "#1c1f5e",
          900: "#141646",
          950: "#0c0d2e",
        },
        sepl: {
          blue: "#2e3192",
          red: "#ed1c24",
        },
        steel: {
          50: "#f8fafc",
          100: "#f1f5f9",
          200: "#e2e8f0",
          300: "#cbd5e1",
          400: "#94a3b8",
          500: "#64748b",
          600: "#475569",
          700: "#334155",
          800: "#1e293b",
          900: "#0f172a",
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        "fade-up": "fadeUp 0.6s ease-out forwards",
        "slide-left": "slideLeft 0.8s ease-out forwards",
        "marquee-ltr": "marqueeLtr 55s linear infinite",
        "marquee-rtl": "marqueeRtl 55s linear infinite",
        "marquee-y-up": "marqueeYUp 40s linear infinite",
        "marquee-y-down": "marqueeYDown 40s linear infinite",
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideLeft: {
          "0%": { opacity: "0", transform: "translateX(40px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        marqueeLtr: {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0)" },
        },
        marqueeRtl: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        marqueeYUp: {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(-50%)" },
        },
        marqueeYDown: {
          "0%": { transform: "translateY(-50%)" },
          "100%": { transform: "translateY(0)" },
        },
      },
      boxShadow: {
        glass: "0 8px 32px 0 rgba(31, 38, 135, 0.08)",
        card: "0 2px 20px 0 rgba(46, 49, 146, 0.08)",
        "card-hover": "0 8px 40px 0 rgba(46, 49, 146, 0.15)",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
