// ============================================================================
// Utility: SeederService
// ============================================================================
// Provides mock data generation using faker.js for demo purposes.
// Used primarily by stores to populate the initial state when deploying demo data.
//
// Usage:
//   import { SeederService } from '~/utils/seeder'
//   const mockUsers = SeederService.generateUsers(5)

import { faker } from '@faker-js/faker'
import type { User } from '../types/user'
import type { DashboardData, StatCardData, ChartDataPoint } from '../types/dashboard'
import type { KanbanCard } from '../types/kanban'

export type { User } from '../types/user'
export type { DashboardData } from '../types/dashboard'
export type { KanbanCard } from '../types/kanban'

// ── Palette constants (mirrored from useChart composable) ──────────────────
const palette = {
  blue: { solid: 'rgb(14, 165, 233)', soft: 'rgba(14, 165, 233, 0.15)' },
  violet: { solid: 'rgb(139, 92, 246)', soft: 'rgba(139, 92, 246, 0.15)' },
  green: { solid: 'rgb(34, 197, 94)', soft: 'rgba(34, 197, 94, 0.15)' },
  orange: { solid: 'rgb(249, 115, 22)', soft: 'rgba(249, 115, 22, 0.15)' },
  pink: { solid: 'rgb(236, 72, 153)', soft: 'rgba(236, 72, 153, 0.15)' },
  teal: { solid: 'rgb(20, 184, 166)', soft: 'rgba(20, 184, 166, 0.15)' },
}

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] as const
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'] as const
const QUARTERS = ['Q1', 'Q2', 'Q3', 'Q4'] as const

/** Generate an array of random integers in a given range */
const randInts = (count: number, min: number, max: number): number[] =>
  Array.from({ length: count }, () => faker.number.int({ min, max }))

