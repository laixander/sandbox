// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: [
        '@nuxt/eslint',
        '@nuxt/ui',
        '@pinia/nuxt',
        '@pinia-plugin-persistedstate/nuxt',
    ],

    devtools: {
        enabled: true
    },

    css: ['~/assets/css/main.css'],

    routeRules: {
        '/': { prerender: true },
        '/cards': { redirect: '/cards/card-system' }
    },

    compatibilityDate: '2025-01-15',

    eslint: {
        config: {
            stylistic: {
                commaDangle: 'never',
                braceStyle: '1tbs'
            }
        }
    },

    vite: {
        optimizeDeps: {
            include: [
                '@vue/devtools-core',
                '@vue/devtools-kit',
                '@vueuse/core',
                'chart.js',
                'pinia',
                'vue-chartjs',
                'zod',
            ]
        }
    },

    ui: {
        theme: {
            colors: [
                'primary',
                'secondary',
                'info',
                'success',
                'warning',
                'error',
                'neutral',
                // Full Tailwind palette
                'red',
                'orange',
                'amber',
                'yellow',
                'lime',
                'green',
                'emerald',
                'teal',
                'cyan',
                'sky',
                'blue',
                'indigo',
                'violet',
                'purple',
                'fuchsia',
                'pink',
                'rose',
            ]
        }
    }
})
