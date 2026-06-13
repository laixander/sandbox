import { eventHandler } from 'h3'

export const kanbanData = {
  "backlog": [
    {
      "id": "ce67ea6f-0094-491f-8025-dc6095548eec",
      "title": "Research alternative payment gateways",
      "description": "We need to evaluate Stripe and PayPal alternatives for lower transaction fees in European markets.",
      "priority": "medium",
      "tags": ["Research", "Planning"],
      "locked": false,
      "createdAt": "2026-05-18T02:28:54.645Z"
    },
    {
      "id": "c2dcde46-bae3-4334-83ac-573ad9599dd6",
      "title": "Implement Single Sign-On (SSO)",
      "priority": "medium",
      "tags": ["Backend", "Feature", "Security"],
      "locked": false,
      "createdAt": "2026-05-18T04:51:13.257Z"
    },
    {
      "id": "0f4ea001-a303-4fe3-afe4-66bcc7cd7e3e",
      "title": "Update typography and design tokens",
      "description": "The current typography scale is inconsistent on mobile devices. Need to audit all H1-H6 tags and update the CSS variables in the theme file.",
      "priority": "low",
      "tags": ["UI", "Design"],
      "locked": false,
      "createdAt": "2026-05-30T14:16:59.102Z"
    },
    {
      "id": "ec04d2ab-0116-4881-9140-3e80aeb5aef4",
      "title": "Audit database query performance",
      "description": "Several users have reported slow loading times on the dashboard. We need to identify slow queries using the slow query log and add missing indexes.",
      "priority": "medium",
      "tags": ["Backend", "Performance"],
      "locked": false,
      "createdAt": "2026-05-26T06:24:48.611Z"
    },
    {
      "id": "1730e829-ae27-4015-93fa-1784c45a05bf",
      "title": "Prepare Q3 roadmap",
      "priority": "critical",
      "tags": ["Planning", "Docs"],
      "locked": false,
      "createdAt": "2026-05-18T04:59:22.337Z"
    }
  ],
  "todo": [
    {
      "id": "a3a71575-3d7e-41f8-a802-6cb999cb8ca2",
      "title": "Fix responsive layout on login page",
      "description": "The login form overflows horizontally on devices narrower than 350px. Add proper flex wrapping and max-width constraints.",
      "priority": "low",
      "tags": ["UI", "Bug"],
      "locked": false,
      "createdAt": "2026-06-06T23:41:41.583Z"
    },
    {
      "id": "cbb6881a-dc55-4c20-87b4-74848f67d127",
      "title": "Draft API documentation for v2",
      "priority": "medium",
      "tags": ["Docs", "Backend"],
      "locked": false,
      "createdAt": "2026-06-01T09:28:33.039Z"
    },
    {
      "id": "bf1396b2-b53d-4c10-86a7-330eb86a1e16",
      "title": "Upgrade Nuxt to latest minor version",
      "priority": "critical",
      "tags": ["Maintenance", "Core"],
      "locked": false,
      "createdAt": "2026-05-15T17:40:11.167Z"
    },
    {
      "id": "e0ae5a69-1038-4d84-b435-534f4e9380f6",
      "title": "Resolve memory leak in WebSocket service",
      "description": "The node process memory usage grows linearly over time when active connections exceed 1000. Need to investigate connection close handlers.",
      "priority": "critical",
      "tags": ["Backend", "Bug", "Performance"],
      "locked": false,
      "createdAt": "2026-05-18T12:03:08.732Z"
    },
    {
      "id": "cba708e8-e6b6-42f1-9d83-00958c51d1cc",
      "title": "Add dark mode toggle",
      "priority": "low",
      "tags": ["UI", "Feature"],
      "locked": false,
      "createdAt": "2026-06-09T13:40:39.298Z"
    },
    {
      "id": "1fa2ca61-a361-4480-b0d8-da7f5e7dc81f",
      "title": "Refactor user authentication flow",
      "priority": "medium",
      "tags": ["Backend", "Feature"],
      "locked": false,
      "createdAt": "2026-05-17T03:17:02.726Z"
    },
    {
      "id": "1f048d56-d5e1-45a2-8003-512c5ad451cd",
      "title": "Define SLA metrics for support team",
      "priority": "high",
      "tags": ["Planning", "Docs"],
      "locked": false,
      "createdAt": "2026-05-31T05:44:55.351Z"
    }
  ],
  "inProgress": [
    {
      "id": "b384aece-acad-4d67-b6dc-67bc6642b9a6",
      "title": "Migrate user profiles to new schema",
      "description": "Move the legacy user preferences JSON blob into the new normalized tables. Requires writing a data migration script.",
      "priority": "high",
      "tags": ["Backend", "Database"],
      "locked": true,
      "createdAt": "2026-06-03T16:49:03.348Z"
    },
    {
      "id": "074d8579-36be-4994-a2f8-395e5c3669ef",
      "title": "Build Kanban drag-and-drop interface",
      "description": "Implement native HTML5 drag and drop for task cards and columns. Ensure smooth animations and visual feedback during drag.",
      "priority": "medium",
      "tags": ["UI", "Feature"],
      "locked": false,
      "createdAt": "2026-05-18T12:18:56.007Z"
    },
    {
      "id": "49b93bfc-7c41-419f-bcc7-5da94e8f76bb",
      "title": "Setup CI/CD pipeline",
      "description": "Configure GitHub Actions to run ESLint, Prettier, and Vitest on every pull request. Add deployment step for the staging branch.",
      "priority": "high",
      "tags": ["DevOps", "Infrastructure"],
      "locked": false,
      "createdAt": "2026-05-26T06:20:19.052Z"
    }
  ],
  "review": [
    {
      "id": "523898f0-bb0a-4eeb-a8cd-42b57a1c2ada",
      "title": "Implement user role management",
      "priority": "critical",
      "tags": ["UI", "Backend", "Feature"],
      "locked": false,
      "createdAt": "2026-05-25T11:18:41.762Z"
    },
    {
      "id": "3ce5384e-23a2-4fee-aab0-993ef2cff0db",
      "title": "Fix avatar upload bug on Safari",
      "description": "Uploading a PNG avatar occasionally fails with a 415 Unsupported Media Type on iOS Safari. Looks like a mime-type detection issue.",
      "priority": "medium",
      "tags": ["Bug", "UI", "Backend"],
      "locked": false,
      "createdAt": "2026-06-05T13:36:52.315Z"
    },
    {
      "id": "7c28b16b-3685-479e-98bb-24a0588c96f0",
      "title": "Write terms of service copy",
      "description": "Finalize the new terms of service for the European market launch. Pending legal review.",
      "priority": "medium",
      "tags": ["Docs", "Legal"],
      "locked": false,
      "createdAt": "2026-06-02T23:20:10.178Z"
    },
    {
      "id": "1597ddb2-a1f2-482a-96a5-f4d64b040944",
      "title": "Optimize landing page images",
      "description": "Compress all hero images to WebP format to improve Lighthouse performance score.",
      "priority": "low",
      "tags": ["UI", "Performance"],
      "locked": false,
      "createdAt": "2026-06-03T12:19:26.946Z"
    }
  ],
  "done": [
    {
      "id": "f9fbcc94-b410-42aa-8a35-bb4eb2a2cc2c",
      "title": "Set up project repository",
      "priority": "critical",
      "tags": ["Planning", "Infrastructure"],
      "locked": false,
      "createdAt": "2026-06-08T12:10:54.284Z"
    },
    {
      "id": "396b3e60-7302-469f-8136-76350a8d88b9",
      "title": "Design system initial implementation",
      "description": "Create the foundational color palette, typography scale, and spacing variables in Tailwind config.",
      "priority": "high",
      "tags": ["Design", "UI"],
      "locked": true,
      "createdAt": "2026-05-23T21:15:04.519Z"
    },
    {
      "id": "1841bc2d-8e89-469c-8af4-70015d2db1fb",
      "title": "Initialize database connection",
      "priority": "critical",
      "tags": ["Backend", "Database"],
      "locked": true,
      "createdAt": "2026-06-06T16:16:38.903Z"
    },
    {
      "id": "9824d3e0-53bb-4161-aa65-01a868faab3a",
      "title": "Deploy staging environment",
      "description": "Provision the staging server on AWS and configure the domain name routing.",
      "priority": "critical",
      "tags": ["DevOps", "Infrastructure"],
      "locked": false,
      "createdAt": "2026-05-14T17:30:31.881Z"
    },
    {
      "id": "1a9b5682-9532-48e4-bd19-f3c2229720fd",
      "title": "Create User API endpoints",
      "description": "Build the standard CRUD endpoints for the User entity including validation schemas.",
      "priority": "critical",
      "tags": ["Backend", "API"],
      "locked": false,
      "createdAt": "2026-05-28T04:49:15.719Z"
    },
    {
      "id": "a30b388c-a65b-4aaa-9340-2c1e20f2e19e",
      "title": "Competitor feature analysis",
      "description": "Analyze the top 3 competitors in our space to identify potential feature gaps in our Q2 roadmap.",
      "priority": "medium",
      "tags": ["Research", "Planning"],
      "locked": false,
      "createdAt": "2026-06-12T06:46:32.938Z"
    },
    {
      "id": "b9b3c470-901b-4695-bdc5-c5e150153438",
      "title": "Write unit tests for auth service",
      "description": "Achieve 90% code coverage for the JWT authentication module.",
      "priority": "critical",
      "tags": ["Testing", "Security"],
      "locked": false,
      "createdAt": "2026-05-29T14:38:33.212Z"
    },
    {
      "id": "cb4c5e01-fc38-48aa-983e-590ecaf46b00",
      "title": "Finalize brand guidelines",
      "priority": "high",
      "tags": ["Design", "Docs"],
      "locked": false,
      "createdAt": "2026-05-23T01:15:42.986Z"
    },
    {
      "id": "65a6e8fe-011b-4dc9-90d6-dcf0e6e5e34d",
      "title": "Add Google Analytics tracking",
      "priority": "low",
      "tags": ["Marketing", "Analytics"],
      "locked": false,
      "createdAt": "2026-06-04T01:39:14.764Z"
    },
    {
      "id": "e28671cb-d1f2-4d53-beb7-99cc24bb4adb",
      "title": "Database schema migration system",
      "description": "Integrate Prisma to handle database migrations and schema versioning safely.",
      "priority": "high",
      "tags": ["Backend", "Database"],
      "locked": true,
      "createdAt": "2026-05-17T04:10:26.288Z"
    },
    {
      "id": "1e457fd9-9572-44eb-a036-e8764c60dfb1",
      "title": "Fix broken links in footer",
      "description": "The privacy policy and terms links in the footer are currently returning 404s.",
      "priority": "low",
      "tags": ["UI", "Bug"],
      "locked": true,
      "createdAt": "2026-06-05T12:40:07.274Z"
    },
    {
      "id": "63d3dc46-95b0-4974-973c-000d013a8f57",
      "title": "Setup automated backups",
      "priority": "critical",
      "tags": ["DevOps", "Database"],
      "locked": false,
      "createdAt": "2026-05-17T00:49:04.285Z"
    }
  ]
}

export default eventHandler(() => kanbanData)