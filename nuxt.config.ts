// https://nuxt.com/docs/api/configuration/nuxt-config
import { presetWind } from '@unocss/preset-wind'

export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  modules: ['@nuxt/eslint', 'nuxt-graphql-server', '@unocss/nuxt'],
  graphqlServer: {
    url: '/api/gql',
    schema: './server/api/schemas/*.gql',
  },
  unocss: {
    presets: [presetWind()],
  },
})
