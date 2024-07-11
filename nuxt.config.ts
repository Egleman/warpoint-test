// // https://nuxt.com/docs/api/configuration/nuxt-config
// export default defineNuxtConfig({
//   compatibilityDate: '2024-04-03',
//   devtools: { enabled: true }
// })
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  devtools: {enabled: true},

  css: [
    '~/assets/scss/main.scss',

  ],

  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],

  alias: {
    '@components': './components',
    '@assets': './assets',
  },

  runtimeConfig: {
    public: {
      currency_api: process.env.NUXT_APP_CURRENCY_API,
      currency_token: process.env.NUXT_APP_CURRENCY_TOKEN,
    },
  },

  modules: ["@nuxtjs/ionic"]
})