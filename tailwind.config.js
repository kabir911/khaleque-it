/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Warm professional palette: deep navy + amber accent
        navy: {
          50: '#f0f4f9',
          100: '#d9e2ef',
          200: '#b3c5df',
          300: '#8aa5cd',
          400: '#5c7fb3',
          500: '#3d5f95',
          600: '#2e4a78',
          700: '#243a5e',
          800: '#1c2e4a',
          900: '#16243a',
          950: '#0d1626',
        },
        amber: {
          50: '#fff8eb',
          100: '#ffedc6',
          200: '#ffd888',
          300: '#ffbf4a',
          400: '#ffa620',
          500: '#f98307',
          600: '#dd6002',
          700: '#b74206',
          800: '#94330c',
          900: '#7a2b0d',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
      },
      container: {
        center: true,
        padding: '1rem',
      },
    },
  },
  plugins: [],
}
