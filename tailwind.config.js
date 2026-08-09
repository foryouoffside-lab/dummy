/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'var(--font-inter)',
          'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont',
          '"Segoe UI"', 'Roboto', '"Helvetica Neue"', 'Arial', '"Noto Sans"', 'sans-serif',
          '"Apple Color Emoji"', '"Segoe UI Emoji"', '"Segoe UI Symbol"', '"Noto Color Emoji"',
        ],
      },
      colors: {
        canvas: '#06070B',
        'surface-1': '#0E121B',
        'surface-2': '#141A26',
        hairline: 'rgba(255,255,255,0.08)',
        'hairline-2': 'rgba(255,255,255,0.16)',
        'ink-1': '#F5F7FA',
        'ink-2': '#B4BCC9',
        'ink-3': '#7B8496',
        hub: {
          fps: { accent: '#EF4444', secondary: '#F97316' },
          reaction: { accent: '#F59E0B', secondary: '#FBBF24' },
          motor: { accent: '#10B981', secondary: '#34D399' },
          physical: { accent: '#FB7185', secondary: '#FDBA74' },
          cognitive: { accent: '#A855F7', secondary: '#C084FC' },
          memory: { accent: '#6366F1', secondary: '#818CF8' },
          tracking: { accent: '#22D3EE', secondary: '#38BDF8' },
          visual: { accent: '#E879F9', secondary: '#F472B6' },
        },
        primary: {
          50: '#eff6ff',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
        },
        // 🔥 Fix contrast ratio issues (was failing accessibility audit)
        gray: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',   // Min 4.5:1 on white (was too light before)
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
        },
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      // 🔥 Reduce layout shift from font loading
      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '0.875rem' }],
      },
    },
  },
  plugins: [],
  // 🔥 Optimize for production
  future: {
    hoverOnlyWhenSupported: true,
    respectDefaultRingColorOpacity: true,
    disableColorOpacityUtilitiesByDefault: true,
  },
};