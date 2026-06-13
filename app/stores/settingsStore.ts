// ============================================================================
// Store: Settings
// ============================================================================
// Manages persisted user preferences that affect the UI across sessions.
// Persisted to localStorage so preferences survive page reloads.
//
// Usage:
//   const settingsStore = useSettingsStore()
//   settingsStore.defaultViewMode   // 'list' | 'card'
//   settingsStore.setDefaultViewMode('card')

import { defineStore } from 'pinia'

export const useSettingsStore = defineStore('settingsStore', {
    state: () => ({
        defaultViewMode: 'list' as 'list' | 'card',
        sidebarCollapsed: false,
        themePrimary: 'teal',
        themeNeutral: 'taupe',
    }),

    actions: {
        /** Sets the default view mode for lists/grids. */
        setDefaultViewMode(mode: 'list' | 'card') {
            this.defaultViewMode = mode
        },

        /** Toggles or sets the sidebar collapsed state. */
        setSidebarCollapsed(collapsed: boolean) {
            this.sidebarCollapsed = collapsed
        },

        setThemePrimary(color: string) {
            this.themePrimary = color
        },

        setThemeNeutral(color: string) {
            this.themeNeutral = color
        },

        /** Resets all user settings back to their default values. */
        resetToDefaults() {
            this.defaultViewMode = 'list'
            this.sidebarCollapsed = false
            this.themePrimary = 'teal'
            this.themeNeutral = 'taupe'
        },
    },

    persist: {
        storage: persistedState.localStorage,
    },
})
