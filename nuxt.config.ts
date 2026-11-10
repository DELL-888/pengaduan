// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/content',
  ],
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  runtimeConfig: {
    dbHost: process.env.DB_HOST || 'localhost',
    dbPort: process.env.DB_PORT || '3308',
    dbUser: process.env.DB_USER || 'root',
    dbPassword: process.env.DB_PASSWORD || '',
    dbName: process.env.DB_NAME || 'nuxt_auth',
  }
})
