import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        dark: '#0a0e27',
        truth: '#6366f1',
        dare: '#ec4899',
        accent: '#06b6d4',
        neon: '#d946ef',
        primary: '#1a1f3a',
      },
      backgroundImage: {
        'gradient-dark': 'linear-gradient(135deg, #0a0e27 0%, #1a1f3a 100%)',
      },
      backdropBlur: {
        glass: '10px',
      },
      animation: {
        'spin-slow': 'spin 6s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
      },
    },
  },
  plugins: [],
}
export default config
