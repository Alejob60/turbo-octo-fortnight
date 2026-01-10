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
        background: "var(--background)",
        foreground: "var(--foreground)",
        // Paleta de colores para "Ciberseguridad Financiera"
        "audit-bg": "#020617", // Fondo profundo, casi negro
        "audit-card": "#0F172A", // Paneles elevados ligeramente más claros
        "audit-border": "#1E293B", // Bordes sutiles
        "audit-risk": "#EF4444", // Rojo Alerta DIAN
        "audit-money": "#10B981", // Verde Recuperación
        "audit-warn": "#F59E0B", // Naranja Precaución
        "audit-accent": "#3B82F6", // Azul Tecnológico
        "deep-space": {
          900: "#0C0C1E",
          800: "#1A1A3A",
          700: "#282856",
        },
        "electric-blue": {
          500: "#00BFFF",
          600: "#00A9E0",
        },
        "plasma-orange": {
          500: "#FF4500",
          600: "#E03E00",
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        mono: ["Roboto Mono", "monospace"],
      },
      boxShadow: {
        'glow-risk': '0 0 20px -5px rgba(239, 68, 68, 0.3)',
        'glow-money': '0 0 20px -5px rgba(16, 185, 129, 0.3)',
      }
    },
  },
  darkMode: "class",
  plugins: [],
  corePlugins: {
    preflight: true,
  },
};