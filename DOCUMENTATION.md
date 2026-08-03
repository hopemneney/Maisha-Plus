# Maisha Plus+ Community - Project Documentation

## Overview
Maisha Plus+ Community is a web application designed for a social collective dedicated to sustainable growth, financial inclusion, and cultural preservation.

## Key Features & Modifications Implemented

### 1. Branding & Layout Updates
- **Application Name**: Updated the core branding to "Maisha Plus+ Community".
- **Landing Page Refinement**: Simplified the hero section on the homepage by removing the interactive dashboard preview bento box, centering the editorial content for a cleaner, more focused aesthetic.

### 2. Internationalization (i18n)
- **Bilingual Support**: Integrated `react-i18next` to support both English (en) and Swahili (sw).
- **Default Language**: Set Swahili as the default language for the application.
- **Language Toggle**: Added a language switcher (globe icon) to the navigation bar, allowing users to toggle between English and Swahili instantly on both desktop and mobile views.
- **Global Application**: Applied translation strings across all public-facing pages, including:
  - Home Page
  - About Us
  - Projects
  - News & Events
  - Contact Us

### 3. User Dashboard Enhancements
- **Application Tracker (Progress Bar)**: 
  - Created a new reusable UI component (`ApplicationProgress.tsx`) to visually track the approval status of pending service applications.
  - The tracker visually maps out three distinct approval stages: **ACCOUNTANT**, **SECRETARY**, and **CHAIRMAN**.
  - **Styling**: The progress bar utilizes a custom green color theme (`#4A5D4A`) to align with the application's aesthetic, complete with a clean layout and checkmark indicators for completed steps.
- **Dashboard Integration**: 
  - Integrated the Application Tracker into the primary **User Dashboard**, displaying prominently if the user has an active pending application.
  - Added the tracker to the **My Applications** page to provide better visibility into application statuses.

### 4. Multi-Stage Approval System (Staff Portals)
- **Role-Based Access**: Expanded application roles to include `accountant`, `secretary`, and `chairman` alongside standard `user` and `admin` roles.
- **Progressive Statuses**: Application tracking has been evolved to follow a sequential approval process:
  - `Pending Accountant` → `Pending Secretary` → `Pending Chairman` → `Approved`
- **Dedicated Staff Dashboard**:
  - Implemented `/staff` route allowing assigned users to log in and manage approvals corresponding directly to their clearance level.
  - Accountants view applications awaiting financial verification, Secretaries view applications awaiting administrative review, and the Chairman grants final approval.
  - Fast, one-click `Approve` and `Reject` actions built into the staff dashboard to immediately process applications and transition them to the next role or final state.

## Core Technologies Used
- **React & Vite**: Frontend framework and build tool.
- **Tailwind CSS**: Used for all UI styling and responsive layouts.
- **i18next & react-i18next**: Managing translations and multi-language support.
- **Firebase**: Backend database (Firestore) and authentication.
- **Lucide React**: Vector icons used throughout the UI.