export const SeederService = {
  // ── User entity ────────────────────────────────────────────────────────

  /** Generates a single mock user profile. */
  generateSingleUser(): User {
    return {
      id: faker.string.uuid(),
      name: faker.person.fullName(),
      email: faker.internet.email(),
      avatar: `https://api.dicebear.com/10.x/thumbs/svg?seed=${encodeURIComponent(faker.person.fullName())}`,
      role: faker.person.jobTitle(),
      status: faker.helpers.arrayElement(['Active', 'Active', 'Active', 'Inactive'] as const),
    }
  },

  /** Generates an array of mock users. */
  generateUsers(count: number = 5): User[] {
    return Array.from({ length: count }, () => this.generateSingleUser())
  },

  /** Returns an empty array representing a cleared user state. */
  clearUsers(): User[] {
    return []
  },

  // ── Dashboard entity ───────────────────────────────────────────────────

  /** Generates a complete mock dashboard data structure including all chart series. */
  generateDashboard(): DashboardData {
    // ── Stat Cards ─────────────────────────────────────────────────────
    const totalUsers = faker.number.int({ min: 8_000, max: 15_000 })
    const sessions = faker.number.int({ min: 800, max: 3_000 })
    const responseMs = faker.number.int({ min: 180, max: 420 })

    const statCards: StatCardData[] = [
      {
        title: 'Total Users',
        value: totalUsers.toLocaleString(),
        icon: 'i-lucide-users',
        trend: `${faker.number.int({ min: 1, max: 25 })}% from last month`,
        trendDirection: faker.helpers.arrayElement(['up', 'up', 'down'] as const),
      },
      {
        title: 'Active Sessions',
        value: sessions.toLocaleString(),
        icon: 'i-lucide-activity',
        trend: `${faker.number.int({ min: 1, max: 15 })}% from last week`,
        trendDirection: faker.helpers.arrayElement(['up', 'up', 'flat'] as const),
      },
      {
        title: 'Avg. Response Time',
        value: `${responseMs}ms`,
        icon: 'i-lucide-zap',
        trend: `${faker.number.int({ min: 1, max: 30 })}ms from last month`,
        trendDirection: faker.helpers.arrayElement(['down', 'flat', 'up'] as const),
      },
    ]

    // ── Line: Single-series — Active Users ────────────────────────────
    const activityData: ChartDataPoint = {
      labels: [...DAYS],
      datasets: [{
        label: 'Active Users',
        data: randInts(7, 200, 1_000),
        borderColor: palette.blue.solid,
        backgroundColor: palette.blue.soft,
        borderWidth: 2,
        pointBackgroundColor: palette.blue.solid,
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
        fill: true,
        tension: 0.4,
      }],
    }

    // ── Line: Multi-series — Revenue vs Expenses ──────────────────────
    const revenueData: ChartDataPoint = {
      labels: [...MONTHS],
      datasets: [
        {
          label: 'Revenue',
          data: randInts(6, 3_000, 10_000),
          borderColor: palette.green.solid,
          backgroundColor: palette.green.soft,
          borderWidth: 2,
          pointBackgroundColor: palette.green.solid,
          pointBorderColor: '#fff',
          pointBorderWidth: 2,
          pointRadius: 4,
          pointHoverRadius: 6,
          fill: true,
          tension: 0.4,
        },
        {
          label: 'Expenses',
          data: randInts(6, 2_000, 6_000),
          borderColor: palette.orange.solid,
          backgroundColor: palette.orange.soft,
          borderWidth: 2,
          pointBackgroundColor: palette.orange.solid,
          pointBorderColor: '#fff',
          pointBorderWidth: 2,
          pointRadius: 4,
          pointHoverRadius: 6,
          fill: true,
          tension: 0.4,
        },
      ],
    }

    // ── Bar: Single-series — Activity by Category ─────────────────────
    const completionData: ChartDataPoint = {
      labels: ['Development', 'Design', 'Marketing', 'Sales', 'Support', 'Operations'],
      datasets: [{
        label: 'Tasks Completed',
        data: randInts(6, 50, 400),
        backgroundColor: 'rgba(139, 92, 246, 0.85)',
        hoverBackgroundColor: 'rgba(139, 92, 246, 1)',
        borderRadius: 6,
        maxBarThickness: 48,
      }],
    }

    // ── Bar: Grouped — Quarterly Performance ──────────────────────────
    const groupedBarData: ChartDataPoint = {
      labels: [...QUARTERS],
      datasets: [
        {
          label: 'Current Year',
          data: randInts(4, 400, 1_200),
          backgroundColor: 'rgba(14, 165, 233, 0.85)',
          hoverBackgroundColor: 'rgb(14, 165, 233)',
          borderRadius: 6,
          maxBarThickness: 48,
        },
        {
          label: 'Previous Year',
          data: randInts(4, 300, 1_000),
          backgroundColor: 'rgba(156, 163, 175, 0.35)',
          hoverBackgroundColor: 'rgba(156, 163, 175, 0.6)',
          borderRadius: 6,
          maxBarThickness: 48,
        },
      ],
    }

    // ── Doughnut — Traffic Sources ────────────────────────────────────
    const trafficData: ChartDataPoint = {
      labels: ['Direct', 'Organic', 'Referral', 'Social', 'Email'],
      datasets: [{
        label: 'Traffic Sources',
        data: randInts(5, 5, 50),
        backgroundColor: [
          palette.blue.solid,
          palette.violet.solid,
          palette.green.solid,
          palette.orange.solid,
          palette.pink.solid,
        ],
        hoverBackgroundColor: [
          palette.blue.solid,
          palette.violet.solid,
          palette.green.solid,
          palette.orange.solid,
          palette.pink.solid,
        ],
        borderWidth: 0,
        hoverOffset: 6,
      }],
    }

    // ── Polar Area — Resource Allocation ──────────────────────────────
    const polarData: ChartDataPoint = {
      labels: ['Infrastructure', 'Security', 'Performance', 'Availability', 'Compliance', 'Support'],
      datasets: [{
        label: 'Resource Allocation',
        data: randInts(6, 30, 100),
        backgroundColor: [
          palette.blue.soft.replace('0.15', '0.7'),
          palette.violet.soft.replace('0.15', '0.7'),
          palette.green.soft.replace('0.15', '0.7'),
          palette.orange.soft.replace('0.15', '0.7'),
          palette.pink.soft.replace('0.15', '0.7'),
          palette.teal.soft.replace('0.15', '0.7'),
        ],
        borderWidth: 0,
        hoverOffset: 6,
      }],
    }

    // ── Radar — System Health ─────────────────────────────────────────
    const radarData: ChartDataPoint = {
      labels: ['Performance', 'Reliability', 'Security', 'Scalability', 'Usability', 'Maintainability'],
      datasets: [
        {
          label: 'Current',
          data: randInts(6, 50, 100),
          borderColor: palette.blue.solid,
          backgroundColor: palette.blue.soft,
          borderWidth: 2,
          pointBackgroundColor: palette.blue.solid,
          pointBorderColor: '#fff',
          pointBorderWidth: 2,
          pointRadius: 4,
          pointHoverRadius: 6,
        },
        {
          label: 'Target',
          data: randInts(6, 75, 100),
          borderColor: palette.violet.solid,
          backgroundColor: palette.violet.soft,
          borderWidth: 2,
          pointBackgroundColor: palette.violet.solid,
          pointBorderColor: '#fff',
          pointBorderWidth: 2,
          pointRadius: 4,
          pointHoverRadius: 6,
        },
      ],
    }

    return {
      statCards,
      activityData,
      revenueData,
      completionData,
      groupedBarData,
      trafficData,
      polarData,
      radarData,
    }
  },

  /** Returns an empty state structure for the dashboard. */
  clearDashboard(): DashboardData {
    const emptyChart = (): ChartDataPoint => ({ labels: [], datasets: [] })
    const emptyStatCard = (title: string, icon: string): StatCardData => ({
      title,
      value: '—',
      icon,
      trend: 'No data',
      trendDirection: 'flat',
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
  },

  // ── Kanban entity ──────────────────────────────────────────────────────

  /** Generates a single mock Kanban card with random tags and priorities. */
  generateSingleKanbanCard(): KanbanCard {
    return {
      id: faker.string.uuid(),
      title: faker.company.catchPhrase(),
      description: faker.datatype.boolean({ probability: 0.7 }) ? faker.lorem.paragraph() : undefined,
      priority: faker.helpers.arrayElement(['low', 'medium', 'high', 'critical']),
      tags: faker.helpers.arrayElements(['Bug', 'Feature', 'UI', 'Backend', 'Docs', 'Planning', 'Design', 'Research'], { min: 0, max: 3 }),
      locked: faker.datatype.boolean({ probability: 0.1 }),
      createdAt: faker.date.recent({ days: 30 }).toISOString(),
    }
  },

  /** Generates an array of mock Kanban cards. */
  generateKanbanCards(count: number = 5): KanbanCard[] {
    return Array.from({ length: count }, () => this.generateSingleKanbanCard())
  },
}