/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        'deep-space': '#0F172A',
        'arc-gold': '#F59E0B',
        'magnet-gray': '#64748B',
        'charge-pos': '#EF4444',
        'charge-neg': '#3B82F6',
        bg: '#0B1120',
        panel: '#111c34',
        'panel-2': '#16223f',
        line: '#1e2c4a',
        text: '#E2E8F0',
        'text-dim': '#94A3B8',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'PingFang SC', 'Microsoft YaHei', 'sans-serif'],
        math: ['Latin Modern Math', 'STIX Two Math', 'serif'],
      },
    },
  },
  plugins: [],
}
