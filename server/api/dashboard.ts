import { eventHandler } from 'h3'

export const dashboardData = {
  "statCards": [
    {
      "title": "Total Users",
      "value": "8,715",
      "icon": "i-lucide-users",
      "trend": "20% from last month",
      "trendDirection": "up"
    },
    {
      "title": "Active Sessions",
      "value": "2,423",
      "icon": "i-lucide-activity",
      "trend": "11% from last week",
      "trendDirection": "up"
    },
    {
      "title": "Avg. Response Time",
      "value": "280ms",
      "icon": "i-lucide-zap",
      "trend": "26ms from last month",
      "trendDirection": "down"
    }
  ],
  "activityData": {
    "labels": [
      "Mon",
      "Tue",
      "Wed",
      "Thu",
      "Fri",
      "Sat",
      "Sun"
    ],
    "datasets": [
      {
        "label": "Active Users",
        "data": [
          357,
          347,
          289,
          740,
          387,
          690,
          463
        ],
        "borderColor": "rgb(14, 165, 233)",
        "backgroundColor": "rgba(14, 165, 233, 0.15)",
        "borderWidth": 2,
        "pointBackgroundColor": "rgb(14, 165, 233)",
        "pointBorderColor": "#fff",
        "pointBorderWidth": 2,
        "pointRadius": 4,
        "pointHoverRadius": 6,
        "fill": true,
        "tension": 0.4
      }
    ]
  },
  "revenueData": {
    "labels": [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun"
    ],
    "datasets": [
      {
        "label": "Revenue",
        "data": [
          7474,
          7265,
          4707,
          5771,
          5802,
          3495
        ],
        "borderColor": "rgb(34, 197, 94)",
        "backgroundColor": "rgba(34, 197, 94, 0.15)",
        "borderWidth": 2,
        "pointBackgroundColor": "rgb(34, 197, 94)",
        "pointBorderColor": "#fff",
        "pointBorderWidth": 2,
        "pointRadius": 4,
        "pointHoverRadius": 6,
        "fill": true,
        "tension": 0.4
      },
      {
        "label": "Expenses",
        "data": [
          5213,
          5917,
          2975,
          4140,
          3662,
          5038
        ],
        "borderColor": "rgb(249, 115, 22)",
        "backgroundColor": "rgba(249, 115, 22, 0.15)",
        "borderWidth": 2,
        "pointBackgroundColor": "rgb(249, 115, 22)",
        "pointBorderColor": "#fff",
        "pointBorderWidth": 2,
        "pointRadius": 4,
        "pointHoverRadius": 6,
        "fill": true,
        "tension": 0.4
      }
    ]
  },
  "completionData": {
    "labels": [
      "Development",
      "Design",
      "Marketing",
      "Sales",
      "Support",
      "Operations"
    ],
    "datasets": [
      {
        "label": "Tasks Completed",
        "data": [
          136,
          52,
          135,
          190,
          259,
          154
        ],
        "backgroundColor": "rgba(139, 92, 246, 0.85)",
        "hoverBackgroundColor": "rgba(139, 92, 246, 1)",
        "borderRadius": 6,
        "maxBarThickness": 48
      }
    ]
  },
  "groupedBarData": {
    "labels": [
      "Q1",
      "Q2",
      "Q3",
      "Q4"
    ],
    "datasets": [
      {
        "label": "Current Year",
        "data": [
          1027,
          1124,
          809,
          491
        ],
        "backgroundColor": "rgba(14, 165, 233, 0.85)",
        "hoverBackgroundColor": "rgb(14, 165, 233)",
        "borderRadius": 6,
        "maxBarThickness": 48
      },
      {
        "label": "Previous Year",
        "data": [
          396,
          903,
          330,
          497
        ],
        "backgroundColor": "rgba(156, 163, 175, 0.35)",
        "hoverBackgroundColor": "rgba(156, 163, 175, 0.6)",
        "borderRadius": 6,
        "maxBarThickness": 48
      }
    ]
  },
  "trafficData": {
    "labels": [
      "Direct",
      "Organic",
      "Referral",
      "Social",
      "Email"
    ],
    "datasets": [
      {
        "label": "Traffic Sources",
        "data": [
          44,
          29,
          45,
          39,
          30
        ],
        "backgroundColor": [
          "rgb(14, 165, 233)",
          "rgb(139, 92, 246)",
          "rgb(34, 197, 94)",
          "rgb(249, 115, 22)",
          "rgb(236, 72, 153)"
        ],
        "hoverBackgroundColor": [
          "rgb(14, 165, 233)",
          "rgb(139, 92, 246)",
          "rgb(34, 197, 94)",
          "rgb(249, 115, 22)",
          "rgb(236, 72, 153)"
        ],
        "borderWidth": 0,
        "hoverOffset": 6
      }
    ]
  },
  "polarData": {
    "labels": [
      "Infrastructure",
      "Security",
      "Performance",
      "Availability",
      "Compliance",
      "Support"
    ],
    "datasets": [
      {
        "label": "Resource Allocation",
        "data": [
          60,
          66,
          62,
          55,
          52,
          62
        ],
        "backgroundColor": [
          "rgba(14, 165, 233, 0.7)",
          "rgba(139, 92, 246, 0.7)",
          "rgba(34, 197, 94, 0.7)",
          "rgba(249, 115, 22, 0.7)",
          "rgba(236, 72, 153, 0.7)",
          "rgba(20, 184, 166, 0.7)"
        ],
        "borderWidth": 0,
        "hoverOffset": 6
      }
    ]
  },
  "radarData": {
    "labels": [
      "Performance",
      "Reliability",
      "Security",
      "Scalability",
      "Usability",
      "Maintainability"
    ],
    "datasets": [
      {
        "label": "Current",
        "data": [
          91,
          68,
          55,
          98,
          63,
          98
        ],
        "borderColor": "rgb(14, 165, 233)",
        "backgroundColor": "rgba(14, 165, 233, 0.15)",
        "borderWidth": 2,
        "pointBackgroundColor": "rgb(14, 165, 233)",
        "pointBorderColor": "#fff",
        "pointBorderWidth": 2,
        "pointRadius": 4,
        "pointHoverRadius": 6
      },
      {
        "label": "Target",
        "data": [
          91,
          84,
          99,
          92,
          99,
          79
        ],
        "borderColor": "rgb(139, 92, 246)",
        "backgroundColor": "rgba(139, 92, 246, 0.15)",
        "borderWidth": 2,
        "pointBackgroundColor": "rgb(139, 92, 246)",
        "pointBorderColor": "#fff",
        "pointBorderWidth": 2,
        "pointRadius": 4,
        "pointHoverRadius": 6
      }
    ]
  }
}

export default eventHandler(() => dashboardData)