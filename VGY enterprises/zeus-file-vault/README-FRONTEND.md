# 🖥️ Zeus File Vault — Frontend Client Documentation & Architecture Guide

Welcome to the frontend subsystem of the **Zeus File Vault**. This document details the visual identity, UI/UX architecture, client-side state engines, route-like views, responsive layout structure, and integration specifications for the client-side single-page application (SPA).

---

## 🎨 Visual Identity & Design System

The Zeus client is designed to look like a modern, professional, high-security enterprise platform. It avoids generic gradients and unnecessary clutter, favoring a high-contrast, Swiss-inspired light theme balanced with premium dark headers and subtle borders.

### Color Palette & Spacing
- **Primary Canvas**: Soft, clean off-white background (`bg-gray-50`) paired with bright white cards (`bg-white`).
- **Typography Accents**: Deep charcoal gray (`text-gray-900`) and high-density slate (`text-gray-700`) for text, providing strong accessibility and contrast.
- **System Indicators**:
  - `emerald-500` for active/healthy states (e.g., Connected Postgres, Operational Server).
  - `amber-500` for system warnings or fallbacks (e.g., File-based JSON Database fallback).
  - `red-500` for critical/blocked items (e.g., Access Denied, RBAC enforcement).
- **Rhythm & Padding**: Varied spacing using Tailwind's layout engine to avoid sterile grid patterns. High negative space in headers and comfortable density in file spreadsheets.

### Typography
- **Headings & Interstitials**: Pairings of **Inter** and modern sans display typography for high-density reading.
- **Metadata & Indicators**: **JetBrains Mono** for size labels, timestamps, node identifiers, and cryptographic hash strings, reinforcing a professional cryptographic vibe.

---

## 🛠️ Component Hierarchy & Architecture

The application is engineered as a robust Single Page Application (SPA). To maintain extreme modularity and dodge token limit boundaries, the UI is split cleanly between layout decorators, reactive widgets, and analytical views.

### 1. Sticky Shell Structure (`/src/App.tsx`)
The shell governs the core application frame utilizing a non-scrolling, high-efficiency viewport layout:
- **Sticky Shell Header**: Keeps system state, current user profile, active session countdowns, and quick actions persistent.
- **Left Sidebar Navigation**: Smooth tab triggers with instant context switching (Dashboard, File Explorer, Permission Registry, Audits).
- **Sticky Status Footer**: Houses active telemetry indicators including **Database Connectivity status (PostgreSQL vs Local Fallback)**, linter indicators, and localized system logs.

### 2. Analytical Dashboard (`/src/components/Dashboard.tsx`)
Renders high-fidelity, interactive analytics regarding storage health, workspace activity, and compliance:
- **Storage Occupancy Widgets**: Displays live progress gauges showing used quota vs available storage.
- **Teammate Access Monitor**: Activity metrics detailing active roles, current sessions, and validation failures.
- **Transactional Sparklines**: Custom interactive trend charts highlighting database operations over the current week.

### 3. Faceted File Explorer (`/src/components/FileExplorer.tsx`)
The core workhorse of the application, rendering recursive virtual directories with deep system operations:
- **Recursive Navigation Tree**: Breadcrumb mapping with safe path-resolution routers.
- **Dynamic Views**: Instant list-to-grid layout switches preserving item selections.
- **Client Side Actions**: Download, Upload, Copy, Move, Rename, Delete, and Favorite triggers.
- **Double-Click Native-Link Router**: If enabled, intercepting double-clicks generates an authorized query token and invokes desktop protocol deep-links (e.g., `ms-word:`, `ms-excel:`) for local application editing instead of standard browser downloads.

### 4. Granular Permissions Console (`/src/components/PermissionManager.tsx`)
Enables authorized administrators to declare and edit security rules on path prefixes:
- **Scope Matchers**: Target path-prefix inputs mapping directory nodes (e.g., `/Confidential/Research/`).
- **Role Threshold Sliders**: Visual level controls mapping rule restrictions to the RBAC scale.
- **Rule Status Toggle**: Instant toggle activation state directly synchronizing to backend rule interceptors.

### 5. High-Density Compliance Ledger (`/src/components/AuditLogs.tsx`)
Provides real-time auditability of system events:
- **Append-only List**: Displays timestamped ledger events (uploads, access denials, rules alterations) with color-coded severity metrics.
- **Search & Filter Rules**: Filters log payloads by severity, actor, target path, or status.

---

## 💾 Client State Engine & Data Flows

All state synchronization uses stable React Hooks combined with standard browser persistence APIs for session reliability:

```
                  +--------------------------------+
                  |      Vite Client / React       |
                  |  - App State (currentUser,     |
                  |    sessionToken, permissions)  |
                  +---------------+----------------+
                                  |
               Fetch REST Request | JSON Payload Response
             (with Bearer Token)  | (includes postgresConnected flag)
                                  v
                  +--------------------------------+
                  |         Express Server         |
                  |  - Session Token Interceptor   |
                  |  - Active Postgres State Sync  |
                  +--------------------------------+
```

### Active Session Maintenance
1. Upon load, the app requests the `/api/auth/me` endpoint using the Authorization header payload.
2. The backend validates the session and responds with the current user object and an additional `postgresConnected` boolean indicating database health.
3. The frontend updates local storage and renders the corresponding persistent visual database states on the sticky status footer bar.

---

## 🚀 Responsive Design & Usability Patterns

The client is optimized for the complete viewport range:
- **Desktop-First Precision**: Sidebar remains fully expanded with side-by-side bento-grid modules on screens larger than `lg` breaklines.
- **Mobile Fluidity**: Transforms the left sidebar into an off-screen modal drawer, prioritizing the directory ledger to match touch targets (minimum of `44px` for row actions).
- **Touch Interaction**: Row gestures support standard tap selections with floating operation action bars on mobile.

---

## 🔒 Security Integrations

The frontend cooperates with backend defense-in-depth principles:
- **XSS Mitigation**: Standard JSX sanitization blocks raw HTML insertions within filename lists or log streams.
- **Path Traversal Shields**: The visual folder path creator normalizes string segments, disallowing raw `../` entries.
- **Payload Validation**: File upload fields reject file sizes greater than `100MB` on the client level before sending streams, preventing bandwidth depletion.
