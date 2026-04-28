import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  safelist: [
    'bg-pink',
    'bg-pink2',
    'text-pink',
    'text-pink2',
    'border-pink',
    'hover:bg-pink',
    'hover:text-pink',
    'bg-orange',
    'text-orange',
    'bg-blue',
    'text-blue',
  ],
  theme: {
    extend: {
      colors: {
        pink: '#E91E63',
        pink2: '#F06292',
        black: '#0D0D0D',
        dark: '#333333',
        light: '#F5F5F5',
        blue: '#4FC3F7',
        orange: '#FF7043',
      },
      fontFamily: {
        poppins: ['var(--font-poppins)', 'sans-serif'],
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, #0D0D0D 0%, #1a0a11 50%, #0D0D0D 100%)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        pulse_ring: {
          '0%': { transform: 'scale(1)', opacity: '1' },
          '100%': { transform: 'scale(1.8)', opacity: '0' },
        },
        ticker: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        float: 'float 3s ease-in-out infinite',
        float_slow: 'float 4s ease-in-out infinite 1s',
        pulse_ring: 'pulse_ring 1.5s ease-out infinite',
        ticker: 'ticker 30s linear infinite',
        fadeInUp: 'fadeInUp 0.6s ease-out forwards',
      },
    },
  },
  plugins: [],
}

export default config
