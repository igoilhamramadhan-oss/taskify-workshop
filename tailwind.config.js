/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        taskify: {
          bg: '#F6F7FB',
          border: '#EEF0F6',
          primary: '#5B4FE9',
          'primary-hover': '#4A3ED4',
          'primary-light': '#EEF0FF',
          dark: '#111827',
          muted: '#6B7280',
          amber: {
            bg: '#FFF4E5',
            text: '#D97706',
          },
          emerald: {
            bg: '#E6F9F0',
            text: '#059669',
          },
          rose: {
            bg: '#FFF1F2',
            text: '#E11D48',
          },
        },
      },
      borderRadius: {
        '2xl': '20px',
        '3xl': '24px',
      },
      boxShadow: {
        soft: '0 4px 20px -2px rgba(91, 79, 233, 0.06), 0 2px 6px -1px rgba(0, 0, 0, 0.04)',
        card: '0 2px 12px rgba(0, 0, 0, 0.03)',
      },
    },
  },
  plugins: [],
}
