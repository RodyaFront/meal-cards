import tailwindcss from '@tailwindcss/vite'

// На GitHub Pages сайт лежит в подпапке, которую задаёт NUXT_APP_BASE_URL.
const baseURL = process.env.NUXT_APP_BASE_URL || '/'

export default defineNuxtConfig({
  compatibilityDate: '2026-11-01',
  ssr: false,
  modules: ['@vite-pwa/nuxt'],
  css: ['~/assets/css/main.css'],
  vite: {
    plugins: [tailwindcss()],
  },
  app: {
    head: {
      htmlAttrs: { lang: 'ru' },
      title: 'Блюда на день',
      meta: [{ name: 'theme-color', content: '#059669' }],
      link: [
        { rel: 'icon', type: 'image/png', href: `${baseURL}icon-192.png` },
        { rel: 'apple-touch-icon', href: `${baseURL}icon-192.png` },
      ],
    },
  },
  pwa: {
    registerType: 'autoUpdate',
    manifest: {
      name: 'Блюда на день',
      short_name: 'Блюда',
      lang: 'ru',
      display: 'standalone',
      theme_color: '#059669',
      background_color: '#fafaf9',
      icons: [
        { src: 'icon-192.png', sizes: '192x192', type: 'image/png' },
        { src: 'icon-512.png', sizes: '512x512', type: 'image/png' },
        { src: 'icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
      ],
    },
    workbox: {
      navigateFallback: baseURL,
      globPatterns: ['**/*.{js,css,html,png}'],
    },
  },
})
