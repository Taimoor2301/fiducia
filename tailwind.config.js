/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        primary: ['futura'],
        pbold: ['futura-bold'],
        pmedium: ['futura-medium'],
        plite: ['futura-lite']
      },
      colors: {
        tCyan: '#06D9C3',
        tPink: '#F2065D',
        tOrange: '#F27406',
        tBlue: '#0349A6'
      }
    }
  },
  plugins: []
}
