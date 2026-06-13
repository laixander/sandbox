// ============================================================================
// Store: dashboardStore
// ============================================================================
// Manages data for the overview/dashboard page including stat cards and chart datasets.
// Data is fetched from Nuxt Server API and persisted to localStorage.
//
// Usage:
//   const store = useDashboardStore()
//   store.deployMockData()

import { defineStore } from 'pinia'
import type { DashboardData, ChartDataPoint, StatCardData } from '~/types/dashboard'

// ── Default empty state ────────────────────────────────────────────────────
const getEmptyState = (): DashboardData => {
    const emptyChart = (): ChartDataPoint => ({ labels: [], datasets: [] })
    const emptyStatCard = (title: string, icon: string): StatCardData => ({
        title, value: '—', icon, trend: 'No data', trendDirection: 'flat',
    })
    return {
        statCards: [
            emptyStatCard('Total Users', 'i-lucide-users'),
            emptyStatCard('Active Sessions', 'i-lucide-activity'),
            emptyStatCard('Avg. Response Time', 'i-lucide-zap'),
        ],
        activityData: emptyChart(),
        revenueData: emptyChart(),
        completionData: emptyChart(),
        groupedBarData: emptyChart(),
        trafficData: emptyChart(),
        polarData: emptyChart(),
        radarData: emptyChart(),
    }
}

export const useDashboardStore = defineStore('dashboardStore', {
    state: () => ({
        ...getEmptyState(),
        isLoading: false,
    }),

    actions: {
        /** Deploy mock data for the dashboard charts and stat cards. */
        async deployMockData() {
            this.isLoading = true
            try {
                const data = await $fetch<DashboardData>('/api/dashboard')
                this.statCards     = data.statCards
                this.activityData  = data.activityData
                this.revenueData   = data.revenueData
                this.completionData = data.completionData
                this.groupedBarData = data.groupedBarData
                this.trafficData   = data.trafficData
                this.polarData     = data.polarData
                this.radarData     = data.radarData
            } finally {
                this.isLoading = false
            }
        },

        /** Clear all dashboard data back to the empty state. */
        removeMockData() {
            this.isLoading = true
            const empty = getEmptyState()
            this.statCards     = empty.statCards
            this.activityData  = empty.activityData
            this.revenueData   = empty.revenueData
            this.completionData = empty.completionData
            this.groupedBarData = empty.groupedBarData
            this.trafficData   = empty.trafficData
            this.polarData     = empty.polarData
            this.radarData     = empty.radarData
            this.isLoading = false
        },
    },

    getters: {
        /** Returns true if the dashboard has data loaded. */
        hasDashboardData: (state) => state.statCards.some((c: StatCardData) => c.value !== '—'),
    },

    persist: {
        storage: persistedState.localStorage
    }
})
