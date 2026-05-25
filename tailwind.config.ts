import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#F4EFE3",
        surface: "#FBF8EF",
        paper: "#EDE6D3",
        ink: {
          DEFAULT: "#0F201A",
          dim: "rgba(15,32,26,0.68)",
          mute: "rgba(15,32,26,0.44)",
        },
        line: "rgba(15,32,26,0.12)",
        green: {
          DEFAULT: "#1E3A2F",
          deep: "#0F201A",
        },
        terra: {
          DEFAULT: "#D66A3C",
          deep: "#B8521F",
          lt: "#EAA07C",
        },
        clay: "#E8C9A8",
      },
      fontFamily: {
        serif: ["var(--font-fraunces)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains)", "ui-monospace", "monospace"],
      },
      fontSize: {
        h1: ["48px", { lineHeight: "0.92", letterSpacing: "-1.8px", fontWeight: "300" }],
        h2: ["34px", { lineHeight: "0.98", letterSpacing: "-1px", fontWeight: "300" }],
        h3: ["26px", { lineHeight: "1.05", letterSpacing: "-0.6px", fontWeight: "300" }],
        body: ["15px", { lineHeight: "1.55" }],
        micro: ["10px", { letterSpacing: "1.6px", lineHeight: "1.2" }],
      },
      transitionTimingFunction: {
        "cta-wipe": "cubic-bezier(0.65, 0, 0.35, 1)",
      },
      animation: {
        "pulse-live": "pulseLive 1.4s ease-in-out infinite",
      },
      keyframes: {
        pulseLive: {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.5", transform: "scale(1.3)" },
        },
      },
      maxWidth: {
        content: "640px",
        "hero-sub": "330px",
        "hero-sub-md": "440px",
      },
    },
  },
  plugins: [],
};

export default config;
