/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          900: 'var(--dark-900)',
          800: 'var(--dark-800)',
          700: 'var(--dark-700)',
          600: 'var(--dark-600)',
          500: 'var(--dark-500)',
          400: 'var(--dark-400)',
          300: 'var(--dark-300)',
          200: 'var(--dark-200)',
          100: 'var(--dark-100)',
        },
        accent: {
          900: 'var(--accent-900)',
          800: 'var(--accent-800)',
          700: 'var(--accent-700)',
          600: 'var(--accent-600)',
          500: 'var(--accent-500)',
          400: 'var(--accent-400)',
          300: 'var(--accent-300)',
          200: 'var(--accent-200)',
          100: 'var(--accent-100)',
        },
        glow: {
          purple: 'var(--glow-purple)',
          indigo: 'var(--glow-indigo)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'neon': '0 0 15px 0 rgba(139, 92, 246, 0.3)',
        'neon-intense': '0 0 25px 5px rgba(139, 92, 246, 0.5)',
        'inner-neon': 'inset 0 0 10px 0 rgba(139, 92, 246, 0.2)',
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.25)',
      },
      animation: {
        'glow': 'glow 3s ease-in-out infinite',
        'spin-slow': 'spin 8s linear infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'bounce-slow': 'bounce 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'gradient-x': 'gradient-x 3s ease infinite',
        'gradient-y': 'gradient-y 3s ease infinite',
        'gradient-xy': 'gradient-xy 3s ease infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'scale-up-down': 'scale-up-down 4s ease-in-out infinite',
        'vibrate': 'vibrate 0.3s linear infinite',
        'fade-in': 'fade-in 0.5s ease-out forwards',
        'fade-in-up': 'fade-in-up 0.5s ease-out forwards',
        'fade-in-down': 'fade-in-down 0.5s ease-out forwards',
        'fade-in-left': 'fade-in-left 0.5s ease-out forwards',
        'fade-in-right': 'fade-in-right 0.5s ease-out forwards',
      },
      keyframes: {
        glow: {
          '0%, 100%': { boxShadow: '0 0 15px 0 rgba(139, 92, 246, 0.3)' },
          '50%': { boxShadow: '0 0 25px 5px rgba(139, 92, 246, 0.5)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'gradient-x': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'gradient-y': {
          '0%, 100%': { backgroundPosition: '50% 0%' },
          '50%': { backgroundPosition: '50% 100%' },
        },
        'gradient-xy': {
          '0%, 100%': { backgroundPosition: '0% 0%' },
          '25%': { backgroundPosition: '100% 0%' },
          '50%': { backgroundPosition: '100% 100%' },
          '75%': { backgroundPosition: '0% 100%' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        'scale-up-down': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.1)' },
        },
        vibrate: {
          '0%, 100%': { transform: 'translate(0)' },
          '10%, 30%, 50%, 70%, 90%': { transform: 'translate(-1px)' },
          '20%, 40%, 60%, 80%': { transform: 'translate(1px)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in-down': {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in-left': {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'fade-in-right': {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '4rem',
          xl: '5rem',
        },
      },
      backdropFilter: {
        'none': 'none',
        'blur': 'blur(20px)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'glass-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
        'dark-gradient': 'linear-gradient(to bottom, #0F0F13, #1C202C)',
        'glow-gradient': 'linear-gradient(to right, #004CFF, #9D50FF)',
        'grid-pattern': 'url("data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' viewBox=\'0 0 20 20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23FFFFFF\' fill-opacity=\'0.1\' fill-rule=\'evenodd\'%3E%3Ccircle cx=\'1\' cy=\'1\' r=\'1\'/%3E%3C/g%3E%3C/svg%3E")',
      },
    },
  },
  plugins: [],
}; 