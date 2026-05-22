export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))"
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))"
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))"
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))"
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))"
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))"
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))"
        }
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)"
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" }
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        "fade-down": {
          "0%": { opacity: "0", transform: "translateY(-12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        "fade-out": {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" }
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" }
        },
        "intro-pulse-bg": {
          "0%": { transform: "translate(-50%, -50%) scale(0.8)", opacity: "0.5" },
          "100%": { transform: "translate(-50%, -50%) scale(1.1)", opacity: "0.8" }
        },
        "intro-glitch-in": {
          "0%": {
            opacity: "0",
            transform: "scale(2)",
            filter: "blur(10px)",
            "clip-path": "polygon(0 0, 100% 0, 100% 0, 0 0)"
          },
          "20%": {
            opacity: "1",
            transform: "scale(1)",
            filter: "blur(0)",
            "clip-path": "polygon(0 0, 100% 0, 100% 100%, 0 100%)"
          },
          "21%": { transform: "translateX(5px)" },
          "22%": { transform: "translateX(-5px)" },
          "23%": { transform: "translateX(0)" },
          "100%": { "clip-path": "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }
        },
        "intro-glitch-top": {
          "0%": { "clip-path": "polygon(0 0, 100% 0, 100% 33%, 0 33%)", transform: "translate(0)" },
          "20%": { "clip-path": "polygon(0 0, 100% 0, 100% 33%, 0 33%)", transform: "translate(-2px, 2px)" },
          "40%": { "clip-path": "polygon(0 60%, 100% 60%, 100% 100%, 0 100%)", transform: "translate(2px, -2px)" },
          "60%": { "clip-path": "polygon(0 20%, 100% 20%, 100% 80%, 0 80%)", transform: "translate(-2px, 2px)" },
          "80%": { "clip-path": "polygon(0 40%, 100% 40%, 100% 60%, 0 60%)", transform: "translate(2px, -2px)" },
          "100%": { "clip-path": "polygon(0 50%, 100% 50%, 100% 50%, 0 50%)", transform: "translate(0)" }
        },
        "intro-glitch-bottom": {
          "0%": { "clip-path": "polygon(0 60%, 100% 60%, 100% 100%, 0 100%)", transform: "translate(0)" },
          "20%": { "clip-path": "polygon(0 0, 100% 0, 100% 40%, 0 40%)", transform: "translate(2px, -2px)" },
          "40%": { "clip-path": "polygon(0 40%, 100% 40%, 100% 60%, 0 60%)", transform: "translate(-2px, 2px)" },
          "60%": { "clip-path": "polygon(0 10%, 100% 10%, 100% 90%, 0 90%)", transform: "translate(2px, -2px)" },
          "100%": { "clip-path": "polygon(0 70%, 100% 70%, 100% 80%, 0 80%)", transform: "translate(0)" }
        },
        "intro-slide-down-fade": {
          "0%": { opacity: "0", transform: "translateY(-30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        "intro-typewriter": {
          "0%": { width: "0", opacity: "1" },
          "100%": { width: "100%", opacity: "1" }
        },
        "intro-blink-caret": {
          "0%, 100%": { borderColor: "transparent" },
          "50%": { borderColor: "rgba(255,255,255,0.8)" }
        }
      },
      animation: {
        "fade-in": "fade-in 450ms ease-out both",
        "fade-up": "fade-up 550ms ease-out both",
        "fade-down": "fade-down 450ms ease-out both",
        "fade-out": "fade-out 350ms ease-out both",
        float: "float 3.5s ease-in-out infinite",
        "intro-pulse-bg": "intro-pulse-bg 4s ease-in-out infinite alternate",
        "intro-glitch-in": "intro-glitch-in 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both",
        "intro-glitch-top": "intro-glitch-top 2s infinite linear alternate-reverse",
        "intro-glitch-bottom": "intro-glitch-bottom 1.5s infinite linear alternate-reverse",
        "intro-slide-down-fade": "intro-slide-down-fade 800ms ease-out both",
        "intro-typewriter": "intro-typewriter 1.5s steps(30, end) forwards",
        "intro-blink-caret": "intro-blink-caret 750ms step-end infinite",
        "intro-typewriter-blink": "intro-typewriter 1.5s steps(30, end) forwards, intro-blink-caret 750ms step-end infinite"
      }
    }
  },
  plugins: []
};
