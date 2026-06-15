---
title: "Initialize Project Documentation"
description: "Instructions for updating the generic documentation pages to reflect a new application's domain."
---

# Project Initialization Instructions

When you are tasked with initializing a new project from this boilerplate, you must customize the documentation placeholder files to accurately match the specific domain and purpose of the new application being built.

## Files to Update

The target files are located in the `app/pages/docs/` directory:

1. **`documentation.vue`**
   - Replace the generic "SaaS Platform" references with the new application's name and core purpose.
   - Update the `modulesData` array to reflect the actual functional modules (e.g., instead of "Administration", "Billing", it might be "Patient Portal", "Scheduling" for a healthcare app).
   - Update the `personas` to match the new system's user roles (e.g., Doctor, Nurse, Patient, Admin).
   - Update the `dataModels` array to match the new system's core entities (e.g., Appointment, Prescription).
   - Update the `userJourney` steps to describe the onboarding and lifecycle flow specific to the new domain.

2. **`user-manual.vue`**
   - Translate the role-based instructions to correspond with the new personas defined in `documentation.vue`.
   - Provide concrete, domain-specific examples of how each role interacts with the new application's core workflows.

3. **`changelog.vue`**
   - Update the initial changelog entries to reflect the foundational commits of the new project, or clear it out appropriately to prepare for new feature logs.

4. **`presentation.vue`**
   - Replace abstract SaaS branding with the project's actual name.
   - Adjust the presentation slides (Hero, Workflows, Roles) to accurately sell or present the newly designed platform.
   - Preserve the technical stack slides (Nuxt 3, Vue 3, Pinia) if the new application maintains the boilerplate's tech stack.

By updating these files as the first step of initialization, you ensure the internal documentation accurately represents the application's architecture and intent from day one.

## Prompt Guide (For Users)

If you are a user starting a new project, you can kick off this initialization by copying and pasting the following prompt to the agent:

> **Example Prompt:**
> "I am starting a new project based on this boilerplate. The new app is a **[Insert App Type, e.g., Healthcare Management System]** called **[Insert App Name, e.g., MediCare Pro]**. Please run the `initialize-project` skill to customize the `app/pages/docs/` files. The core modules will be **[List Modules, e.g., Patient Portal, Appointments, Billing]**, and the primary roles are **[List Roles, e.g., Doctor, Nurse, Admin]**."
