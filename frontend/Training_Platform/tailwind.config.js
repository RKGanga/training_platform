/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      lineClamp: {
        2: '2',
      },
      colors: {
        primary: {
          300: '#6EE7F9',
          hover: '#22D3EE',
        },
        secondary: {
          400: '#A78BFA',
        },
        success: '#34D399',
        warning: '#FBBF24',
        error: '#F87171',
        surface: {
          DEFAULT: '#0B0F14',
          elevated: '#121826',
          hover: '#1A2234',
        },
        border: '#233043',
        text: {
          primary: '#F3F4F6',
          secondary: '#9CA3AF',
          muted: '#6B7280',
        },
        code: '#0F172A',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      borderRadius: {
        'xl': '12px',
        '2xl': '16px',
        '3xl': '28px',
      },
    },
  },
  plugins: [],
}