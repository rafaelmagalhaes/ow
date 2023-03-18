// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  modules: ['@vueuse/nuxt', '@pinia/nuxt', '@nuxtjs/tailwindcss', 'nuxt-vitest'],
  build: { transpile: ['@fawmi/vue-google-maps'] },
  runtimeConfig: {
    public: { GOOGLE_MAPS_API_KEY: process.env.GOOGLE_MAPS_API_KEY },
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
});
