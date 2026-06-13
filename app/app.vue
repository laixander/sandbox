<script setup>
useHead({
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' }
  ],
  link: [
    { rel: 'icon', href: '/favicon.ico' }
  ],
  htmlAttrs: {
    lang: 'en'
  }
})

const title = 'App Sandbox'
const description = 'Playground for Nuxt UI.'

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogImage: '',
  twitterCard: ''
})

const appConfig = useAppConfig()
const settings = useSettingsStore()

if (import.meta.client) {
  // Sync initial persisted colors
  appConfig.ui.colors.primary = settings.themePrimary
  appConfig.ui.colors.neutral = settings.themeNeutral

  // Watch for changes made in Settings
  watch(() => settings.themePrimary, (val) => appConfig.ui.colors.primary = val)
  watch(() => settings.themeNeutral, (val) => appConfig.ui.colors.neutral = val)
}
</script>

<template>
  <UApp>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>
